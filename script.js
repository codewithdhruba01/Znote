const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
const toggleModeCheckbox = document.getElementById("toggleMode");
const searchInput = document.getElementById("search-input");

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark-mode") {
    document.body.classList.add("dark-mode");
    toggleModeCheckbox.checked = true;
}

toggleModeCheckbox.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    const currentTheme = document.body.classList.contains("dark-mode") ? "dark-mode" : "";
    localStorage.setItem("theme", currentTheme);
});

// Load saved notes
window.addEventListener("load", () => {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
    addEvents();
});

// Create new note
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("div");
    inputBox.className = "input-box";

    let title = document.createElement("input");
    title.className = "note-title";
    title.setAttribute("placeholder", "Title...");
    title.setAttribute("maxlength", "50");

    let content = document.createElement("div");
    content.className = "note-content";
    content.setAttribute("contenteditable", "true");
    content.setAttribute("placeholder", "Write something...");

    let img = document.createElement("img");
    img.src = "Accets/delete.png";

    inputBox.appendChild(title);
    inputBox.appendChild(content);
    inputBox.appendChild(img);

    notesContainer.appendChild(inputBox);
    updateStorage();
    addEvents();
});

// Delete and Update Events
function addEvents() {
    document.querySelectorAll(".input-box img").forEach(img => {
        img.onclick = function () {
            this.parentElement.remove();
            updateStorage();
        };
    });
    document.querySelectorAll(".note-title, .note-content").forEach(field => {
        field.onkeyup = () => updateStorage();
    });
}

// Update Local Storage
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Search Notes
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const notes = document.querySelectorAll(".input-box");

    notes.forEach(note => {
        const title = note.querySelector(".note-title").value.toLowerCase();
        const content = note.querySelector(".note-content").innerText.toLowerCase();
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            note.style.display = "block";
        } else {
            note.style.display = "none";
        }
    });
});
