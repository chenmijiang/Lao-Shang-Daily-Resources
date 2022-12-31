const fs = require('fs');
const path = require('path');

/**
 * 内容写入到 md 文件中
 * @param {object} docsMap 映射内容
 * @param {string} mdPath md文件输出地址
 * @param {object} param 可选参数 
 */
module.exports.contentToMD = function (docsMap, mdPath, { year = 0, fold = 15, limit = 100 } = {}) {
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

    for (const book of docsMap[keys[i]]) {
      content.push(`- [${book}](./${keys[i].slice(0, 4)}/${keys[i]}/${book.replaceAll(' ', '%20')})`);
    }
    i >= fold ? content.push('</details>') : '';
  }

  content = content.join('\n\n');

  // 写入 md 文件中
  fs.writeFile(path.resolve(mdPath, 'readme.md'), content, { flag: 'w+' }, (err) => {
    if (err) console.log(err);
  })
}

/**
 * 内容转 html 内容
 * @param {object} docsMap 映射内容
 * @param {string} mdPath html文件输出地址
 * @param {object} param 可选参数 
 * @returns 
 */
module.exports.contentToHTML = function (docsMap, mdPath, { fold = 20, limit = 100, title = '老尚每日资料分享' } = {}) {
  docsMap = Object.keys(docsMap).reduce((pre, cur) => {
    return { ...pre, ...docsMap[cur] }
  }, {})

  let htmlContent = [`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title></head><body>`];
  htmlContent.push(`<h1 id="${title}">${title}</h1>`);
  // 添加样式
  htmlContent.push('<style>body{margin: 20px 10px 40px;} a{text-decoration:none;color:blue;} a:hover{text-decoration:underline;} a:visited{color:red;}</style>');
  // 逆序排序
  let keys = Object.keys(docsMap).sort().reverse();
  for (let i = 0; i < keys.length; i++) {
    // 限制展示天数
    if (i >= limit) break;
    // 限制展示细节
    if (i < fold) {
      htmlContent.push(`<h2 class="daytime ${keys[i]}">${keys[i]}</h2><ul>`);
    } else {
      htmlContent.push(`<details><summary>${keys[i]}</summary><ul>`);
    }

    for (const book of docsMap[keys[i]]) {
      htmlContent.push(`<li><p><a href="./${keys[i].slice(0, 4)}/${keys[i]}/${book.replaceAll(' ', '%20')}">${book}</a></p></li>`)
    }
    i < fold ? htmlContent.push('</ul>') : htmlContent.push('</ul></details>');
  }
  htmlContent.push('</body></html>');

  // 写入 html 文件中
  fs.writeFile(path.resolve(mdPath, 'index.html'), htmlContent.join(''), { flag: 'w+' }, (err) => {
    if (err) console.log(err);
  })
}