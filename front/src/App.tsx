import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DegemerSkolWithKey from "./wrappers/DegemerSkolWithKey";
import UserLayout from "./pages/user/UserLayout";
import Dashboard from "./pages/user/Dashboard";
import Params from "./pages/user/Params";

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
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/params" element={<Params />} />"
            {/* autres pages */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
