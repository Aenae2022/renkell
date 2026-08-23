"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailFinishSchema = exports.MailSchema = void 0;
const zod_1 = require("zod");
exports.MailSchema = zod_1.z.object({
    recipient: zod_1.z.string().email(),
    sender: zod_1.z.number().int(),
    subject: zod_1.z.string().min(1),
    message: zod_1.z.string().min(1),
});
exports.MailFinishSchema = zod_1.z.object({
    recipient: zod_1.z.string().email(),
    sender: zod_1.z.string().email(),
    subject: zod_1.z.string().min(1),
    message: zod_1.z.string().min(1),
});
