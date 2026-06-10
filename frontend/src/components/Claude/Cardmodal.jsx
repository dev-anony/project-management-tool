import { useState, useRef } from "react";
import Icon from "../../utils/CardIcons";
import {
  MEMBER_COLORS,
  LABEL_COLORS,
  COVER_COLORS,
  DEMO_MEMBERS,
  fmt,
  overdue,
} from "./cardConstants";

// ── Avatar ────────────────────────────────────────────────────────────────────
const Avatar = ({ name, size = 56 }) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const bg = MEMBER_COLORS[name.charCodeAt(0) % MEMBER_COLORS.length];
  return (
    <div
      title={name}
      style={{ width: size, height: size, background: bg, fontSize: size * 0.36 }}
      className="rounded-full text-white font-bold shrink-0 flex items-center justify-center border-2 border-white"
    >
      {initials}
    </div>
  );
};

// ── SubPanel wrapper ──────────────────────────────────────────────────────────
const SubPanel = ({ title, onBack, children }) => (
  <div>
    <div className="flex items-center gap-2 mb-3">
      <button
        onClick={onBack}
        className="text-[#5e6c84] text-xl leading-none p-0 bg-transparent border-none cursor-pointer hover:text-[#172b4d] transition-colors"
        title="Back"
      >
        ‹
      </button>
      <span className="font-bold text-[13px] text-[#172b4d]">{title}</span>
    </div>
    {children}
  </div>
);

// ── Sidebar action button ─────────────────────────────────────────────────────
const SideBtn = ({ icon, label, onClick, active, danger }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 w-full px-[10px] py-[7px] rounded-md border-none cursor-pointer text-[13px] font-medium text-left transition-colors duration-[120ms] ${
      danger
        ? "bg-[#f4f5f7] text-[#eb5a46] hover:bg-[#fdd0cb]"
        : active
        ? "bg-[#e4f0f6] text-[#0079bf]"
        : "bg-[#f4f5f7] text-[#172b4d] hover:bg-[#e4e6ea]"
    }`}
  >
    <span className="shrink-0">{icon}</span>
    {label}
  </button>
);

// ── Label panel ───────────────────────────────────────────────────────────────
const LabelPanel = ({ labels, onLabels, onBack }) => {
  const toggle = (id) => {
    const next = labels.includes(id)
      ? labels.filter((l) => l !== id)
      : [...labels, id];
    onLabels(next);
  };

  return (
    <SubPanel title="Labels" onBack={onBack}>
      <div className="flex flex-col gap-[6px]">
        {LABEL_COLORS.map((c) => {
          const active = labels.includes(c.id);
          return (
            <div
              key={c.id}
              onClick={() => toggle(c.id)}
              className={`flex items-center gap-2 px-2 py-[5px] rounded-md cursor-pointer transition-colors ${
                active ? "bg-[#e4f0f6]" : "hover:bg-[#f4f5f7]"
              }`}
            >
              <div
                className="w-[22px] h-[22px] rounded-full shrink-0 border-[2px] transition-all"
                style={{
                  background: c.bg,
                  borderColor: active ? "#0079bf" : "transparent",
                  boxShadow: active ? `0 0 0 2px #fff inset` : "none",
                }}
              />
              <div
                className="flex-1 h-[18px] rounded-sm"
                style={{ background: c.bg, opacity: active ? 1 : 0.65 }}
              />
              <span className="text-[11px] text-[#172b4d] w-12 text-right">{c.label}</span>
              {active && (
                <span className="text-[#0079bf] text-[13px] font-bold leading-none">✓</span>
              )}
            </div>
          );
        })}
      </div>
    </SubPanel>
  );
};

// ── Cover panel ───────────────────────────────────────────────────────────────
const CoverPanel = ({ cover, onCover, onBack }) => (
  <SubPanel title="Cover Color" onBack={onBack}>
    {cover && (
      <button
        onClick={() => { onCover(null); onBack(); }}
        className="w-full mb-3 px-2 py-[6px] text-[12px] bg-[#f4f5f7] border border-[#dfe1e6] rounded-md cursor-pointer hover:bg-[#e4e6ea] transition-colors"
      >
        Remove cover
      </button>
    )}
    <div className="grid grid-cols-5 gap-[6px]">
      {COVER_COLORS.map((c) => (
        <div
          key={c}
          onClick={() => { onCover(c); onBack(); }}
          className="w-[28px] h-[28px] rounded-md cursor-pointer transition-transform hover:scale-110"
          style={{
            background: c,
            outline: cover === c ? "3px solid #0079bf" : "2px solid transparent",
            outlineOffset: 2,
          }}
        />
      ))}
    </div>
  </SubPanel>
);

