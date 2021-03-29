---
tags: PaulhuHsieh
---
### SMP message simulator

## 初始化:

在根目錄下的config.js修改

1. config.topic (送發的topic) 
![](https://i.imgur.com/lSL6zjd.png)
2. config.mqtt.broker (http://${URL})
3. config.mqtt.port (預設為1883)
4. config.mqtt.username (帳號)
5. config.mqtt.password (密碼)
![](https://i.imgur.com/Qx2499L.png)

## 實作

根目錄下init的資料夾

修改mqtt.js內

duration的值可以改變送發資料的頻率

傳至mqtt的值則需自行撰寫一個標準的json格式

範例為 BaseData= '{"hello":"world"}';


