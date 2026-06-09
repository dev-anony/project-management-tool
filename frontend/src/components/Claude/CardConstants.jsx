export const LABEL_COLORS = [
  { id: "green",  bg: "#61bd4f", label: "Green"  },
  { id: "yellow", bg: "#f2d600", label: "Yellow" },
  { id: "orange", bg: "#ff9f1a", label: "Orange" },
  { id: "red",    bg: "#eb5a46", label: "Red"    },
  { id: "purple", bg: "#c377e0", label: "Purple" },
  { id: "blue",   bg: "#0079bf", label: "Blue"   },
  { id: "teal",   bg: "#00c2e0", label: "Teal"   },
  { id: "lime",   bg: "#51e898", label: "Lime"   },
];

export const COVER_COLORS = [
  "#61bd4f","#f2d600","#ff9f1a","#eb5a46","#c377e0",
  "#0079bf","#00c2e0","#51e898","#ff78cb","#344563",
];

export const MEMBER_COLORS = ["#0079bf","#eb5a46","#61bd4f","#c377e0","#ff9f1a"];

export const DEMO_MEMBERS = ["Alice Chen", "Bob Singh", "Carlos Rivera", "Diana Park", "Evan Moore"];

export const fmt     = iso => iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : null;
export const overdue = iso => iso && new Date(iso) < new Date();