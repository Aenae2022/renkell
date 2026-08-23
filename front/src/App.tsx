import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DegemerSkolWithKey from "./wrappers/DegemerSkolWithKey";
import DashboardTeacher from "./pages/user/teacher/DashboardTeacher";
import Params from "./pages/user/teacher/Params";
// import ParamsSchool from "./pages/user/admin/ParamsSchool";
// import ParamsLibrary from "@pages/user/admin/ParamsLibrary";
import ParamsLinks from "./pages/user/teacher/ParamsLinks";
import LibraryApp from "@pages/user/teacher/LibraryApp";
import ParamsStudents from "@pages/user/teacher/ParamsStudents";
// import DashboardAdmin from "@pages/user/admin/DashboardAdmin";
import RoleBasedRedirect from "@components/user/RoleBasedRedirect";
import Home from "@pages/blog/Home";
import JbdbExercise from "@pages/appli/maths/jbdb/JbdbExercise";
import Applies from "@pages/user/teacher/Applies";
import MaJbdbHomeContainer from "@pages/appli/maths/jbdb/MaJbdbHomeContainer";
import SuperLayout from "./layouts/SuperLayout";
import TeacherRoutes from "./router/routes/TeacherRoutes";
import PublicRoutes from "./router/routes/PublicRoutes";
// import AdminRoutes from "./router/routes/AdminRoutes";
import Denombre1 from "@pages/appli/maths/nombre/Denombre1";
import EcrireNombre from "@pages/appli/maths/nombre/EcrireNombre";
import EcrireNombreParams from "@pages/appli/maths/nombre/EcrireNombreParams";
import EcrireNombreParamsContainer from "@pages/appli/maths/nombre/EcrireNombreParamsContainer";
import Denombre1ParamsContainer from "@pages/appli/maths/nombre/Denombre1ParamsContainer";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* ===================== */}
          {/* ❌ ROUTES HORS SUPERLAYOUT */}
          {/* ===================== */}

          <Route
            path="/degemer/:skol/:type?/:idft?"
            element={<DegemerSkolWithKey />}
          />

          <Route path="/user" element={<RoleBasedRedirect />} />

          {/* ===================== */}
          {/* 🔵 SUPERLAYOUT GLOBAL */}
          {/* ===================== */}

          <Route element={<SuperLayout />}>
            {/* PUBLIC */}
            <Route path="/" element={<PublicRoutes />}>
              <Route index element={<Home />} />
              <Route path="jbdb/:exId" element={<JbdbExercise />} />
              <Route path="nbre/ex/den1" element={<Denombre1 />} />
              <Route path="nbre/ex/ecrire" element={<EcrireNombre />} />
              <Route
                path="nbre/ecrireParams"
                element={<EcrireNombreParams />}
              />
            </Route>

            {/* TEACHER */}
            <Route path="/teacher" element={<TeacherRoutes />}>
              <Route index element={<DashboardTeacher />} />
              <Route path="params" element={<Params />} />
              <Route path="params/links" element={<ParamsLinks />} />
              <Route path="params/students" element={<ParamsStudents />} />
              <Route path="applies" element={<Applies />} />
              <Route path="library" element={<LibraryApp />} />
              <Route path="jbdb" element={<MaJbdbHomeContainer />} />
              <Route path="jbdb/:exId" element={<JbdbExercise />} />
              <Route path="nbre/ex/ecrire" element={<EcrireNombre />} />
              <Route path="nbre/ex/den1" element={<Denombre1 />} />
              <Route
                path="nbre/ecrireParams"
                element={<EcrireNombreParamsContainer />}
              />
              <Route
                path="nbre/denombre1Params"
                element={<Denombre1ParamsContainer />}
              />
            </Route>

            {/* ADMIN */}
            {/* <Route path="/admin" element={<AdminRoutes />}>
              <Route index element={<DashboardAdmin />} />
              <Route path="school" element={<ParamsSchool />} />
              <Route path="library" element={<ParamsLibrary />} />
            </Route> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
