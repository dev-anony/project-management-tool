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
        items-center flex flex-left rounded-xl border-2
        border-rose-500 cursor-grab relative"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      class="bg-columnBackgroundColor w-[250px] h-[350px] rounded-md flex flex-col min-h-0"
    >
      {/* Column Title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        class="bg-mainBackgroundColor
        text-md font-bold
        h-[50px] p-3    
        cursor-grab
        rounded-b-none
        border-columnBackgroundColor
        flex items-center justify-between
        rounded-lg bg-[#ffffff35] p-4"
      >
        <div className="flex gap-2">
          {!editMode && column.title}
          {editMode && (
            <input
              autoFocus
              className="bg-black focus:border-rose-500 border rounded outline-none px-2"
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
      <div class="flex-1 min-h-8 rounded-md border-black bg-[#00000073] border-1 flex-col gap-4 p-1 overflow-y-auto">
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
        className="flex gap-2 items-center
        border-columnBackgroundColor border-2 rounded-md p-2
        ring-rose-500 hover:ring-2
        bg-[#ffffff35]"
      >
        <PlusIcon />
        Add Task
      </button>
    </div>
  );
};

export default ColumnContainer;
