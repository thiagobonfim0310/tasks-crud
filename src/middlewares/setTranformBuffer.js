export async function setTranformBuffer(req, res){
    const buffers = []

    // Esperando cada pedaço da stream e concatenando ela
    for await (const chunk of req){
        buffers.push(chunk)
    }

    try{
        // Trasnformando o Buffer da stream em JSON
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    }catch(_){
        req.body  = null
    }

    res.setHeader('Content-type', 'application/json')
}