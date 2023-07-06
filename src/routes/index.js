import { Router } from "express";
import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import "colors";
//* Get the routes of actual directory
const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);

/* 
    Load Routes Dinamically
*/

const router = Router();

//Remove Extension of file

const cleanFileName = (fileName) => {
  return fileName.split(".").shift();
};

readdirSync(currentDir).filter((file) => {
  const cleanName = cleanFileName(file);
  //Ignore index.js
  if (cleanName === "index") return;
  console.log(`Loading route ${cleanName.blue}`);

  import(`./${cleanName}.routes.js`).then((module) => {
    router.use(`/${cleanName}`, module.router);
  });
});

export { router };
