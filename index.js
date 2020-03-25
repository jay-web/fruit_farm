const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceHtml = require("./modules/replaceHtml");

// Block I/O, i.e Syncronously read and write file .

        // const textFromFile = fs.readFileSync("./node-farm/txt/input.txt", "utf-8");

        // console.log(textFromFile);

        // fs.writeFileSync("./node-farm/txt/input.txt", `This is inserted ${textFromFile}`);


// Non-Block I/O, i.e Asyncronously read and write file.

//     fs.readFile("./node-farm/txt/read-this.txt", "utf-8", (err, data) => {
//         if(err){
//             console.log(`Error from first read ${err}`);
//         }else{
//             fs.writeFile("./node-farm/txt/input.txt", `Update data is ${data}`, "utf-8", (err, data) => {
//                 if(err){
//                     console.log("Error from write " + err);
//                 }else{
//                     fs.readFile("./node-farm/txt/input.txt", "utf-8", (err, data) => {
//                         if(err){
//                             console.log("Error from final read  " + err);
//                         }else{
//                             console.log(`Data from the file is : \n${data}` );
//                         }
//                     })
//                 }
//             })
//         }
//     });

// console.log("This should be run first");

// Here we are using sync code, because it will run only once at the server start up
const data = fs.readFileSync(`${__dirname}/node-farm/dev-data/data.json`, "utf-8");  // this will read the data once
const dataObj = JSON.parse(data);
const tempOverview = fs.readFileSync(`${__dirname}/node-farm/templates/overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/node-farm/templates/cards.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/node-farm/templates/product.html`, "utf-8");




// Creating Server 
const server = http.createServer((req, res) => {
    let queryObj = url.parse(req.url, true);
    const queryID = queryObj.query.id;
    const pathname = url.parse(req.url, true).pathname;


    // ? This is for root(/) and overview page
    
    if(pathname === "/" || pathname === "/overview"){
        res.writeHead(200, { "Content-Type": "text/html"});
        // * passed data into template
        // ! Here map function has used to create array of individual element of html
        // ! then convert that into single string of html so we can pass that to web page

        const cardHtml = dataObj.map(el => replaceHtml(tempCard, el)).join('');
        const overviewOutput = tempOverview.replace(/%PRODUCT_CARD%/g, cardHtml);
        res.end(overviewOutput);

    // ? This is for api page   
    }else if(pathname === "/api"){
        res.writeHead(200, { "Context-Type": "application/json"});
        res.end(data);

    // ? This is for product page
    }else if(pathname === "/product"){    
        res.writeHead(200, {"Content-Type": "text/html"});
        const product = dataObj[queryID];
        const productOutput = replaceHtml(tempProduct, product);
        res.end(productOutput);
    // ? This is for not found page    
    }else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("<h1> 404 Page not found </h1>");
    }
   

});

// Listening Server on port 8000
server.listen(8000, "127.0.0.1", () => {
    console.log("Listening sound on port 8000");
});
