import http from 'node:http'
import { Database } from './database.js'

const database  = new Database()

const server = http.createServer(async(req, res)=>{

    const {method, url} = req
    await setTranformBuffer(req, res)



    return res.end
})

server.listen(8000)