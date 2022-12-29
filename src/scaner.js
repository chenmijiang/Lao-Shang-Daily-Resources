// 扫描 docs 文件夹 ，构建 map.json 文件
const path = require('path');
const jsonfile = require('jsonfile');

const { ReadDir } = require('./utils/file');
const { writeMD } = require('./utils/md');

const docsPath = path.resolve(__dirname, '..', 'docs');
const mapPath = path.join(__dirname, '..', 'map.json');


ReadDir(docsPath).then(async (years) => {
  let map = {};
  for (const year of years) {
    // 排除以下文件(夹)
    if ('.git' === year || 'readme.md' === year) continue;
    map[year] = {};
    // 1. 扫描 year 文件夹，获取相应的 日期 文件描述符
    try {
      let dirs = await ReadDir(path.resolve(docsPath, year))
      for (const dir of dirs) {
        map[year][dir] = [];
        // 2. 扫描 日期 文件描述符下面的 文件名
        try {
          let files = await ReadDir(path.resolve(__dirname, '..', 'docs', year, dir));
          for (const file of files) {
            // 3. 构建 以 日期描述符为 键，文件名数组为 值 的 json 格式
            !(map[year][dir]).includes(file) && (map[year][dir]).push(file);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 4. 写入到 根目录的 json 文件中
  jsonfile.writeFile(mapPath, map, { spaces: 2 }, (err) => {
    if (err) console.log('写入失败');
  })
  //  5. 修改 reamde 文件 信息
  writeMD(map, path.join(docsPath, 'readme.md'));
})
