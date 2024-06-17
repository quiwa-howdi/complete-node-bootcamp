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
const replaceTemplate = (temp, product) => {
  //注意這邊，.replace 使用字串只會替換第一個，但使用正規表示法/g可以替換全部
  //宣告let是因為下面output可以多次判斷改變
  let output = temp
    .replace(/{%PRODUCTNAME%}/g, product.productName)
    .replace(/{%IMAGE%}/g, product.image)
    .replace(/{%PRICE%}/g, product.price)
    .replace(/{%FROM%}/g, product.from)
    .replace(/{%NUTRIENTS%}/g, product.nuerients)
    .replace(/{%QUANTITY%}/g, product.quantity)
    .replace(/{%DESCRIPTION%}/g, product.description)
    .replace(/{%ID%}/g, product.id);
  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }

  return output;
};

//在一開始只載入一次 不要每次都執行
//因為一開始就call 所以用Sync沒有關係
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const Server = http.createServer((req, res) => {
  const pathName = req.url;

  //Overview page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join(""); //into string
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml);
    res.end(output);
  }
  //Product page
  else if (pathName === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end("This is the PRODUCT!");
  }
  //API page
  else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  }
  //Not found
  else {
    res.writeHead(404);
    res.end("Page not found");
  }
  //res.end("Hello from the server");
});

Server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
