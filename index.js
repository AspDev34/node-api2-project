const server = require('./api/server.js');

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`\n === the server is running on http://localhost:${PORT}`)
});

console.log('w')