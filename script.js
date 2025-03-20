const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
const toggleModeBtn = document.querySelector(".toggle-mode");

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    document.body.classList.add(savedTheme);
    toggleModeBtn.innerText = savedTheme === "dark-mode" ? "☀️" : "🌙";
}

toggleModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const currentTheme = document.body.classList.contains("dark-mode") ? "dark-mode" : "";
    localStorage.setItem("theme", currentTheme);
    toggleModeBtn.innerText = currentTheme === "dark-mode" ? "☀️" : "🌙";
});

//saved notes from localStorage
window.addEventListener("load", () => {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
    addDeleteEvent();
    addInputEvent();
});

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "Accets/delete.png";
    
    notesContainer.appendChild(inputBox).appendChild(img);
    updateStorage();
    addDeleteEvent();
    addInputEvent();
});

notesContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
});

function addDeleteEvent() {
    document.querySelectorAll(".input-box img").forEach(img => {
        img.onclick = function () {
            this.parentElement.remove();
            updateStorage();
        };
    });
}

function addInputEvent() {
    document.querySelectorAll(".input-box").forEach(note => {
        note.onkeyup = function () {
            updateStorage();
        };
    });
}

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}
