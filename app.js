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
/*app.get("/blog",(req,res)=>{
    fs.readFile("public/json_file/comments.json", 'utf-8', function (err, data) {
        if (err) {
          throw err;
        }
        console.log(data);
        const json_obj = JSON.parse(data);
        console.log(json_obj.comments.length);
        res.render("blog",{data:json_obj});
    });
})*/
app.get("/blog",(req,res)=>{
    fs.readFile("public/json_file/lists.json",'utf-8', function (err, data){
        if (err) {
            throw err;
          }
          const json_obj = JSON.parse(data);
          res.render("blogslist",{data:json_obj});
    })
});
app.post("/blog",(req,res)=>{
    console.log(req.body.file);
    let file_name = req.body.file;
    console.log(file_name);
    fs.readFile("public/json_file/" + file_name, 'utf-8', function (err, data) {
        if (err) {
          throw err;
        }
        console.log(data);
        const jsonParsed = JSON.parse(data);
        jsonParsed.comments = [...jsonParsed.comments,req.body];
        const comment_string =JSON.stringify(jsonParsed);
        fs.writeFile("public/json_file/" + file_name,comment_string, function(err) {
        if (err) {console.log(err);}
        });
            
        console.log(req.body);
        console.log(comment_string);
    });
    res.redirect("/blog");
})
console.log("Listening to port 5000");
app.listen(5000);