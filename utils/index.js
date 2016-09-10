'use strict'

export const readableFileSize = (fileSizeInBytes) => {
    let i = -1
    const byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB']
    do {
        fileSizeInBytes = fileSizeInBytes / 1024
        i++
    } while (fileSizeInBytes > 1024)

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i]
}

export const isForwarded = (msg) => {
  if ('forward_from' in msg)
    return true
  else
    return false
}

export const isOwner = (msg) => {
  if (msg.from.id === 1510676)
    return true
  else
    return false
}

export const isPrivate = (msg) => {
  if (msg.chat.type === 'private')
    return true
  else
    return false
}
