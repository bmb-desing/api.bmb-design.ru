module.exports = {
  isAdmin: function(req, res, next) {
    const role = 'admin'
    hasRole(role, req.user, function(err, role) {
      if(err) {
        res.status(403)
        res.json(err)
      }
      else {
        next()
      }
    })
  }
}

function hasRole(role, user, callback) {
  const hasRole = user.roles.findIndex(item => item.name_eng == role)
  if(hasRole != -1) {
    return callback(null, true)
  }
  else {
    return callback('У вас нету прав для просмотра этой страницы', null)
  }
  
}