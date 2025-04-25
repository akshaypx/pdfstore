const express = require("express");
const fs = require("fs");
const path = require("path");
const { getFilesFromFolder, fileToBytes } = require("./utils/utils");
const { PDFDocument } = require("pdf-lib");

const app = express();

const PORT = 8000;
const BASE_PATH = "C:/Projects/pdfreader/server/src/files";

app.get("/health", (req, res) => {
  return res.send({ test: "ok" });
});

app.get("/all-pdf", async (req, res) => {
  const pdfFilesData = [];
  const files = getFilesFromFolder(BASE_PATH);
  if (files && files.length > 0) {
    for (const file of files) {
      const existingPdfBytes = fileToBytes(BASE_PATH + "/" + file);
      const pdfDoc = await PDFDocument.load(existingPdfBytes, {
        updateMetadata: false,
      });
      const currentFileData = {
        Title: pdfDoc.getTitle(),
        Author: pdfDoc.getAuthor(),
        Subject: pdfDoc.getSubject(),
        Creator: pdfDoc.getCreator(),
        Keywords: pdfDoc.getKeywords(),
        Producer: pdfDoc.getProducer(),
        "Creation Date": pdfDoc.getCreationDate(),
        "Modification Date": pdfDoc.getModificationDate(),
      };
      pdfFilesData.push(currentFileData);
    }
    return res.send({ data: pdfFilesData });
  } else {
    return res.send(404, { error: "No Files found" });
  }
});

app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});
