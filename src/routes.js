import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './util/buildRoutePath.js'

const database = new Database

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handle: (req, res) => {

            const tasks = database.select("tasks")

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handle: (req, res) => {

            const { title,
                description,
            } = req.body
            console.log(title, description)
            if (title === undefined  || description === undefined ) {
                return res.writeHead(404).end('Dados inseridos incorretamentes')
            }

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date(Date.now()).toISOString(),
                updated_at: new Date(Date.now()).toISOString()
            }

            database.insert('tasks', task)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handle: (req, res) => {

            const { id } = req.params

            const index = database.delete('tasks', id)

            if (index === -1) {
                return res.writeHead(404).end('Id não existente')
            }

            return res.writeHead(204).end('')
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handle: (req, res) => {
            console.log(req.body)
            const { id } = req.params
            const { title, description } = req.body

            const index = database.update('tasks', id, { title, description, updated_at: new Date(Date.now()).toISOString() })

            if (index === -1) {
                return res.writeHead(404).end('Id não existente')
            }

            return res.writeHead(204).end('')
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handle: (req, res) => {

            const { id } = req.params

            const index = database.update('tasks', id, { completed_at: new Date(Date.now()).toISOString() })

            if (index === -1) {
                return res.writeHead(404).end('Id não existente')
            }

            return res.writeHead(204).end('')
        }
    },
]