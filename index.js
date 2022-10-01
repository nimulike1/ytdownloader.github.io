const express = require("express");
const app = express();
const ytdl = require("ytdl-core");
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
  });

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	return res.render("index");
});

app.get("/download", async(req, res) => {
	const v_id = req.query.url.split('v=')[1];
    const info = await ytdl.getInfo(req.query.url);
    console.log(info.formats[4]);
    console.log(info.formats[1]);

	return res.render("download", {
		url: "https://www.youtube.com/embed/" + v_id,
        info: info.formats.sort((a, b) => {
            return a.mimeType < b.mimeType;
        }),
	});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});