const ul_tag = document.getElementById("vertical");
console.log(ul_tag);
const list_tag = ul_tag.getElementsByClassName("list");
let l = list_tag.length;

for(let i = 0; i < l; i++){
    let file_name = list_tag[i].attributes.attr.value;
    console.log(file_name);
    list_tag[i].addEventListener("click", (event) => {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/blogs?file='+file_name, true);

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.response);
            let json = JSON.parse(xhr.response);
            let hiddden_input = document.getElementById("file");
            hiddden_input.value =file_name;
            let head_tag = document.getElementById("heading");
            head_tag.innerHTML = json.blogpage[0].heading;
            let para_tag1=document.getElementById("para_blog1");
            para_tag1.innerHTML=json.blogpage[0].para1;
            let para_tag2=document.getElementById("para_blog2");
            para_tag2.innerHTML=json.blogpage[0].para2;
            let para_tag3=document.getElementById("para_blog3");
            para_tag3.innerHTML=json.blogpage[0].para3;
            let l = json.comments.length;
            let div_comm = document.getElementById("comm_div");
            div_comm.innerHTML="";
            
            for(let i=0;i<l;i++){
               div_comm.innerHTML+="<p class='owner'>"+json.comments[i].comment + "</p>";
               div_comm.innerHTML+="<div class='commt'><p class='commt'>"+json.comments[i].name + "</p></div>"

            } 
        }
    }

    xhr.send(null);
    })
}
let file_name = list_tag[0].attributes.attr.value;

let xhr = new XMLHttpRequest();
xhr.open('GET', '/blogs?file='+file_name, true);

xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.response);
        let json = JSON.parse(xhr.response);
        let hiddden_input = document.getElementById("file");
        hiddden_input.value =file_name;
        let head_tag = document.getElementById("heading");
        head_tag.innerHTML = json.blogpage[0].heading;
        let para_tag1=document.getElementById("para_blog1");
        para_tag1.innerHTML=json.blogpage[0].para1;
        let para_tag2=document.getElementById("para_blog2");
        para_tag2.innerHTML=json.blogpage[0].para2;
        let para_tag3=document.getElementById("para_blog3");
        para_tag3.innerHTML=json.blogpage[0].para3;
        let l = json.comments.length;
        let div_comm = document.getElementById("comm_div");
        div_comm.innerHTML="";
        
        for(let i=0;i<l;i++){
            div_comm.innerHTML+="<p class='owner'>"+json.comments[i].comment + "</p>";
            div_comm.innerHTML+="<div class='commt'><p class='commt'>"+json.comments[i].name + "</p></div>"

        } 
    }
}

xhr.send(null);