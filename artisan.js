#!/usr/bin/env node

// Import the 'commander' package to define command-line commands and options
import { program } from "commander";
// Import the Kernel module from the 'console' directory. This Kernel is expected
// to manage and register your CLI commands.
import Kernel from "./app/Console/Kernel.js";
import chalk from "chalk";

// Set the version of your CLI application. This version will be displayed when
// the user runs the --version or -V option.
program.version("0.1.0");

// Register commands with the 'program' (commander instance) using a method provided
// by the Kernel. This assumes that the Kernel module has a method called 'registerCommands'
// that takes the 'program' as an argument and registers commands on it.
Kernel.registerCommands(program);

// Add global option for help that triggers custom help text
program.on("--help", () => {
  console.log(chalk.green("\nExample usage:"));
  console.log(chalk.yellow("$ npm run artisan -- make:schema MySchema -m"));
});

// Parse the command-line arguments. This is necessary for the commander to process
// and handle the commands and options based on the user input.
program.parse(process.argv);

// If no command is given, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
