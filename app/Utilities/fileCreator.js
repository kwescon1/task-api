import chalk from "chalk";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

class FileCreator {
  /**
   * Create a file from a template with replacements and save it to the specified directory.
   * @param {string} directory - The directory where the file will be saved.
   * @param {string} fileName - The name of the file to create.
   * @param {string} templatePath - The path to the template file.
   * @param {Object} replacements - Key-value pairs for template replacements.
   */
  static createFileFromTemplate(
    directory,
    fileName,
    templatePath,
    replacements = {},
    type
  ) {
    if (!existsSync(directory)) {
      mkdirSync(directory, { recursive: true });
    }

    const finalPath = join(directory, fileName);

    console.log(chalk.yellow(`Creating ${type} ${fileName} ...`));

    // Check if the file already exists
    if (existsSync(finalPath)) {
      console.log(chalk.red(`${type} : ${fileName} already exists`));
      process.exit(1);
    }

    // Read the template file
    let content = readFileSync(templatePath, "utf8");

    // Replace placeholders with actual values
    Object.entries(replacements).forEach(([placeholder, replacement]) => {
      // Using a regex to replace all instances of the placeholder
      const regex = new RegExp(placeholder, "g");
      content = content.replace(regex, replacement);
    });

    // Write the replaced content to the final file path
    writeFileSync(finalPath, content);
  }
}

export default FileCreator;
