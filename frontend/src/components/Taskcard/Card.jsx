import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Icon from "../../utils/CardIcons";
import CardModal from "./CardModal";
import { LABEL_COLORS, MEMBER_COLORS, fmt, overdue } from "./cardConstants";

// Adjust to match your Vite/CRA env var or proxy base
const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

// ── Avatar (card-chip size) ───────────────────────────────────────────────────
const Avatar = ({ name, size = 20 }) => {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const bg = MEMBER_COLORS[name.charCodeAt(0) % MEMBER_COLORS.length];
  return (
    <div title={name} style={{
      width: size, height: size, borderRadius: "50%", background: bg,
      color: "#fff", fontSize: size * 0.36, fontWeight: 700, flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      border: "2px solid #fff",
    }}>{initials}</div>
  );
};

// ── Hover description tooltip ─────────────────────────────────────────────────
const HoverTooltip = ({ description }) => (
  <div style={{
    position: "absolute", left: "calc(100% + 10px)", top: 0,
    width: 200, background: "#172b4d", color: "#fff",
    borderRadius: 8, padding: "10px 12px", fontSize: 12, lineHeight: 1.6,
    boxShadow: "0 6px 20px rgba(0,0,0,.25)", zIndex: 50, pointerEvents: "none",
    animation: "tooltipIn .12s ease",
  }}>
    <style>{`@keyframes tooltipIn{from{opacity:0;transform:translateX(-4px)}to{opacity:1;transform:none}}`}</style>
    <div style={{
      position: "absolute", left: -6, top: 14,
      width: 0, height: 0,
      borderTop: "6px solid transparent",
      borderBottom: "6px solid transparent",
      borderRight: "6px solid #172b4d",
    }} />
    <div style={{ fontWeight: 700, fontSize: 11, opacity: .7, marginBottom: 4, textTransform: "uppercase", letterSpacing: .5 }}>
      Description
    </div>
    <div style={{ opacity: .92 }}>
      {description.length > 120 ? description.slice(0, 120).trimEnd() + "…" : description}
    </div>
  </div>
);

// ── TaskCard ──────────────────────────────────────────────────────────────────
const TaskCard = ({ task, deleteTask, updateTask }) => {
  const [modalOpen, setModal] = useState(false);
  const [hovered,   setHovered] = useState(false);
  const [saving,    setSaving]  = useState(false);

  const [labels,      setLabels]      = useState(task.labels      || []);
  const [cover,       setCover]       = useState(task.cover       || null);
  const [dueDate,     setDueDate]     = useState(task.dueDate     || null);
  const [members,     setMembers]     = useState(task.members     || []);
  const [checklist,   setChecklist]   = useState(task.checklist   || []);
  const [description, setDescription] = useState(task.description || "");

  // ── Optimistic sync: update parent state + persist to API ──────────────────
  // Patch shape: { labels: [...] } | { cover: "#..." } | { content: "..." } etc.
  const sync = (patch) => {
    if (updateTask) updateTask(task.id, patch);

    setSaving(true);
    fetch(`${API_BASE}/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    })
      .catch(err => console.error("[TaskCard] sync failed:", err))
      .finally(() => setSaving(false));
  };

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({ id: task.id, data: { type: "Task", task }, disabled: modalOpen });

  const dndStyle = { transition, transform: CSS.Transform.toString(transform) };

  const completedChecks = checklist.filter(i => i.done).length;
  const checkPct        = checklist.length ? Math.round((completedChecks / checklist.length) * 100) : 0;
  const showTooltip     = hovered && !modalOpen && description.trim().length > 0;

  // ── Drag ghost ──
  if (isDragging) {
    return (
      <div ref={setNodeRef} style={{ ...dndStyle, height: 64, borderRadius: 8, background: "#e2e8f0", opacity: .4 }} />
    );
  }

  // ── Card chip ──
  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          ref={setNodeRef}
          style={dndStyle}
          {...attributes}
          {...listeners}
          onClick={() => setModal(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`bg-white rounded-lg cursor-pointer overflow-hidden select-none transition-shadow duration-150 ${
            hovered ? "shadow-[0_4px_14px_rgba(0,0,0,.18)]" : "shadow-[0_1px_3px_rgba(0,0,0,.13)]"
          }`}
        >
          {/* Cover strip */}
          {cover && <div style={{ height: 28, background: cover }} />}

          <div style={{ padding: "8px 10px" }}>
            {/* Label dots */}
            {labels.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 6 }}>
                {labels.map(id => {
                  const c = LABEL_COLORS.find(l => l.id === id);
                  return <div key={id} style={{ height: 8, width: 36, borderRadius: 4, background: c?.bg }} title={c?.label} />;
                })}
              </div>
            )}

            {/* Content text */}
            <p style={{ fontSize: 13, color: "#172b4d", margin: 0, lineHeight: 1.5, wordBreak: "break-word" }}>
              {task.content || <span style={{ color: "#aaa" }}>Empty card…</span>}
            </p>

            {/* Checklist progress bar */}
            {checklist.length > 0 && (
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ flex: 1, height: 5, background: "#dfe1e6", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    width: `${checkPct}%`, height: "100%", borderRadius: 3,
                    background: checkPct === 100 ? "#61bd4f" : "#0079bf", transition: "width .3s",
                  }} />
                </div>
                <span style={{ fontSize: 10, color: "#6b778c" }}>{completedChecks}/{checklist.length}</span>
              </div>
            )}

            {/* Due date + member avatars */}
            {(dueDate || members.length > 0) && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                {dueDate && (
                  <span style={{
                    display: "flex", alignItems: "center", gap: 3, fontSize: 11,
                    padding: "2px 6px", borderRadius: 4, fontWeight: 500,
                    background: overdue(dueDate) ? "#fdd0cb" : "#f4f5f7",
                    color:      overdue(dueDate) ? "#eb5a46" : "#6b778c",
                  }}>
                    <Icon.Calendar /> {fmt(dueDate)}
                  </span>
                )}
                {members.length > 0 && (
                  <div style={{ display: "flex", marginLeft: "auto" }}>
                    {members.slice(0, 3).map((m, i) => (
                      <div key={m} style={{ marginLeft: i ? -6 : 0 }}><Avatar name={m} /></div>
                    ))}
                    {members.length > 3 && (
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%", background: "#dfe1e6",
                        fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#6b778c", marginLeft: -6, border: "2px solid #fff", fontWeight: 700,
                      }}>+{members.length - 3}</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Hover tooltip */}
        {showTooltip && <HoverTooltip description={description} />}
      </div>

      {/* Card detail modal */}
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
          onUpdateContent={v => sync(v)}
          onLabels={v    => { setLabels(v);      sync({ labels: v });      }}
          onCover={v     => { setCover(v);        sync({ cover: v });       }}
          onDueDate={v   => { setDueDate(v);      sync({ dueDate: v });     }}
          onMembers={v   => { setMembers(v);      sync({ members: v });     }}
          onChecklist={v => { setChecklist(v);    sync({ checklist: v });   }}
          onDescription={v => { setDescription(v); sync({ description: v }); }}
          onDelete={() => {
            if (deleteTask) deleteTask(task.id);
            fetch(`${API_BASE}/tasks/${task.id}`, { method: "DELETE" })
              .catch(err => console.error("[TaskCard] delete failed:", err));
          }}
        />
      )}
    </>
  );
};

export default TaskCard;