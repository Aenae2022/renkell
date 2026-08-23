"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../lib/prisma/client");
class SousDomaineModel {
    static async doesSousDomaineExist(sousDomaine) {
        const sousDomaineSearch = await client_1.prisma.sousDomaine.findUnique({
            where: { id: sousDomaine },
            select: { id: true },
        });
        return !!sousDomaineSearch;
    }
}
exports.default = SousDomaineModel;
