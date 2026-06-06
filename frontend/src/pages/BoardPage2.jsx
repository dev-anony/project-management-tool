import { useState } from "react";
import BoardCanvas from "../components/Board/Board";
import Header from "../components/Board/Header";

function BoardPage2() {
  const [title, setTitle] = useState("My Board");

  /*const members = [
    { id: 1, name: "u1", username: "u1", initials: "A", avatarUrl: "", isAdmin: true },
    { id: 2, name: "u2", username: "u2", initials: "B", avatarUrl: "" },
  ];
  */
  const powerUps = [
    { id: "automation", label: "Automation", icon: "⚙️", onClick: () => alert("Automation clicked!") },
  ];


  return (
    <div className="h-screen flex flex-col">
      <div className="h-16 shrink-0">
        <Header 
          title={title}
          powerUps={powerUps}
          onOpenMenu={() => alert("Menu opened")}
          onDashBoard={() => alert("Go to Dashboard")}
          onTitleChange={(newTitle) => setTitle(newTitle)}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">

        <div className="">
        </div>

        <div className="flex-1 relative absolute bottom-0">
          <BoardCanvas />
        </div>

      </div>
    </div>
  );
}
export default BoardPage2;

