import { UserSessionConnectType } from "../../shared/schema/user.schema";

const sessionStore = new Map<string, { user: UserSessionConnectType }>();
export default sessionStore;
