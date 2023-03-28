import { parse } from "csv-parse"
import fs from "fs"

const csvPath = new URL("./tasks.csv", import.meta.url)

async function readCsv() {

    fs.createReadStream(csvPath)
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {
            fetch('http://localhost:8000/tasks', {
                method: 'POST',
                body: JSON.stringify( {
                    title: row[0],
                    description: row[1]
                })
            })
          })
          .on("error", function (error) {
            console.log(error.message);
          });
}

readCsv()