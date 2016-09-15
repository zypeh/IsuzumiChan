'use strict'

import mongoose from 'mongoose'
import {
  isForwarded,
  isOwner,
  isPrivate } from '../utils'

const ObjectId = mongoose.Schema.Types.ObjectId

const MessageSchema = new mongoose.Schema({
  entities: { type: Object, default: undefined },
  msg_content: { type: Array, default: undefined }, // text index, text
  date: { type: Number },
  chat: {
    type: { type: String },
    title: { type: String, default: undefined }, // for group
    username: { type: String, default: undefined }, // for username, if private
    id: { type: Number },
  },
  sticker: { type: Object, default: undefined },
  from : {
    username: { type: String },
    id: { type: Number },
  },
  message_id: { type: Number }
})

MessageSchema.index({ msg_content: 1 })

const Message = mongoose.model('Message', MessageSchema)

export default (bot) => {
    bot.on('message', (msg) => {
      try {
        let optx = { chat: {}, from: {} }

        do {
          optx.date = msg.date
          optx.from.username = msg.from.username
          optx.from.id = msg.from.id
          optx.message_id = msg.message_id

          if ('entities' in msg)
            optx.entities = msg.entities

          if ('sticker' in msg) {
            optx.sticker = msg.sticker
            break
          }

          optx.msg_content = [...msg.text]
          optx.chat.type = msg.chat.type
          optx.chat.id = msg.chat.id

        if (msg.chat.type !== 'private')
          optx.chat.title = msg.chat.title
        else if (msg.chat.type === 'private')
          optx.chat.username = msg.chat.username

      } while (false)
        const new_msg = new Message(optx)
        new_msg.save()
      } catch (err) { console.log(err) }
    })

    bot.onText(/^\/search (.+)$/, (msg, match) => {
      if (isForwarded(msg)) { return }
      if (!isOwner(msg)) { return }

      try {
        const query = [...match[1]]
        console.log(query)
        Message.find({ msg_content: {$all: query }})
          .where({ entities: { $exists: false } }) // ignore commands
          .limit(10)
          .exec((err, results) => {

            console.log(results)
            if (err) {
              bot.sendMessage(msg.chat.id, `擦！我昏了\n报错讯息: \`@{err}\``, {
                parse_mode: 'markdown'
              })
              console.log(err)
              return
            }
            if (!(results.length > 0)) {
              bot.sendMessage(msg.chat.id, `没有找到结果啊亲～ `)
              return
            }
            results.forEach((result) => bot.forwardMessage(msg.chat.id, result.chat.id, result.message_id))
          })
        return
      } catch (err) { console.log(err) }

    })
}
