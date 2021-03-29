---
tags: PaulhuHsieh
---
# SMP message simulator

topic: smp/metering/data 

## 初始化:

--- 安裝nodejs環境

--- 安裝完後在專案下 npm install

--- 在根目錄下的config.js修改:

1. config.mqtt.broker (http://${URL})
2. config.mqtt.port (預設為1883)
3. config.mqtt.username (帳號)
4. config.mqtt.password (密碼)
![](https://i.imgur.com/Qx2499L.png)

## 實作

根目錄下init的資料夾

修改mqtt.js內

duration的值可以改變送發資料的頻率 (單位為毫秒)

而傳遞的資料由BaseData的字串組成 (json格式)

### 變數產生一率用Math.random()來隨機產生數值決定哪一組固定的資料，詳見以下描述

變數randomVarUsername隨機產生 0~5的數值
用來隨機選擇一個固定的userId與username
![](https://i.imgur.com/o6mfrvs.png)
S

變數randomVarDeviceName隨機產生 0~5的數值
用來隨機選擇一個固定的deviceId與deviceName
![](https://i.imgur.com/SfRG6TV.png)
S

變數randomVarAppName隨機產生 0~7的數值
用來隨機選擇一個固定的AppId與AppName
![](https://i.imgur.com/c16sq5R.png)


變數randomVarCharge隨機產生 0~2的數值
用來隨機選擇一個固定的chargeType
![](https://i.imgur.com/4VI6ZAh.png)

最後透過publish function來送至broker


