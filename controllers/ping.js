'use strict'

import {
  readableFileSize,
  isForwarded,
  isOwner,
  isPrivate } from '../utils'

// uptime and memory usage
const geekyStat = () => {
  return `Running archicture: ${process.arch}\n` +
        `CPU ticks: ${process.cpuUsage().system}\n` +
        `Resident Set Size: ${readableFileSize(process.memoryUsage().rss)}\n` +
        `Heap Usage: ${readableFileSize(process.memoryUsage().heapUsed)}/${readableFileSize(process.memoryUsage().heapTotal)}`
}

export default (bot) => {

  bot.onText(/^ping/, (msg) => {
    if (isForwarded(msg)) { return }

    let reply_msg = ''

    if (isOwner(msg))
      reply_msg = "*pong* 啦 (认真脸"
    else
      reply_msg = "*pong* (无力www"

    bot.sendMessage(msg.chat.id, reply_msg, {
        parse_mode: 'markdown',
        reply_to_message_id: msg.message_id
    })
  })

  bot.onText(/^geekping/, (msg) => {

    const cmdId = msg.message_id

    if (isForwarded(msg))
      if (!isOwner(msg))
        bot.sendMessage(msg.chat.id, `@${msg.from.username} 假冒主人的令牌是不明智的选择 ._.🏻`)
      else { }

    if (!isOwner(msg)) bot.sendMessage(msg.chat.id, `这是禁止事项， 你没有这个权限 🈲️ `, {
      reply_to_message_id: msg.message_id
    })

    if (isPrivate(msg) && isOwner(msg)) bot.sendMessage(msg.chat.id, geekyStat(), {
      reply_to_message_id: msg.message_id
    })

    bot.sendMessage(msg.chat.id, `诶，这里不是私聊，这样可以吗?`, {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: '可以', callback_data: 'geekping_Y' }],
          [{ text: '不可以', callback_data: 'geekping_N' }]
        ]
      })
    }).then(sended => {})

    // make a spammer list
    let spammer = []

    bot.on('callback_query', (msg) => {
      switch (msg.data) {
        case 'geekping_Y':
          if (spammer.includes(msg.from.id)) {
            bot.answerCallbackQuery(msg.id, '你再 spam 我就打你了哦 ❤️')
            break
          }
          if (!isOwner(msg)) {
            bot.sendMessage(msg.message.chat.id, `@${msg.from.username} 不是在问你啦 😑`)
            spammer.push(msg.from.id) // ignore those who spam
          } else
            bot.editMessageText(geekyStat(), { chat_id: msg.message.chat.id, message_id: msg.message.message_id })
          break

        case 'geekping_N':
          if (spammer.includes(msg.from.id)) { break }
          if (!isOwner(msg) && !(msg.from.id in spammer)) {
            bot.sendMessage(msg.message.chat.id, `@${msg.from.username} 不是在问你啦 😑`)
            spammer.push(msg.from.id) // ignore those who spam
          } else
            bot.sendMessage(msg.message.chat.id, '好的', { reply_to_message_id: cmdId })
          break
      }
      bot.answerCallbackQuery(msg.id, '')
    })
  })

}
