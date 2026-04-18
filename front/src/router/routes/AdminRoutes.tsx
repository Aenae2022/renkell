import type { UserSessionConnectType } from "@shared/schema/user.schema";
import { Outlet, useOutletContext } from "react-router-dom";

export default function AdminRoutes() {
  const user = useOutletContext<UserSessionConnectType>();
  return <Outlet context={user} />;
}
