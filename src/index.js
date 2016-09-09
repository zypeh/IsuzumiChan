'use strict'

import TelegramBot from 'node-telegram-bot-api'
import controllers from './controllers'
import { Token } from './configs'

// Setup polling way
const bot = new TelegramBot(Token, { polling: { timeout: 3, interval: 1000 } })

Object.keys(controllers).forEach((key) => {
  const func = controllers[key]
  if (typeof func == 'function')
    func(bot)
})
