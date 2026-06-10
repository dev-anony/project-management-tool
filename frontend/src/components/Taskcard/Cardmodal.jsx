import { SidePanel } from "./SidePanel";
import { Avatar, SubPanel } from "./SubPanel";

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

  const [panel, setPanel] = useState(null);
  const [editTitle, setEdit] = useState(false);
  const [titleVal, setTitleVal] = useState(task.content);
  const [descVal, setDescVal] = useState(description || "");
  const [editDesc, setEditDesc] = useState(false);
  const [newItem, setNewItem] = useState("");
  const overlayRef = useRef();

  const saveDesc  = () => { onDescription(descVal); setEditDesc(false); };
  const saveTitle = () => { onUpdateContent({ content: titleVal }); setEdit(false); };

  const completedChecks = checklist.filter((i) => i.done).length;

  return (
    <div
      ref={overlayRef}
    >
    </div>
  );
}

export default CardModal;
