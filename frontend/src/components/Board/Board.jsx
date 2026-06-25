import { useState, useMemo, useRef, useEffect } from "react";
import PlusIcon from "../../utils/PlusIcon";
import ColumnContainer from "./Column";
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "../Taskcard/Card";
import debounce from "lodash.debounce";

const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  // ── Board pan (background drag-to-scroll) ──────────────────────────────────
  const boardRef = useRef(null);
  const pan = useRef({ active: false, startX: 0, scrollLeft: 0 });

  useEffect(() => {
    const onMove = (e) => {
      if (!pan.current.active) return;
      const dx = e.clientX - pan.current.startX;
      if (boardRef.current) {
        boardRef.current.scrollLeft = pan.current.scrollLeft - dx;
      }
    };
    const onUp = () => {
      if (!pan.current.active) return;
      pan.current.active = false;
      if (boardRef.current) boardRef.current.style.cursor = "grab";
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  const handleBoardMouseDown = (e) => {
    if (e.button !== 0) return; // left-click only
    // Skip cards, column headers, and any interactive element
    if (
      e.target.closest(
        "[data-dnd-card], [data-dnd-column-header], button, input, textarea, [role='button']"
      )
    )
      return;
    e.preventDefault(); // prevent text-selection while panning
    pan.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: boardRef.current?.scrollLeft ?? 0,
    };
    if (boardRef.current) boardRef.current.style.cursor = "grabbing";
  };
  // ──────────────────────────────────────────────────────────────────────────

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 },
    })
  );

  const generateId = (() => {
    const used = new Set();
    return function () {
      let id;
      do {
        id = Math.floor(Math.random() * 1000) + 1;
      } while (used.has(id));
      used.add(id);
      return id;
    };
  })();

  function createNewColumn() {
    const id = generateId();
    const columnToAdd = {
      id,
      title: `[${id}] ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  }

  function updateColumn(id, title) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setColumns(newColumns);
  }

  function createTask(columnId) {
    const id = generateId();
    const newTask = {
      id,
      columnId,
      content: `[${id}] Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id, content) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  }

  function onDragStart(event) {
    // Cancel any active pan so it doesn't fight DnD
    pan.current.active = false;
    if (boardRef.current) boardRef.current.style.cursor = "grab";

    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;
    if (
      active.data.current?.type === "Column" &&
      over.data.current?.type === "Column"
    ) {
      const activeColumnId = active.id;
      const overColumnId = over.id;
      if (activeColumnId === overColumnId) return;
      setColumns((columns) => {
        const activeColumnIndex = columns.findIndex((col) => col.id === activeColumnId);
        const overColumnIndex = columns.findIndex((col) => col.id === overColumnId);
        return arrayMove(columns, activeColumnIndex, overColumnIndex);
      });
    }
  }

  const debouncedOnDragOver = useMemo(
    () =>
      debounce((event) => {
        const { active, over } = event;
        if (!over) return;
        const activeId = active.id;
        const overId = over.id;
        if (activeId === overId) return;
        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";
        const isOverAColumn = over.data.current?.type === "ColumnContent";
        if (!isActiveATask) return;
        if (isActiveATask && isOverATask) {
          setTasks((tasks) => {
            const activeIndex = tasks.findIndex((t) => t.id === activeId);
            const overIndex = tasks.findIndex((t) => t.id === overId);
            tasks[activeIndex].columnId = tasks[overIndex].columnId;
            return arrayMove(tasks, activeIndex, overIndex);
          });
        }
        if (isActiveATask && isOverAColumn) {
          setTasks((tasks) => {
            const activeIndex = tasks.findIndex((t) => t.id === activeId);
            const targetColumnId = over.data.current?.column?.id ?? null;
            if (targetColumnId) {
              tasks[activeIndex].columnId = targetColumnId;
            }
            return arrayMove(tasks, activeIndex, activeIndex);
          });
        }
      }, 20),
    []
  );

  function onDragOver(event) {
    debouncedOnDragOver(event);
  }

  return (
    <>
      {/* Thin horizontal (and vertical) scrollbar */}
      <style>{`
        .kanban-board::-webkit-scrollbar { height: 3px; width: 3px; }
        .kanban-board::-webkit-scrollbar-track { background: transparent; }
        .kanban-board::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.16); border-radius: 3px; }
        .kanban-board::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.3); }
      `}</style>

      <div
        ref={boardRef}
        className="kanban-board flex h-[400px] overflow-auto pr-6 pl-6 pt-6 items-start"
        style={{
          background: "#f0f2f5",
          cursor: "grab",
          /* Firefox thin scrollbar */
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0,0,0,0.16) transparent",
        }}
        onMouseDown={handleBoardMouseDown}
      >
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className="flex gap-5 items-center">
            <div className="flex gap-4 items-start">
              <SortableContext items={columnsId}>
                {columns.map((col) => (
                  <ColumnContainer
                    key={col.id}
                    column={col}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    tasks={tasks.filter((task) => task.columnId === col.id)}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                  />
                ))}
              </SortableContext>
            </div>

            {/* Add List button */}
            <div className="w-[220px] h-[350px] flex items-center">
              <button
                onClick={createNewColumn}
                className="min-w-[220px] h-[52px] flex items-center justify-center gap-2
                  rounded-xl font-medium text-sm cursor-pointer
                  transition-all duration-150"
                style={{
                  background: "rgba(255,255,255,0.72)",
                  color: "#374151",
                  border: "1.5px dashed #c7ccd6",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.95)";
                  e.currentTarget.style.borderColor = "#818cf8";
                  e.currentTarget.style.color = "#4f46e5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.72)";
                  e.currentTarget.style.borderColor = "#c7ccd6";
                  e.currentTarget.style.color = "#374151";
                }}
              >
                <PlusIcon />
                Add new list
              </button>
            </div>
          </div>

          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
              {activeTask && (
                <TaskCard
                  task={activeTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </>
  );
};

export default KanbanBoard;