const db = require('../../config/database')
module.exports = {
	works: db.works,
	section: db.usluga,
	images: db.worksImages,
	user: db.user
}