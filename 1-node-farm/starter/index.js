const fs = require("fs");
const http = require("http");
const url = require("url");

////////////////////
///FILES
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//   });
// });
// console.log("this is first");

///////////////////////
//SERVER
const Server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW!");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT!");
  } else {
    res.writeHead(404);
    res.end("Page not found");
  }
  //res.end("Hello from the server");
});

Server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
