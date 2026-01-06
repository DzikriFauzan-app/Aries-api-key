"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE_PERMISSIONS = void 0;
exports.ROLE_PERMISSIONS = {
    ROOT: { canApprove: true, canExecute: true },
    COMMANDER: { canApprove: true, canExecute: true },
    WORKER: { canApprove: false, canExecute: true },
    OBSERVER: { canApprove: false, canExecute: false }
};
