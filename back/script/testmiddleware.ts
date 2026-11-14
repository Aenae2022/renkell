import { checkLinkDatasValid } from "../src/middleware/link/checkLinkDatasValid";
import type { Request, Response, NextFunction } from "express";
function createMockResponse() {
    const response = {
        statusCode: 200,
        body: undefined as unknown,

        status(code: number) {
            this.statusCode = code;
            return this;
        },

        json(data: unknown) {
            this.body = data;
            return this;
        },
    };

    return response;
}

let nextCalled = false;

const next = () => {
    nextCalled = true;
};

const req = {
    body: {
        linkDatas: {
            linkExId: "test-exercice",
            linkRedirection: "/test/test",
            linkParams: { test: "test" },
        },
    },
} as unknown as Request;;

async function checklinkdata() {
    const res = createMockResponse();
    await checkLinkDatasValid()(req,
        res as unknown as Response,
        next as NextFunction);
    return res;
}


async function main() {
    const res = await checklinkdata();
}

main();
