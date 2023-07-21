const fs = require('node:fs/promises');
const path = require('node:path')

// Ejercicio 2
async function writeFile (filePath, data, callback) {
  const file = path.join(filePath, 'file.txt')

  const createDir = await fs.mkdir(filePath, { recursive: true });
  const createFile = await fs.writeFile(file, data, { encoding: 'utf8' })
    .then(()=>{
      callback(null);
    })
    .catch((err)=>{
      callback(err);
    });
}

// Ejercicio 3
async function readFileAndCount (word, callback) {
  let count = 0;
  const readFile = await fs.readFile(process.argv[2], 'utf-8')
  .then((text)=>{
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
    callback(err, count);
  });
}

module.exports = {
  writeFile,
  readFileAndCount
}
