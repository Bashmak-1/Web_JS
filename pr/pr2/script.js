"use strict";

console.log("--- Завдання 2: Функції та їх оголошення ---");

// 1. Функція-оголошення (Function Declaration)
function greet() {
    console.log("Привіт, світ!");
}
greet();
greet();

// 2. Функціональний вираз (Function Expression)
const multiply = function(a, b) {
    return a * b;
};
console.log("Добуток 4 * 5 =", multiply(4, 5));

// 3. Стрілочна функція (Arrow Function)
const divide = (a, b) => a / b;
console.log("Ділення 20 / 4 =", divide(20, 4));


console.log("\n--- Завдання 3: Параметри та області видимості ---");

function square(x) {
    return x * x;
}
console.log("Квадрат числа 6 =", square(6));

// Демонстрація блочної області видимості
if (true) {
    let localVar = "Я в блоці";
    console.log(localVar); // Працює
}
// console.log(localVar); // Викличе помилку ReferenceError (це правильно за завданням)


console.log("\n--- Завдання 4: Замикання та контекст this ---");

// 1. Функція-лічильник (Замикання)
function createCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}
const counter = createCounter();
console.log("Лічильник 1:", counter());
console.log("Лічильник 2:", counter());

// 2. Контекст this
const person = {
    name: "Олена",
    sayHello() {
        console.log(`Привіт, мене звуть ${this.name}`);
    }
};
person.sayHello();

// 3. Каррінг
function add(a) {
    return function(b) {
        return a + b;
    };
}
const addTen = add(10);
console.log("Каррінг (10 + 5) =", addTen(5));


// --- САМОСТІЙНЕ ЗАВДАННЯ 5.1: Анкета ---

function createSurvey() {
    const name = prompt("Введіть ваше ім'я:");
    const ageInput = prompt("Введіть ваш вік:");
    const city = prompt("Введіть ваше місто:");
    
    const age = Number(ageInput);
    const isAdult = age >= 18;

    return {
        name,
        age,
        city,
        isAdult
    };
}

function displaySurvey(surveyData) {
    const message = `
    Дані користувача:
    Ім'я: ${surveyData.name}
    Вік: ${surveyData.age}
    Місто: ${surveyData.city}
    Повнолітній: ${surveyData.isAdult ? "Так" : "Ні"}
    `;
    console.log(message);
    alert(message);
}

// Функція для запуску з кнопки
window.runSurvey = function() {
    const data = createSurvey();
    displaySurvey(data);
};


// --- САМОСТІЙНЕ ЗАВДАННЯ 5.2: Конвертер температур ---

// Функція каррінгу для створення конвертера
function createConverter(multiplier, offset) {
    return function(temp) {
        return (temp * multiplier) + offset;
    };
}

// Формули:
// C to F: (C * 9/5) + 32
// F to C: (F - 32) * 5/9  => (F * 5/9) - (32 * 5/9)
const celToFah = createConverter(9/5, 32);
const fahToCel = (f) => (f - 32) * 5/9; // Простіший варіант для зворотнього

window.runTemperatureConverter = function() {
    const tempValue = Number(prompt("Введіть числове значення температури:"));
    const direction = prompt("Оберіть напрямок: 'C to F' або 'F to C'");

    let result;
    if (direction === "C to F") {
        result = celToFah(tempValue);
        const output = `${tempValue}°C = ${result.toFixed(2)}°F`;
        alert(output);
        console.log(output);
    } else if (direction === "F to C") {
        result = fahToCel(tempValue);
        const output = `${tempValue}°F = ${result.toFixed(2)}°C`;
        alert(output);
        console.log(output);
    } else {
        alert("Невірний напрямок конвертації!");
    }
};