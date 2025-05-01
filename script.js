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

    let toolbar = document.createElement("div");
    toolbar.className = "toolbar";
    toolbar.innerHTML = `
        <button onclick="formatNote(this, 'bold')"><b>B</b></button>
        <button onclick="formatNote(this, 'italic')"><i>I</i></button>
        <button onclick="formatNote(this, 'underline')"><u>U</u></button>
    `;

    let content = document.createElement("div");
    content.className = "note-content";
    content.setAttribute("contenteditable", "true");

    let img = document.createElement("img");
    img.src = "Accets/delete.png";

    inputBox.appendChild(title);
    inputBox.appendChild(toolbar);
    inputBox.appendChild(content);
    inputBox.appendChild(img);

    notesContainer.appendChild(inputBox);
    updateStorage();
    addEvents();
});

// Toolbar Formatting
function formatNote(button, command) {
    const inputBox = button.closest('.input-box');
    const content = inputBox.querySelector('.note-content');
    content.focus();
    document.execCommand(command, false, null);
    updateStorage();
}

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
