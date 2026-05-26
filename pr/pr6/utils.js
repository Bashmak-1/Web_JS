"use strict";

// Функція оголошення (Function Declaration)
export function greet(name) {
    return `Привіт, ${name}! Раді бачити.`;
}

// Стрілочна функція для додавання
export const add = (a, b) => a + b;

// Стрілочна функція для множення
export const multiply = (a, b) => a * b;

// Функція, що приймає невизначену кількість аргументів (REST оператор)
export function sumAll(...nums) {
    // Використання методу reduce для підрахунку суми
    return nums.reduce((acc, num) => acc + num, 0);
}
