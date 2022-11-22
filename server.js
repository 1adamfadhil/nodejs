 const http = require('http');

const todos = [
    {id: 1, text: 'Todo One'},
    {id: 2, text: 'Todo Two'},
    {id: 1, text: 'Todo Three'},
];

const server = http.createServer((req, res) => {
    // listening data from client
    const {method, url} = req;
    let body = [];

    req
    .on('data', chunk => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        let status = 404;
        const response = {
            succes: false,
            result: [],
            eror: 'please add id and text'
    };
        
    if (method === 'GET' && url === '/todos') {
        status = 200;
        response.succes = true;
        response.result = todos;

    } else if (method === 'POST' && url === '/todos') {

        const { id, text } = JSON.parse(body);

        if (!id || !text) {
            status = 400;
            response.eror = 'Please add id and text';    
        } else {
            todos.push({id, text});
            status = 201;
            response.succes = true;
            response.result = todos;
        }
    }

    res.writeHead(status, {
        'Content-Type' : 'application/json',
        'X-Powered-By' : 'Node.js'
    });

    res.end(JSON.stringify(response));
});

});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));