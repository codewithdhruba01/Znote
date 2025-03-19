const content = document.querySelector(".content");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

createBtn.addEventListener("click", ()=>{
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = ".input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "Accets/delete.png";
    content.appendChild(inputBox).appendChild(img);
})