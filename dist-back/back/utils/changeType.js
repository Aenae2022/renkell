"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserSession = toUserSession;
function toUserSession(user) {
    const { userId, userFamilyName, userFirstName, userRoles, roleActivated, userIcon, grade, userSchool, userGroups, groupsP, groupsS } = user;
    return {
        userId,
        userFamilyName,
        userFirstName,
        userRoles,
        roleActivated,
        userIcon,
        grade,
        userSchool,
        userGroups,
        groupsP,
        groupsS
    };
}
