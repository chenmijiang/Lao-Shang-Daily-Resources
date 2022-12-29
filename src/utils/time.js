const moment = require('moment')  //引入moment

// 获取时间，格式 xxxx-xx-xx （默认）
module.exports.getCurrentTime = function (formats = 'YYYY-MM-DD') {
  moment.locale('zh-cn');

  let time = moment().format(formats);

  return time || 'others';
}
