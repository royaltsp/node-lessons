//http module to create server
const http = require("http");
const PORT = 8000 || process.env.PORT;

//create server and catch into server variable
const server = http.createServer(function (req, res) {
  const url = req.url; // url on which user sending request
  const method = req.method; // method GET or POST

  //send response as per url
  if (url == "/") {
    res.write("<h1>Hello User</h1>");
    res.end();
  } else if (url == "/user") {
    res.write("<html>");
    res.write("<body>");
    res.write('<form method="POST" action="/create-user">');
    res.write('<input type="text" name="username">');
    res.write('<button type="submit">Create</button>');
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else if (url == "/create-user" && method == "POST") {
    const body = [];
    req.on("data", function (chunk) {
      body.push(chunk); // data sent using form is found in this callback in chunk variable
    });
    req.on("end", function () {
      //Buffer class handles raw binary data
      const parseBody = Buffer.concat(body).toString();
      const username = parseBody.split("=")[1];
      res.write(`<h1>Hello ${username}</h1>`);
      res.end();
    });
  } else {
    res.write("<h1>404 Error</h1>");
    res.end();
  }
});

//listen for requests on port 8000
server.listen(PORT, function () {
  console.log("Server is listening");
});
