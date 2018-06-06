const seedArray = [
	{
		name: 'Администратор',
		name_eng: 'admin',
	},
	{
		name: 'Сотрудник',
		name_eng: 'working'
	}
]
module.exports = function(database) {
	database.role.findAll().then(function(role) {
		if(!role.length) {
			seedArray.map(function(item) {
				database.role.create(item).then(function() {
					console.log('Роль успешно создана')
				}).catch(function(err) {
					console.log(err)
				})
			})
		}
	})
}