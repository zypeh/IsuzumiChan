'use strict'

import TelegramBot from 'node-telegram-bot-api'
import controllers from './controllers'

const token = '197973471:AAE-8hOhycXdD3StG2G07nVx9QHWgrmIXs8'
// Setup polling way
const bot = new TelegramBot(token, { polling: { timeout: 3, interval: 1000 } })

Object.keys(controllers).forEach((key) => {
  const func = controllers[key]
  if (typeof func == 'function')
    func(bot)
})
