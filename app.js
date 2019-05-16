const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static(path.join(__dirname, 'public')))

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.render("index");
})
app.get('/attractions',(req,res) => {
    res.render("attractions");
})
app.get("/blog",(req,res)=>{
    fs.readFile("public/json_file/comments.json", 'utf-8', function (err, data) {
        if (err) {
          throw err;
        }
        console.log(data);
        const json_obj = JSON.parse(data);
        console.log(json_obj.blogs.length);
        //console.log(json_obj.blogs[1].comment);
        /*let l = json_obj.blogs.length;
        for(let i = 0;i<l;i++){

        }*/
        res.render("blog",{data:json_obj});
    });
    //res.render("blog");
})
app.post("/blog",(req,res)=>{
    fs.readFile("public/json_file/comments.json", 'utf-8', function (err, data) {
        if (err) {
          throw err;
        }
        console.log(data);
        const jsonParsed = JSON.parse(data);
        jsonParsed.blogs = [...jsonParsed.blogs,req.body];
        const comment_string =JSON.stringify(jsonParsed);
        fs.writeFile("public/json_file/comments.json",comment_string, function(err) {
        if (err) {console.log(err);}
        });
            
        console.log(req.body);
        console.log(comment_string);
    });
    res.redirect("/blog");
})
console.log("Listening to port 5000");
app.listen(5000);