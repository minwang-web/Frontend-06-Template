const http = require('http');

http.createServer((request,response) =>{
    let body = [];
    request.on('error',(err)=>{
        console.error(err);        
    }).on('data', (chunk)=>{
        body.push(chunk.toString());
    }).on('end',()=>{
        // body = Buffer.concat(body).toString();
        body = Buffer.concat([Buffer.form(body.toString())]).toString();
        console.log("body:",body);
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end(
            `<html maaa = a>
            <head>
                <style>
                body div #myid{
                    width:100px;
                    bacground-color: #ff5000;
                }
                body div img{
                    width:30px;
                    bacground-color: rgb(255,255,255);
                }

                #container{
                    width: 500px;
                    height: 300px;
                    display: flex;
                    bacground-color: rgb(255,0,0);
                }

                #container #myid{
                    width: 200px;
                    height: 100px;
                    bacground-color:rgb(255,0,0);
                }

                #container .c1{
                    flex: 1;
                    bacground-color:rgb(0,255,0);
                }
                </style>
            </head>
            <body>
                <div id="container">
                    <div id="myid"></div>
                    <div class="c1"></div>
                <div>
            </body>
            </html>
            ` );
    });
}).listen(8088);

console.log("server started");