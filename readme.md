# 老尚每日资料分享

## 结构说明

├─docs  
│  ├─2022-12-26  
│  ├─2022-12-27  
│  └─2022-12-28  
├─node_modules  
├─src  
│  └─utils  
└─upload  

docs 存放资料，上传到 main 分支上，缺失可以远程下载到这里

## 使用说明

- 将上传的文件放入根目录的 `upload` 文件夹 (文件上传位置)
- `yarn build [YYYY-MM-DD]` （如，`yarn build 2022-12-29`），没有指定时间就构建当日文件
- 执行 `deploy.sh` 脚本文件，即可完成构建和上传
