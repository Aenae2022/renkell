import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DegemerSkolWithKey from "./wrappers/DegemerSkolWithKey";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            {/*Routes publiques*/}
            <Route
              path="/degemer/:skol/:type?/:idft?"
              element={<DegemerSkolWithKey />}
            />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
