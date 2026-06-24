import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Icon from "../../utils/CardIcons";
import CardModal from "./CardModal";
import { LABEL_COLORS, MEMBER_COLORS, fmt, overdue } from "./cardConstants";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

// ── Avatar ────────────────────────────────────────────────────────────────────
const Avatar = ({ name, size = 20 }) => {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const bg = MEMBER_COLORS[name.charCodeAt(0) % MEMBER_COLORS.length];
  return (
    <div
      title={name}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        color: "#fff",
        fontSize: size * 0.38,
        fontWeight: 700,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #fff",
        letterSpacing: "0.02em",
      }}
    >
      {initials}
    </div>
  );
};

// ── Hover description tooltip ─────────────────────────────────────────────────
const HoverTooltip = ({ description }) => (
  <div
    style={{
      position: "absolute",
      left: "calc(100% + 10px)",
      top: 0,
      width: 196,
      background: "#1e293b",
      color: "#f1f5f9",
      borderRadius: 10,
      padding: "10px 12px",
      fontSize: 12,
      lineHeight: 1.6,
      boxShadow: "0 8px 24px rgba(0,0,0,.2)",
      zIndex: 50,
      pointerEvents: "none",
      animation: "tooltipIn .12s ease",
    }}
  >
    <style>{`@keyframes tooltipIn{from{opacity:0;transform:translateX(-4px)}to{opacity:1;transform:none}}`}</style>
    <div
      style={{
        position: "absolute",
        left: -5,
        top: 14,
        width: 0,
        height: 0,
        borderTop: "5px solid transparent",
        borderBottom: "5px solid transparent",
        borderRight: "5px solid #1e293b",
      }}
    />
    <div
      style={{
        fontSize: 10,
        fontWeight: 700,
        color: "#94a3b8",
        marginBottom: 4,
        textTransform: "uppercase",
        letterSpacing: 0.6,
      }}
    >
      Description
    </div>
    <div style={{ color: "#e2e8f0" }}>
      {description.length > 120
        ? description.slice(0, 120).trimEnd() + "…"
        : description}
    </div>
  </div>
);

