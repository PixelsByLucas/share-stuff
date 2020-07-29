const { exec } = require('child_process')
const { MONGODB_URL } = process.env

exec(`npx agendash --db=${MONGODB_URL} --collection=agendaJobs --port=3002`)
console.log('Agendash running on port 3002')