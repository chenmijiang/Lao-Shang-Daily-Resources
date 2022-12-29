const fs = require('fs');

// 内容写入到 md 文件中
module.exports.writeMD = function (docsMap, mdPath, count = 15) {
  // 内容
  let content = ['# 老尚每日资料分享'];
  // 逆序排序
  let keys = Object.keys(docsMap).sort().reverse();
  for (let i = 0; i < keys.length; i++) {
    // 超过 15 天的数据进行折叠处理
    if (i < count) {
      content.push(`## ${keys[i]}`);
    } else {
      content.push(`<details><summary>${keys[i]}</summary>`);
    }
    for (const value of docsMap[keys[i]]) {
      content.push(`- [${value}](./${keys[i]}/${value.replaceAll(' ', '%20')})`);
    }
    i >= count ? content.push('</details>') : '';
  }

  content = content.join('\n\n');

  fs.writeFile(mdPath, content, { flag: 'w+' }, (err) => {
    if (err) console.log(err);
  })
}