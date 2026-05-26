"use strict";

// Імпортуємо функції та дані з інших файлів
import { greet, add, multiply, sumAll } from "./utils.js";
import { user, arr1, arr2 } from "./data.js";

console.log("Модульний код підключено успішно!");

// Елемент для виведення даних на сторінку
const appContainer = document.getElementById("app");
let htmlContent = "";

// ============================================
// 1. Деструктуризація та шаблонні рядки
// ============================================
const { name, age, city, profession } = user;
const userInfo = `Користувач: <b>${name}</b>, Вік: ${age}, Місто: ${city}, Професія: ${profession}`;

console.log(`[Деструктуризація]: ${userInfo.replace(/<b>|<\/b>/g, '')}`);
htmlContent += `<div class="result-block"><strong>Дані користувача:</strong> <br> ${userInfo}</div>`;

// ============================================
// 2. Використання імпортованих функцій
// ============================================
const greetingMessage = greet(name);
const mathResult1 = `10 + 5 = ${add(10, 5)}`;
const mathResult2 = `10 * 5 = ${multiply(10, 5)}`;

console.log(`[Функції]: ${greetingMessage}`);
console.log(`[Функції]: ${mathResult1}`);
console.log(`[Функції]: ${mathResult2}`);

htmlContent += `
    <div class="result-block">
        <strong>Виклик функцій:</strong><br>
        ${greetingMessage}<br>
        ${mathResult1}<br>
        ${mathResult2}
    </div>
`;

// ============================================
// 3. Оператор SPREAD (Об'єднання масивів)
// ============================================
// Об'єднуємо arr1, arr2 та додаємо нові елементи
const combinedArray = [...arr1, ...arr2, 7, 8, 9];

console.log("[Spread оператор] Об'єднаний масив:", combinedArray);
htmlContent += `<div class="result-block"><strong>Spread оператор:</strong> <br> Об'єднаний масив: [${combinedArray.join(", ")}]</div>`;

// ============================================
// 4. Оператор REST (Передача аргументів)
// ============================================
// Викликаємо sumAll з довільною кількістю аргументів
const totalSum = sumAll(10, 20, 30, 40);

console.log("[Rest оператор] Сума чисел (10, 20, 30, 40):", totalSum);
htmlContent += `<div class="result-block"><strong>Rest оператор:</strong> <br> Сума чисел (10, 20, 30, 40) = ${totalSum}</div>`;

// Виводимо весь сформований HTML на сторінку
appContainer.innerHTML = htmlContent;
