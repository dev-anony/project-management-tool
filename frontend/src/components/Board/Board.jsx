import { useState, useMemo } from "react";
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
import TaskCard from "./Card2";
import debounce from "lodash.debounce";

const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 },
    })
  );

  const generateId = (() => {
  const used = new Set();

  return function() {
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
      title: `[${id}] Column ${columns.length + 1}`,
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

    // Only reorder columns when both active and over are columns
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

        // Dropping a task over another task
        if (isActiveATask && isOverATask) {
          setTasks((tasks) => {
            const activeIndex = tasks.findIndex((t) => t.id === activeId);
            const overIndex = tasks.findIndex((t) => t.id === overId);
            tasks[activeIndex].columnId = tasks[overIndex].columnId;
            return arrayMove(tasks, activeIndex, overIndex);
          });
        }

        // Dropping a task over a column
        if (isActiveATask && isOverAColumn) {
          setTasks((tasks) => {
            const activeIndex = tasks.findIndex((t) => t.id === activeId);
            // overId is droppable id for column content, read column id from over.data
            const targetColumnId = over.data.current?.column?.id ?? null;
            if (targetColumnId) {
              tasks[activeIndex].columnId = targetColumnId;
            }
            return arrayMove(tasks, activeIndex, activeIndex);
          });
        }
      }, 20),
    [],
  );

  function onDragOver(event) {
    debouncedOnDragOver(event);
  }

  return (
    <div className="ml-5 flex flex-col h-full 
    position-relative flex-1 overflow-auto pr-6 pl-6 pt-2
    pb-40 items-start no-scrollbar">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="flex gap-6 h-full items-center">
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

          <button
            onClick={createNewColumn}
            className="min-w-[200px] h-[250px] flex items-center 
            justify-center gap-2  text-black rounded font-semibold
            ring-indigo-500 hover:ring-2 cursor-pointer"
          >
          <PlusIcon />
            Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
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
  );
};

export default KanbanBoard;
