////Ex 0
//console.log("HELLO WORLD")

//Ex 1
/*var result = 0
for (var i = 2; i < process.argv.length; i++)
	result += Number(process.argv[i])
console.log(result)*/


//Ex 2
/*
var fs = require('fs');
var filename = process.argv[2];
file = fs.readFileSync(filename);
contents = file.toString();
console.log(contents.split('\n').length - 1);
*/

//Ex 3
/*
var fs = require('fs');

fs.readFile(process.argv[2], 'utf8', function (err, data) {
  if (err) throw err;
  console.log(data.split('\n').length - 1);
});
*/

//Ex 4
/*
var fs = require('fs');
var path = require('path');

fs.readdir(process.argv[2], function (err, list) {
  list.forEach(function (filename) {
    if (path.extname(filename) === '.' + process.argv[3]) {
      console.log(filename);
    }
  });
});*/

//Ex 5
/*
var customModule = require('./program-module.js');

customModule(process.argv[2], process.argv[3], function(err, list) {
    if (err) return console.error(err);
    list.forEach(function (file) {
        console.log(file);
    });
});*/

//Ex 6
/*
var http = require('http');

http.get(process.argv[2], function(result) {
    result.setEncoding('utf8');
    result.on('error', function (err) {
        console.error(err);
    });
    result.on('data', function (chunk) {
        console.log(chunk);
    });
});*/

//Ex 7
/*
var http = require('http');

http.get(process.argv[2], function(result) {
    var data = '';
    result.setEncoding('utf8');
    result.on('error', function (err) {
        console.error(err);
    });
    result.on('data', function (chunk) {
        data += chunk;
    });
    result.on('end', function () {
        console.log(data.length);
        console.log(data);
    });
});*/

//Ex 8
/*
var http = require('http');

var urls = process.argv.slice(2);
var results = [];

// initialise results array
for (i = 0; i < urls.length; i++) {
  results[i] = null;
}

for (i = 0; i < urls.length; i++) {
  (function(i) {
    http.get(urls[i], function(request) {
      var result = "";
      request.setEncoding("utf8");
      request.on("data", function(data) {
        result += data;
      });
      request.on("end", function() {
        results[i] = result;
        var resultCount = 0;
        for (j = 0; j < results.length; j++) {
          if (results[j] != null) resultCount++;
        }
        if (resultCount == results.length) {
          for (j = 0; j < results.length; j++) {
            console.log(results[j]);
          }
        }
      });
    });
  })(i);
}
*/

//Ex 9
/*
var net = require('net');

function zeroPadding(nb) {
    return (nb < 10) ? ('0' + nb) : (nb);
}

function formatDate(date) {
    return date.getFullYear()
        +'-'+zeroPadding((date.getMonth() + 1))
        +'-'+zeroPadding(date.getDate())
        +' '+zeroPadding(date.getHours())
        +':'+zeroPadding(date.getMinutes());
}

var server = net.createServer(function(socket) {
    var date = new Date();
    socket.end(formatDate(date) + '\n');
});

server.listen(Number(process.argv[2]));*/

//Ex 10
/*
var http = require('http');
var fs = require('fs');

var fileToRead = process.argv[3];
var port = Number(process.argv[2]);

var server = http.createServer(function (req, res) {
    // Being a good citizen
    res.writeHead(200, {'content-type': 'text/plain'})

    var fsStream = fs.createReadStream(fileToRead);
    fsStream.pipe(res);
});

server.listen(port);*/

//Ex 11
/*
const http = require('http');

var server = http.createServer(function(req, res) {
    //if(req.method != "POST") resp.end('I respond to POST only');

    var body = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){
        body+=chunk;
    })

    req.on('end', function(){
        res.end(body.toUpperCase());
    })

});
server.listen(process.argv[2]);
*/

//Ex 12
var http = require('http');
var url = require('url');

var port = Number(process.argv[2]);

function formatTime(date) {
    return {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
    };
}

function fomatUnix(date) {
    return {
        unixtime: date.getTime()
    };
}

function processRequest(urlPath, date) {
    var result = {};
    if (urlPath === "/api/parsetime") {
        result = formatTime(date);
    } else if (urlPath === "/api/unixtime") {
        result = fomatUnix(date);
    }
    return result;
}

var server = http.createServer(function (req, res) {
    if (req.method != 'GET') return res.end('Not a GET request.\n');

    var urlInfos = url.parse(req.url, true);
    var date = new Date(urlInfos.query.iso);
    var data = processRequest(urlInfos.pathname, date);

    if (data) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(port);