const path = require('path');

const jsonfile = require('jsonfile');

const { getCurrentTime } = require('./utils/time');
const { ReadDir, createDirtory, moveFile } = require('./utils/file');
const { contentToMD, contentToHTML } = require('./utils/translate');

const uploadPath = path.resolve(__dirname, '..', 'upload');

ReadDir(uploadPath).then(async (files) => {
  // 1. 扫描 upload 文件夹 中是否存在文件
  if (files.length === 0) {
    return;
  }
  // 指定 时间 或 当日的文件夹
  let timeDir = process.argv.slice(2)[0] || getCurrentTime();
  let yearDir = timeDir.slice(0, 4);
  let yearPath = path.join(__dirname, '..', 'docs', yearDir);
  let timePath = path.join(yearPath, timeDir);
  // map映射
  let mapPath = path.join(__dirname, '..', 'map.json');
  let docsMap = await jsonfile.readFile(mapPath);

  try {
    // 2. 检查 是否存在当日命名的文件夹，不存在就创建
    !docsMap[yearDir] && (docsMap[yearDir] = {}, await createDirtory(yearPath));
    !(docsMap[yearDir][timeDir]) && (docsMap[yearDir][timeDir] = [], await createDirtory(timePath));
  } catch (error) {
    console.log(error);
  }
  // 3. 将 upload 中的文件 移动到 日期文件夹下
  for (const file of files) {
    !(docsMap[yearDir][timeDir]).includes(file) && (docsMap[yearDir][timeDir]).push(file);
    await moveFile(path.resolve(uploadPath, file), path.join(timePath, file));
  }
  // 4. 更新 json 文件
  jsonfile.writeFile(mapPath, docsMap, { spaces: 2 }, (err) => {
    if (err) console.log('写入失败');
  })
  // 5. 修改 reamde 文件 信息
  contentToMD(docsMap, path.join(__dirname, '..', 'docs'));
  contentToHTML(docsMap, path.join(__dirname, '..', 'docs'));
});