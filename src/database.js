import fs from "node:fs/promises"

// traz a url de forma absoluta
const darabaseUrl = new URL("../database.json", import.meta.url)

export class Database {
    #database = {}
    constructor() {
        fs.readFile(darabaseUrl, 'utf-8')
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist()
            })
    }

    #persist() {
        fs.writeFile(darabaseUrl, JSON.stringify(this.#database))
    }

    select(table) {
        let data = this.#database[table] ?? []

        return data
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
            return rowIndex
        }

        return rowIndex
        
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1){
            const oldData = this.#database[table][rowIndex]
            this.#database[table][rowIndex] = {id, ...oldData, ...data}
            this.#persist()
            return rowIndex
        }

        return rowIndex
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()

        return data
    }
}