// ── TaskCard ──────────────────────────────────────────────────────────────────
const TaskCard = ({ task, deleteTask, updateTask }) => {
  const [modalOpen, setModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [saving, setSaving] = useState(false);

  const [labels, setLabels] = useState(task.labels || []);
  const [cover, setCover] = useState(task.cover || null);
  const [dueDate, setDueDate] = useState(task.dueDate || null);
  const [members, setMembers] = useState(task.members || []);
  const [checklist, setChecklist] = useState(task.checklist || []);
  const [description, setDescription] = useState(task.description || "");

  const sync = (patch) => {
    if (updateTask) updateTask(task.id, patch);
    setSaving(true);
    fetch(`${API_BASE}/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    })
      .catch((err) => console.error("[TaskCard] sync failed:", err))
      .finally(() => setSaving(false));
  };

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({ id: task.id, data: { type: "Task", task }, disabled: modalOpen });

  const dndStyle = { transition, transform: CSS.Transform.toString(transform) };

  const completedChecks = checklist.filter((i) => i.done).length;
  const checkPct = checklist.length
    ? Math.round((completedChecks / checklist.length) * 100)
    : 0;
  const showTooltip = hovered && !modalOpen && description.trim().length > 0;

  // Drag ghost
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={{
          ...dndStyle,
          height: 60,
          borderRadius: 8,
          background: "#e0e7ff",
          opacity: 0.4,
          border: "2px dashed #818cf8",
        }}
      />
    );
  }

  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          ref={setNodeRef}
          style={{
            ...dndStyle,
            background: "#ffffff",
            borderRadius: 8,
            cursor: "pointer",
            overflow: "hidden",
            userSelect: "none",
            border: "1px solid",
            borderColor: hovered ? "#c7d2fe" : "#e2e8f0",
            boxShadow: hovered
              ? "0 4px 12px rgba(79,70,229,0.1)"
              : "0 1px 3px rgba(15,23,42,0.06)",
            transition: "border-color 0.13s, box-shadow 0.13s",
          }}
          {...attributes}
          {...listeners}
          onClick={() => setModal(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Cover strip */}
          {cover && (
            <div style={{ height: 28, background: cover, borderRadius: "7px 7px 0 0" }} />
          )}

          <div style={{ padding: "8px 10px" }}>
            {/* Label chips */}
            {labels.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 4,
                  marginBottom: 6,
                }}
              >
                {labels.map((id) => {
                  const c = LABEL_COLORS.find((l) => l.id === id);
                  return (
                    <div
                      key={id}
                      style={{
                        height: 6,
                        width: 32,
                        borderRadius: 3,
                        background: c?.bg,
                      }}
                      title={c?.label}
                    />
                  );
                })}
              </div>
            )}

            {/* Card text */}
            <p
              style={{
                fontSize: 13,
                color: "#1e293b",
                margin: 0,
                lineHeight: 1.55,
                wordBreak: "break-word",
                fontWeight: 400,
              }}
            >
              {task.content || (
                <span style={{ color: "#94a3b8", fontStyle: "italic" }}>
                  Empty card…
                </span>
              )}
            </p>

            {/* Checklist progress */}
            {checklist.length > 0 && (
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: 4,
                    background: "#e2e8f0",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${checkPct}%`,
                      height: "100%",
                      borderRadius: 2,
                      background: checkPct === 100 ? "#22c55e" : "#6366f1",
                      transition: "width 0.3s",
                    }}
                  />
                </div>
                <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500 }}>
                  {completedChecks}/{checklist.length}
                </span>
              </div>
            )}

            {/* Due date + members row */}
            {(dueDate || members.length > 0) && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 8,
                }}
              >
                {dueDate && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      fontSize: 11,
                      padding: "2px 7px",
                      borderRadius: 5,
                      fontWeight: 500,
                      background: overdue(dueDate) ? "#fef2f2" : "#f0fdf4",
                      color: overdue(dueDate) ? "#ef4444" : "#16a34a",
                      border: `1px solid ${overdue(dueDate) ? "#fecaca" : "#bbf7d0"}`,
                    }}
                  >
                    <Icon.Calendar />
                    {fmt(dueDate)}
                  </span>
                )}
                {members.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "auto",
                    }}
                  >
                    {members.slice(0, 3).map((m, i) => (
                      <div key={m} style={{ marginLeft: i ? -6 : 0 }}>
                        <Avatar name={m} />
                      </div>
                    ))}
                    {members.length > 3 && (
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "#e0e7ff",
                          fontSize: 9,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#4f46e5",
                          marginLeft: -6,
                          border: "2px solid #fff",
                          fontWeight: 700,
                        }}
                      >
                        +{members.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {showTooltip && <HoverTooltip description={description} />}
      </div>

      {modalOpen && (
        <CardModal
          task={task}
          labels={labels}
          cover={cover}
          dueDate={dueDate}
          members={members}
          checklist={checklist}
          description={description}
          saving={saving}
          onClose={() => setModal(false)}
          onUpdateContent={(v) => sync(v)}
          onLabels={(v) => { setLabels(v); sync({ labels: v }); }}
          onCover={(v) => { setCover(v); sync({ cover: v }); }}
          onDueDate={(v) => { setDueDate(v); sync({ dueDate: v }); }}
          onMembers={(v) => { setMembers(v); sync({ members: v }); }}
          onChecklist={(v) => { setChecklist(v); sync({ checklist: v }); }}
          onDescription={(v) => { setDescription(v); sync({ description: v }); }}
          onDelete={() => {
            if (deleteTask) deleteTask(task.id);
            fetch(`${API_BASE}/tasks/${task.id}`, { method: "DELETE" }).catch(
              (err) => console.error("[TaskCard] delete failed:", err)
            );
          }}
        />
      )}
    </>
  );
};

export default TaskCard;