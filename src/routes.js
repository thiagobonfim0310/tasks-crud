

export const routes =  [
    {
        method: 'GET',
        path: '/tasks',
        handle: (req, res) =>{

        }
    },
    {
        method: 'POST',
        path: '/path',
        handle: (req, res) => {


            return res.writeHead(201).end()
        }
    }
]