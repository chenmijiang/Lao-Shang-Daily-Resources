const fs = require('fs');

// 读取 文件夹内容，并使用 promise 封装
module.exports.ReadDir = function (path) {
  return new Promise(function (resolve, reject) {
    fs.readdir(path, {}, (err, files) => {
      if (err) return reject(err);
      resolve(files);
    })
  })
}

// 判断文件是否存在
module.exports.isFileExisted = function (path) {
  return new Promise((resolve, reject) => {
    fs.access(path, (err) => {
      if (err) resolve(false);
      resolve(true);
    })
  })
};

// 判断文件类型
module.exports.isDirectory = function (path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, data) => {
      if (err) reject(err);
      resolve(data.isDirectory());
    })
  })
}

// 创建文件夹
module.exports.createDirtory = function (dirpath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirpath, (err) => {
      if (err) reject(err);
      resolve('create directory successfully');
    })
  });
}

// 创建文件
module.exports.createFile = function (filepath) {
  return new Promise((resolve, reject) => {
    fs.appendFile(filepath, '', function (err) {
      if (err) reject(err);
      resolve('File is created successfully.');
    });
  });
}

// 移动文件
module.exports.moveFile = function (sourcePath, destinationPath) {
  return new Promise((resolve, reject) => {
    fs.rename(sourcePath, destinationPath, (err) => {
      if (err) reject(err);
      resolve('File moved successfully.');
    })
  })
}