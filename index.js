const app = require('./app.js')
const http = require('http')
const logger = require('./utils/logger')
const port = 3000

const server = http.createServer(app)

server.listen(port, () => {
    logger.info(`Server running on port ${port}`)
})