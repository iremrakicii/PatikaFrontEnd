document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Görev ekleme
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        showToast("Lütfen bir görev girin!", "danger");
        return;
    }

    // Yeni görev oluştur
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = taskText;

    // Silme butonu ekleme
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.classList.add("btn", "btn-danger", "btn-sm");
    deleteBtn.addEventListener("click", function () {
        removeTask(li);
    });

    // Göreve tıklanınca tamamlandı işaretleme
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    taskInput.value = "";

    saveTasks();
    showToast("Görev başarıyla eklendi!", "success");
}

// Görev silme
function removeTask(task) {
    task.remove();
    saveTasks();
    showToast("Görev silindi!", "warning");
}

// Toast mesajlarını gösterme
function showToast(message, type) {
    const toastEl = document.getElementById("liveToast");
    const toastBody = toastEl.querySelector(".toast-body");
    toastEl.classList.remove("bg-success", "bg-danger", "bg-warning");
    toastEl.classList.add(`bg-${type}`);
    toastBody.textContent = message;

    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

// Local Storage kullanarak görevleri kaydetme
function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".list-group-item").forEach((task) => {
        tasks.push({
            text: task.textContent.replace("×", "").trim(),
            completed: task.classList.contains("completed"),
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Sayfa yüklendiğinde kayıtlı görevleri getirme
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach((taskData) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.textContent = taskData.text;

        if (taskData.completed) {
            li.classList.add("completed");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "×";
        deleteBtn.classList.add("btn", "btn-danger", "btn-sm");
        deleteBtn.addEventListener("click", function () {
            removeTask(li);
        });

        li.addEventListener("click", function () {
            li.classList.toggle("completed");
            saveTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
