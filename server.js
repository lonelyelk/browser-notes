var express = require("express");
var server = express();
var fs = require("fs");
var notePath = __dirname + "/notes/note.txt";

server.set("view engine", "ejs");
server.set("view options", {layout: true, root: __dirname + "/views"});

server.use(express.static(__dirname + "/public"));
server.use(express.bodyParser());

server.get("/", function(req, res){
	res.render("index", {content: fs.readFileSync(notePath)});
});

server.post("/save", function(req, res){
	var obj = req.body.note;
	var noteFile = fs.openSync(notePath, 'w');
	var buf = new Buffer(obj.toString());
	fs.writeSync(noteFile, buf, 0, buf.length, 5);
	console.log(JSON.stringify(req.body));
	res.send("ok");
})

server.listen(4444);