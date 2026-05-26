"use strict";

console.log("Підключено JavaScript для Практичної роботи №4");

// Завдання 2. Вибір елементів:
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.querySelector("#addTask");
const taskList = document.getElementById("taskList");

console.log("Знайдені елементи:", taskInput, addTaskButton, taskList);

// Функція для додавання завдання
addTaskButton.addEventListener("click", function() {
    // Використовуємо trim() для видалення зайвих пробілів (важливо згідно п.6.5)
    const taskText = taskInput.value.trim();

    // Перевірка, чи не порожнє поле
    if (taskText) {
        // Створюємо новий елемент <li>
        const li = document.createElement("li");
        
        // Використовуємо textContent для захисту від XSS-атак
        li.textContent = taskText;
        
        // Додаємо до списку
        taskList.appendChild(li);
        
        console.log(`Додано нове завдання: "${taskText}"`);
        
        // Очищаємо поле введення після додавання
        taskInput.value = "";
    } else {
        console.log("Помилка: Спроба додати порожнє завдання.");
    }
});

// Додатково: додавання завдання по натисканню клавіші Enter у полі вводу
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTaskButton.click();
    }
});

// Завдання 4. Видалення завдань з використанням делегування подій
taskList.addEventListener("click", function(event) {
    // Перевіряємо, чи клік був саме по елементу списку <li>
    if (event.target.nodeName === "LI") {
        const removedTaskText = event.target.textContent;
        
        // Видаляємо елемент
        event.target.remove();
        
        console.log(`Видалено завдання: "${removedTaskText}"`);
    }
});

// Завдання 3.3 Фази подій (За бажанням - демонстрація захоплення)
// Додавання слухача у фазі захоплення (capturing)
taskList.addEventListener("click", function(event) {
    console.log("Слухач у фазі захоплення спрацював для:", event.target);
}, true);
