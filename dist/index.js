
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-cursor-chat.cjs.production.min.js')
} else {
  module.exports = require('./react-cursor-chat.cjs.development.js')
}
