'use strict'

import { readableFileSize } from '../utils/filesize'

export default (bot) => {

  bot.onText(/^ping/, (msg, match) => {
    let reply_msg = '*pong* (无力www'

    if (msg.from.username === 'zypeh')
      reply_msg = "*pong* 啦 (认真脸"

    bot.sendMessage(msg.chat.id, reply_msg, {
        parse_mode: 'markdown',
        reply_to_message_id: msg.message_id
      })
    })

  bot.onText(/^superping/, (msg, match) => {
    if (msg.chat.type === 'private') {
      bot.sendMessage(msg.chat.id,
      `Running archicture: ${process.arch}\n` +
      `CPU ticks: ${process.cpuUsage().system}\n` +
      `Resident Set Size: ${readableFileSize(process.memoryUsage().rss)}\n` +
      `Heap Usage: ${readableFileSize(process.memoryUsage().heapUsed)}/${readableFileSize(process.memoryUsage().heapTotal)}`, {
        reply_to_message_id: msg.message_id
      })
    } else if (msg.from.username === 'zypeh') {
      bot.sendMessage(msg.chat.id, `诶主人真的可以吗？这里不是私聊哦。`, { reply_to_message_id: msg.message_id })
    } else { bot.sendMessage(msg.chat.id, `…… 这是禁止事项，你没有这个权限。`, { reply_to_message_id: msg.message_id }) }
  })
}
