const Emulator = {
  cpu: {
    registers: {
      general: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      instruction: 0,
      programCounter: 0
    }
    run: () => {
      /*
      instruction set:
      */
      Emulator.ram[Emulator.cpu.programCounter]
    },
  }
  ram: []
}
