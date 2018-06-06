const info = require('systeminformation');

module.exports = {
  getAllSystem: function(req, res, next) {
    getFs(function(error, data) {
      if(error) {
        res.status(500)
        res.json(error)
      }
      else {
        res.json(data)
      }
    })
  }
}

function getFs(callback) {
  info.getDynamicData().then(function(data) {
    callback(null, data)
  }).catch(function(err) {
    callback(err, null)
  })
}