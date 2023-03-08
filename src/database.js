import fs from "node:fs/promises"

// traz a url de forma absoluta
const darabaseUrl =  new URL("../database.json", import.meta.url)

export class Database {
    #database = {}
    constructor(){
        fs.readFile(darabaseUrl, 'utf-8')
            .then(data=>{
                this.#database = JSON.parse(data)
            })
            .catch(()=>{
                this.#persist()
            })
    }

    #persist(){
        fs.writeFile(darabaseUrl, JSON.stringify(this.#database))
    }
}