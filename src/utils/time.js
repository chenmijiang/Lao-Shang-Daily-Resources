const moment = require('moment')  //引入moment

// 获取时间格式 xxxx-xx-xx （默认）
function getCurrentTime(formats = 'YYYY-MM-DD') {
  moment.locale('zh-cn');

  let time = moment().format(formats);

  return time || 'others';
}

module.exports.getCurrentTime = getCurrentTime;