// ── Due Date panel ────────────────────────────────────────────────────────────
const DueDatePanel = ({ dueDate, onDueDate, onBack }) => {
  const [val, setVal] = useState(dueDate || "");

  const save = () => {
    onDueDate(val || null);
    onBack();
  };

  return (
    <SubPanel title="Due Date" onBack={onBack}>
      <input
        type="date"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="w-full px-2 py-[6px] border border-[#dfe1e6] rounded-md text-[13px] focus:outline-none focus:border-[#0079bf]"
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={save}
          className="flex-1 px-2 py-[6px] bg-[#0079bf] text-white border-none rounded-md cursor-pointer text-[12px] hover:bg-[#005fa3] transition-colors"
        >
          Save
        </button>
        {dueDate && (
          <button
            onClick={() => { onDueDate(null); onBack(); }}
            className="flex-1 px-2 py-[6px] bg-[#f4f5f7] border border-[#dfe1e6] rounded-md cursor-pointer text-[12px] hover:bg-[#e4e6ea] transition-colors"
          >
            Remove
          </button>
        )}
      </div>
    </SubPanel>
  );
};

// ── Members panel ─────────────────────────────────────────────────────────────
const MembersPanel = ({ members, onMembers, onBack }) => {
  const [search, setSearch] = useState("");
  const filtered = DEMO_MEMBERS.filter((n) =>
    n.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (name) => {
    const active = members.includes(name);
    onMembers(active ? members.filter((m) => m !== name) : [...members, name]);
  };

  return (
    <SubPanel title="Members" onBack={onBack}>
      <input
        type="text"
        placeholder="Search members…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-2 py-[5px] border border-[#dfe1e6] rounded-md text-[12px] mb-2 focus:outline-none focus:border-[#0079bf]"
      />
      <div className="flex flex-col gap-[4px] max-h-[180px] overflow-y-auto">
        {filtered.map((name) => {
          const active = members.includes(name);
          return (
            <div
              key={name}
              onClick={() => toggle(name)}
              className={`flex items-center gap-2 px-[6px] py-[5px] rounded-md cursor-pointer transition-colors ${
                active ? "bg-[#e4f0f6]" : "hover:bg-[#f4f5f7]"
              }`}
            >
              <Avatar name={name} size={26} />
              <span className="text-[12px] flex-1 text-[#172b4d]">{name}</span>
              {active && <span className="text-[#0079bf] text-[13px] font-bold">✓</span>}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-[11px] text-[#5e6c84] text-center py-2">No members found</p>
        )}
      </div>
    </SubPanel>
  );
};

// ── Checklist panel ───────────────────────────────────────────────────────────
const ChecklistPanel = ({ checklist, onChecklist, onBack }) => {
  const [title, setTitle] = useState("Checklist");

  const add = () => {
    const newItem = { id: Date.now(), text: "Item 1", done: false };
    onChecklist([...checklist, newItem]);
    onBack();
  };

  return (
    <SubPanel title="Add Checklist" onBack={onBack}>
      <div className="text-[11px] text-[#5e6c84] mb-2">Title</div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-2 py-[6px] border border-[#dfe1e6] rounded-md text-[13px] mb-2 focus:outline-none focus:border-[#0079bf]"
      />
      <button
        onClick={add}
        className="w-full px-[10px] py-[7px] bg-[#0079bf] text-white border-none rounded-md cursor-pointer text-[13px] hover:bg-[#005fa3] transition-colors"
      >
        Add
      </button>
    </SubPanel>
  );
};

// ── CardModal ─────────────────────────────────────────────────────────────────
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

  const saveDesc  = () => { onDescription(descVal); setEditDesc(false); };
  const saveTitle = () => { onUpdateContent({ content: titleVal }); setEdit(false); };

  const completedChecks = checklist.filter((i) => i.done).length;
  const checkPct = checklist.length
    ? Math.round((completedChecks / checklist.length) * 100)
    : 0;

  // Wrap each sidebar action so it also closes the sub-panel after saving
  const handleLabels    = (v) => { onLabels(v); };
  const handleCover     = (v) => { onCover(v); };
  const handleDueDate   = (v) => { onDueDate(v); };
  const handleMembers   = (v) => { onMembers(v); };
  const handleChecklist = (v) => { onChecklist(v); };

  const back = () => setPanel(null);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 bg-black/55 flex items-start justify-center z-[1000] px-4 pt-12 pb-4 overflow-y-auto"
    >
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(-12px) }
          to   { opacity: 1; transform: none }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        className="bg-[#f4f5f7] rounded-xl w-full max-w-[680px] min-h-[300px] shadow-[0_20px_60px_rgba(0,0,0,.35)] flex flex-col"
        style={{ animation: "modalIn .15s ease" }}
      >
        {/* Cover strip */}
        {cover && (
          <div
            className="h-[100px] rounded-t-xl shrink-0 relative"
            style={{ background: cover }}
          >
            <button
              onClick={() => setPanel("cover")}
              className="absolute bottom-2 right-2 bg-black/25 text-white text-[11px] px-2 py-1 rounded cursor-pointer border-none hover:bg-black/40 transition-colors"
            >
              Edit cover
            </button>
          </div>
        )}

        {/* Modal header */}
        <div className="flex items-start gap-[10px] px-5 pt-5">
          <div className="text-xl mt-[3px]">🗒</div>
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
            className="bg-transparent border-none cursor-pointer text-[#6b778c] p-1 rounded hover:bg-[#e4e6ea] hover:text-[#172b4d] transition-colors shrink-0"
          >
            <Icon.Close />
          </button>
        </div>

        {/* Body */}
        <div className="flex gap-4 px-5 pt-4 pb-5 flex-wrap">

          {/* ── Left: main content ── */}
          <div className="flex-1 min-w-0">

            {/* Description */}
            <div className="mb-5">
              <div className="text-[11px] font-bold text-[#5e6c84] mb-[6px] uppercase tracking-[0.6px] flex items-center gap-1">
                📝 Description
              </div>
              {editDesc ? (
                <div>
                  <textarea
                    autoFocus
                    value={descVal}
                    onChange={(e) => setDescVal(e.target.value)}
                    placeholder="Add a more detailed description…"
                    className="w-full min-h-[80px] px-[10px] py-2 border-2 border-[#0079bf] rounded-md resize-y font-[inherit] text-[15px] text-[#172b4d] leading-[1.6] box-border focus:outline-none"
                  />
                  <div className="flex gap-[6px] mt-[6px]">
                    <button
                      onClick={saveDesc}
                      className="px-[10px] py-[5px] bg-[#0079bf] text-white border-none rounded text-[13px] cursor-pointer hover:bg-[#005fa3] transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => { setDescVal(description || ""); setEditDesc(false); }}
                      className="px-[10px] py-[5px] bg-transparent border border-[#dfe1e6] text-[13px] text-[#6b778c] cursor-pointer rounded hover:bg-[#e4e6ea] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setEditDesc(true)}
                  className={`min-h-[70px] px-[10px] py-2 rounded-md cursor-text text-[14px] leading-[1.6] whitespace-pre-wrap break-words border-2 border-transparent hover:border-[#dfe1e6] transition-colors ${
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
                        className="text-white text-[12px] font-semibold px-[10px] py-[3px] rounded-sm"
                        style={{ background: c?.bg }}
                      >
                        {c?.label}
                      </span>
                    );
                  })}
                  <button
                    onClick={() => setPanel("label")}
                    className="bg-[#e2e4ea] border-none rounded text-[18px] cursor-pointer px-2 text-[#5e6c84] hover:bg-[#c9ccd4] transition-colors leading-none"
                    title="Edit labels"
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
                <div className="flex gap-1 flex-wrap items-center">
                  {members.map((m) => (
                    <Avatar key={m} name={m} size={32} />
                  ))}
                  <button
                    onClick={() => setPanel("members")}
                    className="w-[32px] h-[32px] rounded-full bg-[#e2e4ea] border-none cursor-pointer text-[18px] text-[#5e6c84] flex items-center justify-center hover:bg-[#c9ccd4] transition-colors"
                    title="Add member"
                  >
                    +
                  </button>
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
                  className={`inline-flex items-center gap-[5px] px-[8px] py-[4px] rounded-md text-[13px] font-medium cursor-pointer hover:opacity-80 transition-opacity`}
                  style={{
                    background: overdue(dueDate) ? "#fdd0cb" : "#d6f0cd",
                    color: overdue(dueDate) ? "#eb5a46" : "#3a7d2a",
                  }}
                  onClick={() => setPanel("date")}
                  title="Click to change date"
                >
                  <Icon.Calendar /> {fmt(dueDate)}
                  {overdue(dueDate) && <span className="text-[11px] opacity-80">· Overdue</span>}
                </div>
              </div>
            )}

            {/* Checklist */}
            {checklist.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-[6px]">
                  <div className="text-[11px] font-bold text-[#5e6c84] uppercase tracking-[0.6px] flex items-center gap-1">
                    ☑ Checklist
                  </div>
                  <span className="text-[11px] text-[#6b778c] font-medium">{checkPct}%</span>
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
                      className="flex items-center gap-2 cursor-pointer py-[3px] group"
                    >
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() =>
                          handleChecklist(
                            checklist.map((i) =>
                              i.id === item.id ? { ...i, done: !i.done } : i
                            )
                          )
                        }
                        className="w-[15px] h-[15px] accent-[#0079bf] cursor-pointer"
                      />
                      <span
                        className={`text-[13px] flex-1 ${
                          item.done ? "text-[#aaa] line-through" : "text-[#172b4d]"
                        }`}
                      >
                        {item.text}
                      </span>
                      <button
                        onClick={() =>
                          handleChecklist(checklist.filter((i) => i.id !== item.id))
                        }
                        className="bg-transparent border-none cursor-pointer text-[#bbb] text-sm p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#eb5a46]"
                      >
                        ✕
                      </button>
                    </label>
                  ))}
                </div>
                {/* Add checklist item */}
                <div className="flex gap-[6px] mt-3">
                  <input
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const t = newItem.trim();
                        if (t) {
                          handleChecklist([...checklist, { id: Date.now(), text: t, done: false }]);
                          setNewItem("");
                        }
                      }
                    }}
                    placeholder="Add an item…"
                    className="flex-1 px-2 py-[6px] border border-[#dfe1e6] rounded-md text-[13px] focus:outline-none focus:border-[#0079bf]"
                  />
                  <button
                    onClick={() => {
                      const t = newItem.trim();
                      if (t) {
                        handleChecklist([...checklist, { id: Date.now(), text: t, done: false }]);
                        setNewItem("");
                      }
                    }}
                    className="px-3 py-[6px] bg-[#0079bf] text-white border-none rounded-md cursor-pointer text-[13px] hover:bg-[#005fa3] transition-colors"
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
                {panel === "label" && (
                  <LabelPanel labels={labels} onLabels={handleLabels} onBack={back} />
                )}
                {panel === "cover" && (
                  <CoverPanel cover={cover} onCover={handleCover} onBack={back} />
                )}
                {panel === "date" && (
                  <DueDatePanel dueDate={dueDate} onDueDate={handleDueDate} onBack={back} />
                )}
                {panel === "members" && (
                  <MembersPanel members={members} onMembers={handleMembers} onBack={back} />
                )}
                {panel === "checklist" && (
                  <ChecklistPanel checklist={checklist} onChecklist={handleChecklist} onBack={back} />
                )}
              </div>
            ) : (
              <>
                <div className="text-[11px] font-bold text-[#5e6c84] uppercase tracking-[0.6px] mb-1">
                  Add to card
                </div>
                <SideBtn
                  icon={<Icon.User />}
                  label="Members"
                  onClick={() => setPanel("members")}
                  active={members.length > 0}
                />
                <SideBtn
                  icon={<Icon.Label />}
                  label="Labels"
                  onClick={() => setPanel("label")}
                  active={labels.length > 0}
                />
                <SideBtn
                  icon={<Icon.Check />}
                  label="Checklist"
                  onClick={() => setPanel("checklist")}
                  active={checklist.length > 0}
                />
                <SideBtn
                  icon={<Icon.Calendar />}
                  label="Due Date"
                  onClick={() => setPanel("date")}
                  active={!!dueDate}
                />
                <SideBtn
                  icon={<Icon.Cover />}
                  label="Cover"
                  onClick={() => setPanel("cover")}
                  active={!!cover}
                />
                <div className="text-[11px] font-bold text-[#5e6c84] uppercase tracking-[0.6px] mt-3 mb-1">
                  Actions
                </div>
                <SideBtn
                  icon={<Icon.Trash />}
                  label="Delete card"
                  danger
                  onClick={() => { onDelete(); onClose(); }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;