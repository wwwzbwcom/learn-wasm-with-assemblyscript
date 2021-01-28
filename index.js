"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const memory = new WebAssembly.Memory({ initial: 256, maximum: 1024 });
const importObj = {
    env: {
        abortStackOverflow: () => {
            throw new Error("overflow");
        },
        table: new WebAssembly.Table({
            initial: 0,
            maximum: 0,
            element: "anyfunc",
        }),
        tableBase: 0,
        memory: memory,
        memoryBase: 1024,
        STACKTOP: 0,
        STACK_MAX: memory.buffer.byteLength,
    },
};
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (yield fetch("asm.wasm")).arrayBuffer();
        const asModule = (yield window.WebAssembly.instantiate(res, importObj)).instance.exports;
        console.log(asModule);
        window.asModule = asModule;
    });
}
init();
