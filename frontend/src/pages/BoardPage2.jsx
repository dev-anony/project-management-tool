import { useState } from "react";
import BoardCanvas from "../components/Board/Board";
import Header from "../components/Board/Header";

function BoardPage2() {
  const [title, setTitle] = useState("My Board");
  const [search, setSearch] = useState("search");

  /*const members = [
    { id: 1, name: "u1", username: "u1", initials: "A", avatarUrl: "", isAdmin: true },
    { id: 2, name: "u2", username: "u2", initials: "B", avatarUrl: "" },
  ];
  */
  const powerUps = [
    { id: "automation", label: "Automation", icon: "⚙️", onClick: () => alert("Automation clicked!") },
  ];


  return (
    <div className="h-screen w-screen">
      <Header 
        title={title}
        powerUps={powerUps}
        onOpenMenu={() => alert("Menu opened")}
        onDashBoard={() => alert("Go to Dashboard")}
        onTitleChange={(newTitle) => setTitle(newTitle)}
        search={search}
        setSearch={(newSearch) => setSearch(newSearch)}
        className="items-start"
      />
  
      <div className="h-[410px] w-full absolute bottom-0">
        <BoardCanvas />
      </div>
    </div>
  );
}
export default BoardPage2;

