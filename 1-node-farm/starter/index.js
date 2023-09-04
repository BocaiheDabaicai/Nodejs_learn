const fs = require('fs')
const http = require('http')
const url = require('url')

const slugify = require('slugify')
const replaceTemplate = require('./modules/replaceTemplate.js')
/* 初始使用
const hello = 'Hello World'
console.log(hello)
*/

/* 同步读写文件

const textInput = fs.readFileSync('./txt/input.txt','utf-8')
console.log(textInput);

const textOut = `This is what we know about the avocado: ${textInput}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt',textOut);

console.log(`File written!`);
*/

/* 异步读写文件
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log('ERROR')
    console.log(data1)
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2)
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3)

            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err, data4) => {
                console.log(`Your file has been written 😀`)
            })
        })
    })
})
console.log('Will read file!')
*/


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-Product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

let slugs = dataObj.map(element => slugify(element.productName,{lower:true}))
console.log(slugs)


const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true)

    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(element => replaceTemplate(tempCard, element))
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
        // console.log(cardsHtml)

        res.end(output)

    } else if (pathname === '/product') {
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct,product)


        res.end(output)

    } else if (pathname === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data)

    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        })
        res.end('<h1>Page not found</h1>')
    }
})

server.listen(8001, '127.0.0.1', () => {
    console.log('Listening to requests on port 8001')
})




