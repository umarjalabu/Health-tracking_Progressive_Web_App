(function (){
    var fs, https ,mimetypes , options, path, server;
    fs = require("fs"); //file system
    https = require("https"); // create https server
    path = require("path"); // for url paths
    mimetypes = {
        "css":"text/css",
        "html":"text/html",
        "jpg":"image/jpeg",
        "png":"image/png",
        "js":"text/javascript",
    };

    options = {
        pfx: fs.readFileSync("ssl/securable.pfx"),
        passphrase:"Passw0rd"
    }

    server = https.createServer(options, function (req, res) {
        if(req.url === "" || req.url === "/"){
            req.url = "/index.html";
        }
        fs.readFile(__dirname + "/" + req.url, function(error, content){
            if (error){
                console.log("Error: " + error);
            }else {
                res.writeHead(200, {"Content-Type":mimetypes[path.extname(req.url).split(".")[1]]});
                res.write(content);

            }
            res.end();
        });
    });

    server.listen("5050", "143.167.210.231", function () {
        console.log("Server started!");
        
    });
})();