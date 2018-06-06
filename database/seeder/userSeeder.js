const seedArray = [
  {
    first_name: 'Степа',
    last_name: 'Кузовов',
    email: 'xolms@bmb-design.ru',
    password: '657216as'
  }
]
module.exports = function(user) {
  user.findAll().then(function(users) {
    if(!users.length) {
      seedArray.map(function(item) {
        user.create(item).then(function() {
          console.log('Пользователь успешно создан')
        }).catch(function(err) {
          console.log(err)
        })
      })
    }
  })
}