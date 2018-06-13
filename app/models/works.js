const db = require('../../config/database')
module.exports = {
	works: db.works,
	usluga: db.usluga,
	images: db.worksImages,
	user: db.user
}