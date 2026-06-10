import {Avatar, SubPanel } from "./SubPanel";

const SideBtn = ({ icon, label, active, danger, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 w-full px-[10px] py-[7px] rounded-md 
            border-none cursor-pointer text-[13px] 
            font-medium text-left transition-colors duration-[120ms] ${
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

export const SidePanel =  ({
    members,
    labels,
    cover,
    dueDate,
    checklist,
    setPanel,
    onClose,
    onDelete
}) => {

  return (
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
  );
}

