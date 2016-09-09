'use strict'

import requireDir from 'require-dir'

const dir = requireDir('../controllers')
const controllers = {}

Object.keys(dir).forEach((key) => {
  const val = Object.keys(dir[key])
  controllers[key] = dir[key][val]
})

export default controllers
