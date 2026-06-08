import { useState, useRef } from "react";
import Icon from "./CardIcons";
import { MEMBER_COLORS , LABEL_COLORS, COVER_COLORS, DEMO_MEMBERS, fmt, overdue } from "./cardConstants";

const Avatar = ({ name, size = 56 }) => {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const bg = MEMBER_COLORS[name.charCodeAt(0) % MEMBER_COLORS.length];
  return (
    <div
      title={name}
      style={{ width: size, height: size, background: bg, fontSize: size * 0.36 }}
      className="rounded-full text-white font-bold shrink-0 flex items-center 
      justify-content border-2 border-white"
    >
      {initials}
    </div>
  );
};

// ── Sidebar back-nav sub-panel wrapper ────────────────────────────────────────
const SubPanel = ({ title, onBack, children }) => (
  <div>
    <div className="flex items-center gap-2 mb-3">
      <button
        onClick={onBack}
        className="bg-transparent border-none cursor-pointer text-[#5e6c84] text-lg leading-none p-0"
      >
        ‹
      </button>
      <span className="font-bold text-[13px] text-[#172b4d]">{title}</span>
    </div>
    {children}
  </div>
);

// ── Sidebar action button ─────────────────────────────────────────────────────
const SideBtn = ({ icon, label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 w-full px-[10px] py-[7px] rounded-md border-none cursor-pointer text-[13px] font-medium text-left transition-colors duration-[120ms] ${
      active
        ? "bg-[#e4f0f6] text-[#0079bf]"
        : "bg-[#f4f5f7] text-[#172b4d]"
    }`}
  >
    {icon} {label}
  </button>
);

// ── Label panel ───────────────────────────────────────────────────────────────
const LabelPanel = ({ labels, onLabels, onBack }) => (
  <SubPanel title="Labels" onBack={onBack}>
    {LABEL_COLORS.map((c) => (
      <label key={c.id} className="flex items-center gap-2 mb-[6px] cursor-pointer">
        <input
          type="checkbox"
          checked={labels.includes(c.id)}
          onChange={() => {
            const next = labels.includes(c.id)
              ? labels.filter((l) => l !== c.id)
              : [...labels, c.id];
            onLabels(next);
          }}
          style={{ accentColor: c.bg }}
        />
        <div className="flex-1 h-[22px] rounded" style={{ background: c.bg }} />
        <span className="text-[12px] text-[#172b4d] w-11">{c.label}</span>
      </label>
    ))}
  </SubPanel>
);

// ── Cover panel ───────────────────────────────────────────────────────────────
const CoverPanel = ({ cover, onCover, onBack }) => (
  <SubPanel title="Cover" onBack={onBack}>
    {cover && (
      <button
        onClick={() => { onCover(null); onBack(); }}
        className="w-full mb-2 px-2 py-[5px] text-[12px] bg-[#f4f5f7] border border-[#dfe1e6] rounded cursor-pointer"
      >
        Remove cover
      </button>
    )}
    <div className="flex flex-wrap gap-[6px]">
      {COVER_COLORS.map((c) => (
        <div
          key={c}
          onClick={() => { onCover(c); onBack(); }}
          className="w-[30px] h-[30px] rounded cursor-pointer"
          style={{
            background: c,
            outline: cover === c ? "3px solid #0079bf" : "none",
            outlineOffset: 2,
          }}
        />
      ))}
    </div>
  </SubPanel>
);

// ── Due date panel ────────────────────────────────────────────────────────────
const DueDatePanel = ({ dueDate, onDueDate, onBack }) => (
  <SubPanel title="Due Date" onBack={onBack}>
    <input
      type="date"
      value={dueDate || ""}
      onChange={(e) => onDueDate(e.target.value || null)}
      className="w-full px-2 py-[6px] border border-[#dfe1e6] rounded text-[13px]"
    />
    {dueDate && (
      <button
        onClick={() => onDueDate(null)}
        className="mt-2 w-full px-2 py-[5px] text-[12px] bg-[#f4f5f7] border border-[#dfe1e6] rounded cursor-pointer"
      >
        Remove date
      </button>
    )}
  </SubPanel>
);

// ── Members panel ─────────────────────────────────────────────────────────────
const MembersPanel = ({ members, onMembers, onBack }) => (
  <SubPanel title="Members" onBack={onBack}>
    {DEMO_MEMBERS.map((name) => {
      const active = members.includes(name);
      return (
        <div
          key={name}
          onClick={() =>
            onMembers(
              active ? members.filter((m) => m !== name) : [...members, name]
            )
          }
          className={`flex items-center gap-2 px-[6px] py-1 rounded cursor-pointer mb-1 ${
            active ? "bg-[#e4f0f6]" : "bg-transparent"
          }`}
        >
          <Avatar name={name} size={26} />
          <span className="text-[12px] flex-1 text-[#172b4d]">{name}</span>
          {active && <span className="text-[#0079bf] text-[12px]">✓</span>}
        </div>
      );
    })}
  </SubPanel>
);

// ── Checklist panel ───────────────────────────────────────────────────────────
const ChecklistPanel = ({ checklist, onChecklist, onBack }) => (
  <SubPanel title="Checklist" onBack={onBack}>
    <p className="text-[12px] text-[#5e6c84] mt-0 mb-2">
      A checklist section will be added to the card.
    </p>
    <button
      onClick={() => {
        if (checklist.length === 0)
          onChecklist([{ id: Date.now(), text: "Item 1", done: false }]);
        onBack();
      }}
      className="w-full px-[10px] py-[6px] bg-[#0079bf] text-white border-none rounded cursor-pointer text-[13px]"
    >
      Add checklist
    </button>
  </SubPanel>
);

// ── CardModal (main export) ───────────────────────────────────────────────────
const CardModal = ({
  task,
  labels,
  cover,
  dueDate,
  members,
  checklist,
  description,
  onClose,
  onUpdateContent,
  onLabels,
  onCover,
  onDueDate,
  onMembers,
  onChecklist,
  onDescription,
  onDelete,
}) => {
  const [panel, setPanel]       = useState(null);
  const [editTitle, setEdit]    = useState(false);
  const [titleVal, setTitleVal] = useState(task.content);
  const [descVal, setDescVal]   = useState(description || "");
  const [editDesc, setEditDesc] = useState(false);
  const [newItem, setNewItem]   = useState("");
  const overlayRef              = useRef();

  const saveDesc = () => { onDescription(descVal); setEditDesc(false); };
  const saveTitle = () => { onUpdateContent(titleVal); setEdit(false); };

  const completedChecks = checklist.filter((i) => i.done).length;
  const checkPct = checklist.length
    ? Math.round((completedChecks / checklist.length) * 100)
    : 0;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 bg-black/55 flex items-start 
      justify-center z-[1000] px-4 pt-12 pb-4 overflow-y-auto"
    >
      <style>
        {`@keyframes modalIn{
            from{ opacity: 0; transform: translateY(-12px) }
            to{ opacity: 1; transform: none} 
            }`
        }
      </style>

      <div
        className="bg-[#f4f5f7] rounded-xl w-full max-w-[680px] min-h-[300px] 
        shadow-[0_20px_60px_rgba(0,0,0,.35)] flex flex-col"
        style={{ animation: "modalIn .15s ease" }}
      >
        {/* Cover strip */}
        {cover && (
          <div
            className="h-[100px] rounded-t-xl shrink-0"
            style={{ background: cover }}
          />
        )}

        {/* Header */}
        <div className="flex items-start gap-[10px] px-5 pt-5">
          <div className="text-xl">🗒</div>
          <div className="flex-1">
            {editTitle ? (
              <textarea
                autoFocus
                value={titleVal}
                onChange={(e) => setTitleVal(e.target.value)}
                onBlur={saveTitle}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    saveTitle();
                  }
                }}
                className="w-full text-[#172b4d] border-2 border-[#0079bf] 
                rounded px-[6px] py-1 resize-none font-[inherit] leading-[1.4] bg-white min-h-[60px]"
              />
            ) : (
              <h2
                onClick={() => setEdit(true)}
                className="text-[15px] text-[#172b4d] m-0 cursor-text leading-[1.4] px-1 py-1 
                rounded border-1 border-transparent"
              >
                {task.content || "Untitled card"}
              </h2>
            )}
          </div>
          <button
            onClick={onClose}
            className="bg-transparent border-none cursor-pointer text-[#6b778c] p-1 rounded shrink-0"
          >
            <Icon.Close />
          </button>
        </div>

        {/* Body */}
        <div className="flex gap-4 px-5 pt-4 pb-5 flex-wrap">

          {/* ── Left: card detail content ── */}
          <div className="flex-1 min-w-0">

            {/* Description */}
            <div className="mb-4">
              <div className="text-[12px] font-bold text-[#5e6c84] mb-[6px] uppercase tracking-[0.6px]">
                📝 Description
              </div>
              {editDesc ? (
                <div>
                  <textarea
                    autoFocus
                    value={descVal}
                    onChange={(e) => setDescVal(e.target.value)}
                    placeholder="Add a more detailed description…"
                    className="w-full min-h-[80px] px-[10px] py-2 border-2 
                    border-[#0079bf] rounded-md resize-y font-[inherit] text-[15px] 
                    text-[#172b4d] leading-[1.6] box-border"
                  />
                  <div className="flex gap-[6px] mt-[6px]">
                    <button
                      onClick={saveDesc}
                      className="px-[10px] py-[5px] bg-transparent border-none text-[13px] 
                      text-[#6b778c] cursor-pointer ring-blue-500 hover:ring-1"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => { setDescVal(description || ""); setEditDesc(false); }}
                      className="px-[10px] py-[5px] bg-transparent border-none text-[13px] 
                      text-[#6b778c] cursor-pointer ring-rose-500 hover:ring-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setEditDesc(true)}
                  className={`min-h-[70px] px-[10px] py-2 rounded-md cursor-text text-[15px] l
                    eading-[1.6] whitespace-pre-wrap break-words border-2 border-transparent 
                    transition-colors duration-[120ms] 
                    ${
                    descVal.trim()
                      ? "bg-transparent text-[#172b4d] hover:bg-[#e4e6ea]"
                      : "bg-[#e4e6ea] text-[#7a8699]"
                    }`}
                >
                  {descVal.trim() || "Add a more detailed description…"}
                </div>
              )}
            </div>

            {/* Labels */}
            {labels.length > 0 && (
              <div className="mb-4">
                <div className="text-[11px] font-bold text-[#5e6c84] mb-[6px] uppercase tracking-[0.6px]">
                  Labels
                </div>
                <div className="flex flex-wrap gap-[6px]">
                  {labels.map((id) => {
                    const c = LABEL_COLORS.find((l) => l.id === id);
                    return (
                      <span
                        key={id}
                        className="text-white text-[12px] font-semibold px-[10px] py-[3px] rounded"
                        style={{ background: c?.bg }}
                      >
                        {c?.label}
                      </span>
                    );
                  })}
                  <button
                    onClick={() => setPanel("label")}
                    className="bg-[#e2e4ea] border-none rounded text-lg cursor-pointer px-2 text-[#5e6c84]"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Members */}
            {members.length > 0 && (
              <div className="mb-4">
                <div className="text-[11px] font-bold text-[#5e6c84] mb-[6px] uppercase tracking-[0.6px]">
                  Members
                </div>
                <div className="flex gap-1 flex-wrap">
                  {members.map((m) => <Avatar key={m} name={m} size={32} />)}
                  <button
                    onClick={() => setPanel("members")}
                    />
                </div>
              </div>
            )}

            {/* Due date */}
            {dueDate && (
              <div className="mb-4">
                <div className="text-[11px] font-bold text-[#5e6c84] mb-[6px] uppercase tracking-[0.6px]">
                  Due Date
                </div>
                <div
                  className={`${
                    overdue(dueDate)
                      ? "bg-[#fdd0cb] text-[#eb5a46]"
                      : "bg-[#d6f0cd] text-[#3a7d2a]"
                  }`}
                >
                  <Icon.Calendar /> {fmt(dueDate)}
                  {overdue(dueDate) && <span className="text-[11px]">· Overdue</span>}
                </div>
              </div>
            )}

            {/* Checklist */}
            {checklist.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-[6px]">
                  <div className="text-[11px] font-bold text-[#5e6c84] uppercase tracking-[0.6px]">
                    Checklist
                  </div>
                  <span className="text-[11px] text-[#6b778c]">{checkPct}%</span>
                </div>
                <div className="h-[6px] bg-[#dfe1e6] rounded-[3px] mb-[10px] overflow-hidden">
                  <div
                    className="h-full rounded-[3px] transition-[width] duration-300"
                    style={{
                      width: `${checkPct}%`,
                      background: checkPct === 100 ? "#61bd4f" : "#0079bf",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  {checklist.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-2 cursor-pointer py-[3px]"
                    >
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() =>
                          onChecklist(
                            checklist.map((i) =>
                              i.id === item.id ? { ...i, done: !i.done } : i
                            )
                          )
                        }
                        className="w-[15px] h-[15px] accent-[#0079bf]"
                      />
                      <span
                        className={`text-[13px] flex-1 ${
                          item.done
                            ? "text-[#aaa] line-through"
                            : "text-[#172b4d]"
                        }`}
                      >
                        {item.text}
                      </span>
                      <button
                        onClick={() =>
                          onChecklist(checklist.filter((i) => i.id !== item.id))
                        }
                        className="bg-transparent border-none cursor-pointer text-[#bbb] text-sm p-0"
                      >
                        ✕
                      </button>
                    </label>
                  ))}
                </div>
                {/* Add item row */}
                <div className="flex gap-[6px] mt-2">
                  <input
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const t = newItem.trim();
                        if (t) {
                          onChecklist([...checklist, { id: Date.now(), text: t, done: false }]);
                          setNewItem("");
                        }
                      }
                    }}
                    placeholder="Add an item…"
                    className="flex-1 px-2 py-[6px] border border-[#dfe1e6] rounded text-[13px]"
                  />
                  <button
                    onClick={() => {
                      const t = newItem.trim();
                      if (t) {
                        onChecklist([...checklist, { id: Date.now(), text: t, done: false }]);
                        setNewItem("");
                      }
                    }}
                    className="px-3 py-[6px] bg-[#0079bf] text-white border-none rounded cursor-pointer text-[13px]"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: sidebar ── */}
          <div className="w-[168px] shrink-0 flex flex-col gap-[6px]">
            {panel ? (
              <div className="bg-white rounded-lg p-3 shadow-[0_2px_8px_rgba(0,0,0,.1)]">
                {panel === "label"     && <LabelPanel     labels={labels}       onLabels={onLabels}       onBack={() => setPanel(null)} />}
                {panel === "cover"     && <CoverPanel     cover={cover}         onCover={onCover}         onBack={() => setPanel(null)} />}
                {panel === "date"      && <DueDatePanel   dueDate={dueDate}     onDueDate={onDueDate}     onBack={() => setPanel(null)} />}
                {panel === "members"   && <MembersPanel   members={members}     onMembers={onMembers}     onBack={() => setPanel(null)} />}
                {panel === "checklist" && <ChecklistPanel checklist={checklist} onChecklist={onChecklist} onBack={() => setPanel(null)} />}
              </div>
            ) : (
              <>
                <div className="text-[11px] font-bold text-[#5e6c84] uppercase tracking-[0.6px]">
                  Add to card
                </div>
                <SideBtn icon={<Icon.User />}     label="Members"     onClick={() => setPanel("members")}   active={members.length > 0} />
                <SideBtn icon={<Icon.Label />}    label="Labels"      onClick={() => setPanel("label")}     active={labels.length > 0} />
                <SideBtn icon={<Icon.Check />}    label="Checklist"   onClick={() => setPanel("checklist")} active={checklist.length > 0} />
                <SideBtn icon={<Icon.Calendar />} label="Due Date"    onClick={() => setPanel("date")}      active={!!dueDate} />
                <SideBtn icon={<Icon.Cover />}    label="Cover"       onClick={() => setPanel("cover")}     active={!!cover} />
                <div className="text-[11px] font-bold text-[#5e6c84] uppercase tracking-[0.6px] mt-2">
                  Actions
                </div>
                <SideBtn icon={<Icon.Trash />} label="Delete card" onClick={() => { onDelete(); onClose(); }} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;