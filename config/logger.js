const morgan = require('morgan');
const fs = require('fs');
const moment = require('moment-timezone');
const rfs = require('rotating-file-stream');



//Создание файла
fs.existsSync('system/logs') || fs.mkdirSync('system/logs');
const file =  rfs('logger.log', {
  interval: '1d',
  path: 'system/logs'
}, {flags: 'a'})


morgan.token('date', (req, res, tz) => {
  const time = moment().tz(tz).format();
  return time 
})
morgan.token('newline', (req, res) => {
  return '\r\n'
})
morgan.token('user', (req, res) => {
  if(req.user && req.user.id) {
    return '- user: ' + req.user.id
  }
  else {
    return ''
  }
})
morgan.token('errors',  (req, res) => {
  if(res.statusCode == 500) {
    return req.error
  }
  else {
    return ''
  }
})
morgan.format('bmb', '[:date[Europe/Moscow]] ":method :url" :status :res[content-length] :errors :user - :response-time ms  :newline' )


const logger = morgan('bmb', {stream: file})


module.exports = logger
