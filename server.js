var express = require("express");
var server = express();
var fs = require("fs");
var notePath = __dirname + "/notes/note.txt";
var noteDir = __dirname + "/notes";

function checkNoteFile() {
	if (!fs.existsSync(notePath)) {
		if (!fs.existsSync(noteDir)) {
			fs.mkdirSync(noteDir);
		}
		fs.openSync(notePath, "w");
	}
}

server.set("view engine", "ejs");
server.set("view options", {layout: true, root: __dirname + "/views"});

server.use(express.static(__dirname + "/public"));
server.use(express.bodyParser());

server.get("/", function(req, res){
	checkNoteFile();
	res.render("index", {content: fs.readFileSync(notePath)});
});

server.post("/save", function(req, res){
	checkNoteFile();
	var obj = req.body.note;
	var noteFile = fs.openSync(notePath, 'w');
	var buf = new Buffer(obj.toString());
	fs.writeSync(noteFile, buf, 0, buf.length);
	console.log(JSON.stringify(req.body));
	res.send("ok");
})

server.listen(4444);