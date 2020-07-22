const Agenda = require("agenda")

const connectionOptions = { db: { address: process.env.MONGODB_URL, colection: 'agendaJobs' } }

const agenda = new Agenda(connectionOptions)

const jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : []

jobTypes.forEach(type => {
  require('./definitions/' + type)(agenda)
})

if (jobTypes.length) {
  agenda.start()
}

const graceful = () => {
  agenda.stop(() => process.exit(0))
}

process.on('STIGTERM', graceful)
process.on('SIGINT', graceful)

module.exports = agenda