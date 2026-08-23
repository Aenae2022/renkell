"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoles = checkRoles;
function checkRoles(allowedRoles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !allowedRoles.includes(user.roleActivated.roleName)) {
            console.error("Accès interdit : rôle non autorisé middleware checkRoles");
            res.status(400).json({ message: "Accès interdit." });
            return;
        }
        next(); // continuer si tout est OK
    };
}
