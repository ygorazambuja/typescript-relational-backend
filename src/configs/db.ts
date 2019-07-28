import config from '../../knexfile'
const knexInstance = require('knex')(config)

knexInstance.migrate.latest([config])

export default knexInstance
