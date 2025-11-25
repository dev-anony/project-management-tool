import { useState } from "react";
import TrashIcon from "../../utils/TrashIcon";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task, deleteTask, updateTask }) => {
  const [editMode, setEditMode] = useState(false);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({
      id: task.id,
      data: { type: "Task", task },
      disabled: editMode,
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-mainBackgroundColor opacity-30 p-2.5 h-[60px] 
        flex-right rounded
        cursor-grab relative"
      />
    );
  }

  if (editMode) {
    return (
      <div
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        style={style}
        className="bg-mainBackgroundColor p-2.5 h-[60px]
        rounded border-black-2
        cursor-grab relative"
      >
        <textarea
          className="w-full resize-none border-none rounded
          bg-transparent text-black focus:outline-none"
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.shiftKey && e.key === "Enter") toggleEditMode();
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        ></textarea>
      </div>
    );
  }

  return (
    <div
      onClick={toggleEditMode}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className="bg-[#ffffff] p-2.5 h-[70px]
      flex flex-left rounded text-left
      cursor-grab relative"
    >
      <p
        className=" h-[100%] w-[80%] overflow-y-auto
        overflow-x-hidden whitespace-pre-wrap"
      >
        {" "}
        {task.content}
      </p>
      {/*mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
          className="stroke-white absolute right-4 top-1/2
          -translate-y-1/2 bg-columnBackgroundColor p-2 rounded"
        >
          <TrashIcon />
        </button>
      )*/}
    </div>
  );
};

export default TaskCard;
