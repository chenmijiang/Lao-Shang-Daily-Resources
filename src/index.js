const path = require('path');

const jsonfile = require('jsonfile');

const { getCurrentTime } = require('./utils/time');
const { ReadDir, createDirtory, moveFile } = require('./utils/file');
const { writeMD } = require('./utils/md');

const uploadPath = path.resolve(__dirname, '..', 'upload');

ReadDir(uploadPath).then(async (files) => {
  // 1. 扫描 upload 文件夹 中是否存在文件
  if (files.length === 0) {
    return;
  }
  // 2. 检查 是否存在当日命名的文件夹，不存在就创建
  let timeDir = getCurrentTime();
  let timePath = path.join(__dirname, '..', 'docs', timeDir);
  let mapPath = path.join(__dirname, '..', 'map.json');
  let docsMap = await jsonfile.readFile(mapPath);

  !docsMap[timeDir] && (docsMap[timeDir] = [], createDirtory(timePath));
  // 3. 将 upload 中的文件 移动到 日期文件夹下
  for (const file of files) {
    !docsMap[timeDir].includes(file) && docsMap[timeDir].push(file);
    await moveFile(path.resolve(uploadPath, file), path.join(timePath, file));
  }
  // 4. 更新 json 文件
  jsonfile.writeFile(mapPath, docsMap, { spaces: 2 }, (err) => {
    if (err) console.log('写入失败');
  })
  // 5. 修改 reamde 文件 信息
  writeMD(docsMap, path.join(__dirname, '..', 'docs', 'reamde.md'));
  // 6. 执行脚本文件 上传到仓库中

});