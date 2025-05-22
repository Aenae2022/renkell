import "./index.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import DegemerSkol from "./pages/school/DegemerSkol";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/*Routes publiques*/}
          <Route
            path="/degemer/:skol/:type?/:idft?"
            element={<DegemerSkol />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
