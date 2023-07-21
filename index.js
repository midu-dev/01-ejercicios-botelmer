const fs = require('node:fs/promises');

// Ejercicio 2
async function writeFile (filePath, data, callback) {
  
  const createDir = await fs.mkdir(filePath, { recursive: true });
  const createFile = await fs.writeFile(`${filePath}/hola.txt`,data, { encoding: 'utf8' })
    .then(callback)
    .catch((err)=>{
      callback(err)
    });
}
// Ejercicio 3
async function readFileAndCount (word, callback) {
    const readFile = await fs.readFile(process.argv[2], 'utf-8')
    .then((text)=>{
      let count = 0;
      count = text.split('node').length-1;
      callback(null, count);
    })
    .catch((err)=>{
      if(word === undefined) {
        err.message = 'No se ha especificado la palabra a buscar';
      }
      if(process.argv[2] === undefined) {
        err.message = 'No se ha especificado el path del archivo';
      }
      if(err.code === 'ENOENT'){
        err = null;
      }
      callback(err, 0);
    });
}

module.exports = {
  writeFile,
  readFileAndCount
}
