import FileCreator from "../../Utilities/fileCreator.js";
import chalk from "chalk";
import path from "path";
import { fileURLToPath } from "url";

// Calculate the directory name for the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

class MakeSchemaCommand {
  static get commandName() {
    return "make:schema";
  }

  static get description() {
    return "Create a new schema, optionally with its associated model";
  }

  /**
   * Registers the command to the provided commander instance.
   * @param {import('commander').Command} program The commander instance to register the command with.
   */
  static register(program) {
    program
      .command(`${this.commandName} <name>`)
      .description(this.description)
      .option("-m, --model", "Also create a model for the schema")
      .action((name, options) => {
        this.handle(name, options);
      });
  }

  /**
   * Handles the command execution.
   * @param {string} name The name of the schema.
   * @param {Object} options Command options.
   */
  static handle(name, options) {
    const schemaFilePath = this.createSchema(name);
    console.log(chalk.green(`${name} schema created: ${schemaFilePath?.path}`));

    if (options.model) {
      const modelFilePath = this.createModel(name, schemaFilePath);
      console.log(chalk.green(`${name} model created: ${modelFilePath}`));
    }
  }

  /**
   * Creates a schema file using the FileCreator utility.
   * @param {string} name The name of the schema.
   * @returns {array} The file path and file name of the created schema.
   */
  static createSchema(name) {
    const schemaDirectory = path.join(__dirname, "../../../database/schemas");
    const schemaName = name.toLowerCase();

    const fileName = `create_${schemaName}_schema.js`;
    const templatePath = path.join(
      __dirname,
      "../../../stubs/schemas/Schema.stub"
    );

    // Placeholder replacement map
    const replacements = {
      ModelName: name,
    };

    FileCreator.createFileFromTemplate(
      schemaDirectory,
      fileName,
      templatePath,
      replacements,
      "Schema"
    );
    return {
      path: path.join(schemaDirectory, fileName),
      name: fileName,
    };
  }

  /**
   * Creates a model file associated with the schema.
   * This function is called when a schema file is created with the --model flag,
   * indicating that its associated model should also be created and the schema imported into the model.
   * @param {string} name The name of the model (and schema).
   * @param {object} schemaFile The file path and file name of the created schema.
   * @returns {string} The file path of the created model.
   */
  static createModel(name, schemaFile) {
    const modelDirectory = path.join(__dirname, "../../Models");
    const fileName = `${name}.js`;
    // Using a template that imports the schema
    const templatePath = path.join(
      __dirname,
      "../../../stubs/models/ModelWithSchema.stub"
    );
    // Calculate relative path from model directory to schema file
    const relativeSchemaPath = path
      .relative(modelDirectory, schemaFile?.path)
      .replace(/\.js$/, "");

    // Setup replacements for placeholders in the template
    const replacements = {
      modelName: name,
      schemaName: `${name}Schema`,
      schemaFile: schemaFile?.name,
      schemaImportPath: `../${relativeSchemaPath}`,
    };

    // Use FileCreator utility to create the model file from the template
    FileCreator.createFileFromTemplate(
      modelDirectory,
      fileName,
      templatePath,
      replacements,
      "Model"
    );
    const modelFilePath = path.join(modelDirectory, fileName);

    return modelFilePath;
  }
}

export default MakeSchemaCommand;
