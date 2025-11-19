import { useMemo, useState } from "react";
import TrashIcon from "../../utils/TrashIcon";
import { useSortable, SortableContext } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PlusIcon from "../../utils/PlusIcon";
import TaskCard from "./Card2";

const ColumnContainer = ({
  column,
  tasks,
  deleteColumn,
  updateColumn,
  createTask,
  deleteTask,
  updateTask,
}) => {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({
      id: column.id,
      data: { type: "Column", column },
      disabled: editMode,
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-mainBackgroundColor opacity-50 p-2.5 w-[250px] h-[350px]
        items-center flex flex-left rounded border-2
        border-rose-500 cursor-grab relative"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor w-[250px] h-[350px] 
      rounded flex flex-col min-h-0"
    >
      {/* height issue above (max-h-[350px]) while dragging */}
      {/* Column Title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        style={{
          border: editMode ? "2px solid #4F46E5" : "",
        }}
        className="bg-mainBackgroundColor
        text-md font-bold
        h-[50px] p-3    
        cursor-grab
        border-columnBackgroundColor
        flex items-center justify-between
        rounded bg-[#cccccc3a] p-4"
      >
        <div>
          {!editMode && column.title}
          {editMode && (
            <input
              autoFocus
              className=" w-[170px] outline-none rounded"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="stroke-gray-500
          hover:stroke-white
          ring-rose-500 hover:ring-2
          rounded py-2 px-2"
        >
          <TrashIcon />
        </button>
      </div>

      {/* Column Task Container */}
      <div className="flex-1 min-h-8 bg-[#9d9c9c3a] flex-col gap-4 p-1 overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>

      {/* Column Footer */}
      <button
        onClick={() => {
          createTask(column.id);
        }}
        className="flex  border-2
        ring-indigo-500 rounded hover:ring-1
        bg-[#ffffff]"
      >
        <PlusIcon />
        Add Task
      </button>
    </div>
  );
};

export default ColumnContainer;
