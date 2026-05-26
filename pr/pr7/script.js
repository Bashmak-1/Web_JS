"use strict";

console.log("Підключено JavaScript для Практичної роботи №7");

// ==========================================
// Завдання 2. Робота з JSON та localStorage
// ==========================================
try {
    const jsonString = '{"name": "Іван", "age": 30}';
    const user = JSON.parse(jsonString); // Рядок у JS-об'єкт
    console.log("Розпарсені дані JSON:", user);

    const newJson = JSON.stringify(user, null, 2); // JS-об'єкт у рядок
    console.log("Відформатований JSON:\n", newJson);

    // Збереження і читання примітивів
    localStorage.setItem("username", "Іван");
    console.log("Дані з localStorage (username):", localStorage.getItem("username"));

    // Правильне збереження об'єкта (п. 5.2 - уникнення помилок)
    localStorage.setItem("userData", JSON.stringify(user));
} catch (error) {
    console.error("Помилка парсингу JSON:", error);
}

// ==========================================
// Завдання 3. Обробка даних з масивами
// ==========================================
const numbers = [1, 2, 3, 4, 5];

const squares = numbers.map(num => num * num);
console.log("Квадрати чисел (map):", squares);

const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("Парні числа (filter):", evenNumbers);

const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log("Сума чисел (reduce):", sum);


// ==========================================
// Завдання 4. Комплексне завдання: To-do list із збереженням даних
// ==========================================
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Функція для безпечного завантаження завдань з localStorage
function loadTasks() {
    try {
        const tasksJSON = localStorage.getItem("tasks");
        return tasksJSON ? JSON.parse(tasksJSON) : [];
    } catch (error) {
        console.error("Помилка читання завдань з localStorage:", error);
        return []; // Якщо JSON зламаний, повертаємо порожній масив
    }
}

// Функція для збереження завдань
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Функція для відображення завдань на сторінці
function displayTasks() {
    const tasks = loadTasks();
    taskList.innerHTML = ""; // Очищаємо список перед оновленням
    
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;
        
        // Створюємо кнопку видалення
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Видалити";
        deleteBtn.className = "delete-btn";
        deleteBtn.setAttribute("data-index", index); // Додаємо індекс для делегування
        
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Обробка події: Додавання завдання
addTaskButton.addEventListener("click", function() {
    const taskText = taskInput.value.trim();
    
    if (taskText !== "") {
        const tasks = loadTasks();
        tasks.push(taskText);
        saveTasks(tasks);
        displayTasks();
        taskInput.value = ""; // Очищаємо поле
    }
});

// Обробка події: Додавання завдання клавішею Enter
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTaskButton.click();
    }
});

// Обробка події: Видалення завдання (Делегування подій)
taskList.addEventListener("click", function(event) {
    // Перевіряємо, чи клікнули саме по кнопці "Видалити"
    if (event.target && event.target.classList.contains("delete-btn")) {
        const index = event.target.getAttribute("data-index");
        let tasks = loadTasks();
        
        // Видаляємо 1 елемент за знайденим індексом
        tasks.splice(index, 1);
        
        saveTasks(tasks);
        displayTasks();
        console.log("Завдання видалено");
    }
});

// Завантаження завдань при старті (відкритті сторінки)
displayTasks();
