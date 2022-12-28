// 扫描 docs 文件夹 ，构建 map.json 文件
const path = require('path');
const jsonfile = require('jsonfile');

const { ReadDir } = require('./utils/file');
const { writeMD } = require('./utils/md');

// 1. 扫描 docs 文件夹，获取相应的 日期 文件描述符
ReadDir(path.resolve(__dirname, '..', 'docs')).then(async (dirs) => {
  let map = {};
  for (const dir of dirs) {
    // 排除以下文件(夹)
    if ('.git' === dir || 'readme.md' === dir) continue;
    map[dir] = [];
    // 2. 扫描 日期 文件描述符下面的 文件名
    try {
      let files = await ReadDir(path.resolve(__dirname, '..', 'docs', dir));
      for (const file of files) {
        // 3. 构建 以 日期描述符为 键，文件名数组为 值 的 json 格式
        !(map[dir]).includes(file) && map[dir].push(file);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // 4. 写入到 根目录的 json 文件中
  let mapPath = path.join(__dirname, '..', 'map.json');

  jsonfile.writeFile(mapPath, map, { spaces: 2 }, (err) => {
    if (err) console.log('写入失败');
  })
  writeMD(map, path.join(__dirname, '..', 'docs', 'readme.md'));
})