import { Outlet } from "react-router-dom";
import HeaderPublic from "@components/blog/core/HeaderPublic";
import { useAuthStrict } from "@hook/useAuthStrict";
import { useEffect, useState } from "react";

export default function TeacherLayout() {
  const auth = useAuthStrict();
  const [showHeader, setShowHeader] = useState(true);
  useEffect(() => {
    if (auth.status === "authenticated") {
      setShowHeader(false);
    }
  }, [auth]);

  return (
    <div className="flex flex-col h-[100vh]">
      {showHeader && <HeaderPublic />}
      <div className="flex flex-1 relative">
        <main className="w-full mx-2">
          <Outlet /> {/* Rendu des routes enfants */}
        </main>
      </div>
      <footer>...</footer>
    </div>
  );
}
