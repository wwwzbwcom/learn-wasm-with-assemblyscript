import ASModule from "../build/asm";

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

async function init() {
  const res = await (await fetch("asm.wasm")).arrayBuffer();
  const asModule = ((await window.WebAssembly.instantiate(
    res,
    importObj
  )).instance.exports as unknown) as typeof ASModule;

  console.log(asModule);

  (window as any).asModule = asModule;
}

init();