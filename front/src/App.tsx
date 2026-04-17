import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DegemerSkolWithKey from "./wrappers/DegemerSkolWithKey";
import DashboardTeacher from "./pages/user/teacher/DashboardTeacher";
import Params from "./pages/user/teacher/Params";
import ParamsSchool from "./pages/user/admin/ParamsSchool";
import ParamsLibrary from "@pages/user/admin/ParamsLibrary";
import ParamsLinks from "./pages/user/teacher/ParamsLinks";
import LibraryApp from "@pages/user/teacher/LibraryApp";
import ParamsStudents from "@pages/user/teacher/ParamsStudents";
import DashboardAdmin from "@pages/user/admin/DashboardAdmin";
import TeacherLayout from "@pages/user/teacher/TeacherLayout";
import AdminLayout from "@pages/user/admin/AdminLayout";
import RoleBasedRedirect from "@components/user/RoleBasedRedirect";
import PublicLayout from "@pages/blog/PublicLayout";
import Home from "@pages/blog/Home";
import MaJbdbHome from "@pages/appli/MaJbdbHome";
import JbdbExercise from "@pages/appli/JbdbExercise";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/*Routes publiques*/}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="jbdb/" element={<MaJbdbHome category="nope" />} />
            <Route path="jbdb/:exId" element={<JbdbExercise />} />
          </Route>

          <Route
            path="/degemer/:skol/:type?/:idft?"
            element={<DegemerSkolWithKey />}
          />

          {/* Route de redirection post-auth */}
          <Route path="/user" element={<RoleBasedRedirect />} />

          {/* Route protégée avec layout */}
          <Route path="/teacher/" element={<TeacherLayout />}>
            <Route index element={<DashboardTeacher />} />
            <Route path="params" element={<Params />} />
            <Route path="params/links" element={<ParamsLinks />} />
            <Route path="params/students" element={<ParamsStudents />} />
            <Route path="library" element={<LibraryApp />} />

            {/* autres pages */}
          </Route>
          <Route path="/admin/" element={<AdminLayout />}>
            <Route index element={<DashboardAdmin />} />
            <Route path="school" element={<ParamsSchool />} />
            <Route path="library" element={<ParamsLibrary />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
