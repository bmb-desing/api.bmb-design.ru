const seedArray = [
  {
    first_name: 'Степа',
    last_name: 'Кузовов',
    email: 'xolms@bmb-design.ru',
    password: '657216as'
  }
]
module.exports = function(database) {
  database.user.findAll().then(function(users) {
    if(!users.length) {
      seedArray.map(function(item) {
        database.user.create({
          first_name: item.first_name,
          last_name: item.last_name,
          email: item.email,
          password: item.password,
        }).then(function(item) {
          item.addRoles(2).then(function (roles) {
					})
          console.log('Пользователь успешно создан')
        }).catch(function(err) {
          console.log(err)
        })
      })
    }
  })
}