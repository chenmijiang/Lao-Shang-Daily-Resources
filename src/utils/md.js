const fs = require('fs');

/**
 * 内容写入到 md 文件中
 * @param {object} docsMap 映射内容
 * @param {string} mdPath md文件输出地址
 * @param {object} param 可选参数 
 */
module.exports.writeMD = function (docsMap, mdPath, { year = 0, fold = 15, limit = 100 } = {}) {
  if (year === 0) {
    docsMap = Object.keys(docsMap).reduce((pre, cur) => {
      return { ...pre, ...docsMap[cur] }
    }, {})
  } else {
    docsMap = docsMap[year];
  }
  // 内容
  let content = ['# 老尚每日资料分享'];
  // 逆序排序
  let keys = Object.keys(docsMap).sort().reverse();
  for (let i = 0; i < keys.length; i++) {
    // 限制展示天数
    if (i >= limit) break;
    // 限制展示细节
    if (i < fold) {
      content.push(`## ${keys[i]}`);
    } else {
      content.push(`<details><summary>${keys[i]}</summary>`);
    }

    for (const value of docsMap[keys[i]]) {
      content.push(`- [${value}](./${keys[i].slice(0, 4)}/${keys[i]}/${value.replaceAll(' ', '%20')})`);
    }
    i >= fold ? content.push('</details>') : '';
  }

  content = content.join('\n\n');

  fs.writeFile(mdPath, content, { flag: 'w+' }, (err) => {
    if (err) console.log(err);
  })
}