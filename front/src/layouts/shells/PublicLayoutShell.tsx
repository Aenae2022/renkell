import HeaderPublic from "@components/blog/core/HeaderPublic";
import { Outlet } from "react-router-dom";

function PublicLayoutShell() {
  return (
    <div className="flex flex-col h-[100vh]">
      <HeaderPublic />
      <div className="flex flex-1 relative">
        <main className="w-full mx-2">
          <Outlet /> {/* Rendu des routes enfants */}
        </main>
      </div>
      <footer>...</footer>
    </div>
  );
}

export default PublicLayoutShell;
