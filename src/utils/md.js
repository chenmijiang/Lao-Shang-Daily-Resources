const fs = require('fs');
const path = require('path');

// 内容写入到 md 文件中
module.exports.writeMD = function (docsMap, mdPath) {
  // 内容
  let content = ['# 老尚每日资料分享'];
  // 逆序排序
  let keys = Object.keys(docsMap).sort().reverse();
  for (const key of keys) {
    content.push(`## ${key}`);
    for (const value of docsMap[key]) {
      content.push(`- [${value}](./${key}/${value})`);
    }
  }

  content = content.join('\n\n');

  fs.writeFile(mdPath, content, { flag: 'w+' }, (err) => {
    if (err) console.log(err);
  })
}