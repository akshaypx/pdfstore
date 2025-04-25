const fs = require("fs");
const path = require("path");

function getFilesFromFolder(folderPath) {
  try {
    const files = fs.readdirSync(folderPath);
    return files.filter((file) =>
      fs.statSync(path.join(folderPath, file)).isFile()
    );
  } catch (err) {
    console.error("Error reading folder:", err);
    return [];
  }
}

function fileToBytes(filePath) {
  try {
    const fileData = fs.readFileSync(filePath);
    return new Uint8Array(fileData);
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
}

module.exports = { getFilesFromFolder, fileToBytes };
