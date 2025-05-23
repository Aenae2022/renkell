import { useLocation } from "react-router-dom";
import DegemerSkol from "../pages/school/DegemerSkol";

export const DegemerSkolWithKey = () => {
  const location = useLocation();
  return <DegemerSkol key={location.pathname} />;
};

export default DegemerSkolWithKey;
