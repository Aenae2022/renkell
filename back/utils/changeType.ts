import { type UserDatasConnectType, type UserSessionConnectType } from "../../shared/schema/user.schema";

export function toUserSession(user: UserDatasConnectType): UserSessionConnectType {
  const {
    userId,
    userFamilyName,
    userFirstName,
    userType,
    userIcon,
    grade,
    userSchool,
    userGroups,
    groupsP,
    groupsS
  } = user

  return {
    userId,
    userFamilyName,
    userFirstName,
    userType,
    userIcon,
    grade,
    userSchool,
    userGroups,
    groupsP,
    groupsS
  }
}
