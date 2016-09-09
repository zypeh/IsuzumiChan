'use strict'

export default (bot) => {
  bot.onText(/ping/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '*pong*', { parse_mode: 'markdown', reply_to_message_id: msg.message_id });
  })
}
