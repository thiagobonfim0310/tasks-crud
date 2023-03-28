import http from 'node:http'
import { Database } from './database.js'
import { setTranformBuffer } from './middlewares/setTranformBuffer.js'
import { routes } from './routes.js'
import { extractQueryParams } from './util/extract-query-params.js'

const database = new Database()

const server = http.createServer(async (req, res) => {

    const { method, url } = req

    await setTranformBuffer(req, res)

    const route = routes.find(route => {

        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)

        const { query, ...params } = routeParams.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handle(req, res)
    }

    return res.end
})

server.listen(8000)