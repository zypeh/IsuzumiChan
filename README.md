# IsuzumiChan
<img align="right" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQd2zP00mKdr_9onsA1XgJc8nSod-fXdPpYBJuVV2Yt4JQA7lPx" alt="misato" />

> Waifu assistant, telegram bot written in Nodejs

## How to use
* Clone it from github
* Ask for a API token from `@botfather`
* Append the API token to the token variable
```js
// API token here
const token = '197973471:AAE-8hOhycXdD3StG2G07nVx9QHWgrmIXs8'
// Setup polling way
const bot = new TelegramBot(token, { polling: { timeout: 3, interval: 1000 } })
```

---

> [zypeh.github.io](https://zypeh.github.io) &nbsp;&middot;&nbsp;
> GitHub [@zypeh](https://github.com/zypeh) &nbsp;&middot;&nbsp;
> Twitter [@ZhengyanPeh](https://twitter.com/ZhengyanPeh)
