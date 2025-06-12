import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DegemerSkolWithKey from "./wrappers/DegemerSkolWithKey";
import DashboardTeacher from "./pages/user/teacher/DashboardTeacher";
import Params from "./pages/user/teacher/Params";
import ParamsLinks from "./pages/user/teacher/ParamsLinks";
import TeacherLayout from "./pages/user/teacher/TeacherLayout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/*Routes publiques*/}
          <Route
            path="/degemer/:skol/:type?/:idft?"
            element={<DegemerSkolWithKey />}
          />

          {/* Route protégée avec layout */}
          <Route path="/teacher/" element={<TeacherLayout />}>
            <Route index element={<DashboardTeacher />} />
            <Route path="params" element={<Params />} />
            <Route path="params/links" element={<ParamsLinks />} />
            {/* autres pages */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
