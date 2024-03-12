import MakeSchemaCommand from "./Commands/MakeSchemaCommand.js";
// import MakeModelCommand

class Kernel {
  static registerCommands(program) {
    // Register each command with the commander program
    // MakeModelCommand.register(program);
    MakeSchemaCommand.register(program);

    // Register other commands...
  }
}

export default Kernel;
