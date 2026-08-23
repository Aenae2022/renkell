"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../lib/prisma/client");
class DomaineModel {
    static async doesDomaineExist(domaine) {
        const domaineSearch = await client_1.prisma.domaine.findUnique({
            where: { id: domaine },
            select: { id: true },
        });
        return !!domaineSearch;
    }
}
exports.default = DomaineModel;
