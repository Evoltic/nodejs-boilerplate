const express = require('express')
const bodyParser = require('body-parser')
const { port, mongodbUri } = requireInServer('/config')
const Database = requireInServer('/db')
const apiConfig = requireInServer('/config/api')
const { eventHeader } = requireInServer('/config')

class App {
  constructor() {
    this.port = port || 3000
  }

  async initAPI(app) {
    apiConfig.map(item => {
      const handlerFile = requireInServer(item.pathToHandler)
      const handler = handlerFile[item.handler]

      const pathParameter = item.pathParameters ? `:${item.pathParameters}` : ''
      const path = item.path + '/' + pathParameter

      app[item.method](path, async (req, res) => {
        let event = { ...req }

        event.pathParameters = {}
        event[eventHeader] = req.headers
        event.body = req.body

        const pathParameters = item.pathParameters
        if (pathParameters) {
          event.pathParameters[pathParameters] = req.params[pathParameters]
        }

        const response = await handler(event)

        res.setHeader('Content-Type', 'text/plain')
        res.statusCode = response.statusCode || 500
        res.end(JSON.stringify(response.body || ''))
      })
    })
  }

  async start() {
    const app = express()
    const db = new Database(mongodbUri)

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    await db.connect()

    await this.initAPI(app)

    app.listen(this.port, () => {
      console.log(`Server running at port: ${this.port}`)
    })
  }
}

module.exports = App
