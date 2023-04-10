const http=require('http')

const port = 4300;
const server = http.createServer((req, res) => {

  res.end('Hello !! How Are You??');
});
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
