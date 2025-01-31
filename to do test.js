// Load tasks from localStorage when the page loads
window.onload = loadTasks;

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTask(task.text, task.checked));
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#myUL li").forEach(li => {
        tasks.push({ 
            text: li.innerText.replace("×", ""), 
            checked: li.classList.contains("checked") 
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task to the list
function addTask(text, isChecked = false) {
    let li = document.createElement("li");
    li.textContent = text;
    if (isChecked) li.classList.add("checked");

    let closeBtn = document.createElement("SPAN");
    closeBtn.className = "close";
    closeBtn.textContent = "×";
    closeBtn.onclick = function() {
        li.remove();
        saveTasks();
    };
    
    li.appendChild(closeBtn);
    document.getElementById("myUL").appendChild(li);
    saveTasks();
}

// Function to create a new list item when clicking "Add"
function newElement() {
    let inputValue = document.getElementById("myInput").value.trim();
    if (!inputValue) {
        alert("You must write something!");
        return;
    }
    addTask(inputValue);
    document.getElementById("myInput").value = "";
}

// Mark tasks as checked when clicked
document.getElementById("myUL").addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveTasks();
    }
});

// Clear all tasks
function clearAllTasks() {
    document.getElementById("myUL").innerHTML = "";
    localStorage.removeItem("tasks");
}
