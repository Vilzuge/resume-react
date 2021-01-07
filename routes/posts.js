var express = require("express");
const { response } = require("../app");
var router = express.Router();
let posts = require("./db.json");
var fs = require('fs');

console.log(posts.length)
const generateId = () => {
    const maxId = posts.length > 0 ? posts.map(n => n.id).sort().reverse()[0] : 1
    return maxId + 1
}


router.get("/", function(req, res, next) {
    res.send(posts);
});

router.post("/",(request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const post = {
        id: generateId(),
        user: body.user,
        content: body.content,
        date: body.date
    }
    posts = posts.concat(post)
    console.log(posts)

    var filePosts = JSON.stringify(posts)
    console.log(filePosts)

    fs.writeFile ("./routes/db.json", JSON.stringify(posts), function(err) {
        if (err) throw err;
        console.log('complete');
        }
    );

    response.json(post)
  });



module.exports = router;