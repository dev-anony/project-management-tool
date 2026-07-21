import { useMemo, useState } from "react";
import TrashIcon from "../../utils/TrashIcon";
import { useSortable, SortableContext } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import PlusIcon from "../../utils/PlusIcon";
import TaskCard from "../Claude/Card";

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
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({
      id: column.id,
      data: { type: "Column", column },
      disabled: editMode,
    });

  const { setNodeRef: setDroppableNodeRef } = useDroppable({
    id: `column-content-${column.id}`,
    data: { type: "ColumnContent", column },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={{
          ...style,
          width: 260,
          height: 350,
          borderRadius: 12,
          background: "#e0e7ff",
          opacity: 0.45,
          border: "2px dashed #818cf8",
        }}
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        width: 260,
        height: 350,
        borderRadius: 12,
        background: "#ffffff",
        boxShadow: "0 1px 4px rgba(15,23,42,0.07), 0 0 0 1px rgba(15,23,42,0.05)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Column header — data-dnd-column-header tells the board pan handler to leave this alone */}
      <div
        data-dnd-column-header="true"
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        style={{
          height: 48,
          padding: "0 12px 0 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "grab",
          borderBottom: "1px solid #f1f3f7",
          borderLeft: editMode ? "3px solid #4f46e5" : "3px solid transparent",
          background: editMode ? "#f8f9ff" : "#ffffff",
          transition: "background 0.12s, border-left-color 0.12s",
          flexShrink: 0,
        }}
      >
        <div style={{ flex: 1, overflow: "hidden" }}>
          {!editMode ? (
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#1e293b",
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block",
              }}
            >
              {column.title}
            </span>
          ) : (
            <input
              autoFocus
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setEditMode(false);
              }}
              style={{
                width: "100%",
                fontSize: 13,
                fontWeight: 600,
                color: "#1e293b",
                border: "none",
                outline: "none",
                background: "transparent",
                letterSpacing: "0.01em",
              }}
            />
          )}
        </div>

        {/* Task count badge */}
        {tasks.length > 0 && !editMode && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#6366f1",
              background: "#eef2ff",
              borderRadius: 10,
              padding: "2px 7px",
              marginRight: 6,
              flexShrink: 0,
            }}
          >
            {tasks.length}
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteColumn(column.id);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#94a3b8",
            padding: "4px",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            transition: "color 0.12s, background 0.12s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#ef4444";
            e.currentTarget.style.background = "#fef2f2";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#94a3b8";
            e.currentTarget.style.background = "none";
          }}
        >
          <TrashIcon />
        </button>
      </div>

      {/* Task list area */}
      <div
        ref={setDroppableNodeRef}
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px 10px 4px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          scrollbarWidth: "none",
          minHeight: 0,
        }}
      >
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

      {/* Footer — Add task */}
      <button
        onClick={() => createTask(column.id)}
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
        style={{
          height: 36,
          border: "none",
          borderTop: "1px solid #f1f3f7",
          background: mouseIsOver ? "#f8f9ff" : "#ffffff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          fontSize: 12,
          fontWeight: 500,
          color: mouseIsOver ? "#4f46e5" : "#94a3b8",
          transition: "background 0.12s, color 0.12s",
          flexShrink: 0,
          borderRadius: "0 0 12px 12px",
          padding: "0 12px",
          opacity: mouseIsOver ? 1 : 0,
        }}
      >
        <PlusIcon />
        Add a card
      </button>
    </div>
  );
};

export default ColumnContainer;