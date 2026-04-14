"use strict";
console.log("Підключено JavaScript для Практичної роботи №3");

// =========================================================
// 1-3. НАВЧАЛЬНІ ЗАВДАННЯ (з конспекту)
// =========================================================

// 2.1 Об'єктний літерал
const car = {
    brand: "Toyota",
    year: 2020,
    displayInfo() {
        console.log(`[Навчальне] Автомобіль: ${this.brand}, Рік: ${this.year}`);
    }
};
car.displayInfo();

// 3.1 Функція-конструктор та прототип
function PersonDemo(name, age) {
    this.name = name;
    this.age = age;
}
PersonDemo.prototype.greet = function () {
    console.log(`[Навчальне] Привіт, я ${this.name} і мені ${this.age} років.`);
};
const person1 = new PersonDemo("Олена", 28);
person1.greet();

// 3.2 ES6 класи та наслідування
class Student extends PersonDemo {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
    displayInfo() {
        console.log(`[Навчальне] Студент: ${this.name}, Вік: ${this.age}, Оцінка: ${this.grade}`);
    }
}
const student1 = new Student("Андрій", 22, "A");
student1.displayInfo();


// =========================================================
// 4.1 САМОСТІЙНЕ ЗАВДАННЯ: Бібліотека користувачів
// =========================================================

// Базовий клас User
class User {
    constructor(name, age, profession) {
        this.name = name;
        this.age = age;
        this.profession = profession;
    }

    display() {
        return `👤 Користувач: ${this.name} | Вік: ${this.age} | Професія: ${this.profession}`;
    }
}

// Клас Admin, що наслідується від User
class Admin extends User {
    constructor(name, age, profession, role) {
        super(name, age, profession); // Виклик конструктора батька
        this.role = role;
    }

    // Перевизначення методу (Поліморфізм)
    display() {
        return `🛡️ АДМІНІСТРАТОР: ${this.name} | Вік: ${this.age} | Професія: ${this.profession} | Роль: ${this.role}`;
    }
}

// Інтерактивна функція (викликається кнопкою з HTML)
function startUserLibrary() {
    let name = prompt("Введіть ім'я користувача:");
    if (!name) return; // Якщо натиснули Скасувати

    let ageInput = prompt("Введіть вік:");
    let age = Number(ageInput);

    // Валідація віку
    if (isNaN(age) || age <= 0) {
        alert("Помилка: Вік повинен бути числом більшим за 0!");
        console.error("Помилка валідації віку.");
        return;
    }

    let profession = prompt("Введіть професію:");
    let isAdmin = confirm("Цей користувач є адміністратором?");

    let person;
    if (isAdmin) {
        let role = prompt("Введіть роль (наприклад, SuperAdmin, Moderator):");
        person = new Admin(name, age, profession, role);
    } else {
        person = new User(name, age, profession);
    }

    // Виведення результату
    let result = person.display();
    alert(result);
    console.log(result);
}


// =========================================================
// 4.2 САМОСТІЙНЕ ЗАВДАННЯ: Власний проєкт OOP & Live-coding
// =========================================================

/* 
  Відповідь на питання з п.4.2 та п.7 (Парадигми ООП у JavaScript):
  1. Інкапсуляція: Підтримується частково (домовленості через _ або нові приватні поля #).
  2. Наслідування: Підтримується (прототипне або через extends).
  3. Поліморфізм: Підтримується (можна перевизначати методи в дочірніх класах).
  4. Абстракція: Повноцінної абстракції (abstract classes, interfaces) на рівні мови немає. 
     Її доводиться імітувати, викидаючи помилки в методах батьківського класу, якщо їх не перевизначили.
*/

// Демонстрація інкапсуляції та проблеми втрати контексту (п.6)
class BankAccount {
    // Приватна властивість (інкапсуляція)
    #balance;

    constructor(owner, initialBalance) {
        this.owner = owner;
        this.#balance = initialBalance;
    }

    showBalance() {
        console.log(`Баланс клієнта ${this.owner}: ${this.#balance} грн.`);
        alert(`Баланс клієнта ${this.owner}: ${this.#balance} грн.`);
    }

    // Демонстрація bind() для збереження this
    delayedStatement() {
        console.log("Запит в банк... очікуйте 2 секунди.");
        // Якщо передати просто this.showBalance, контекст загубиться. Тому юзаємо bind(this)
        setTimeout(this.showBalance.bind(this), 2000);
    }
}

function startCustomOOP() {
    alert("Запускаємо симуляцію банківського рахунку (див. консоль). Демонструємо інкапсуляцію та метод bind().");
    const myAccount = new BankAccount("Іван", 5000);

    // Спроба отримати доступ до приватного поля напряму видасть помилку (інкапсуляція працює):
    // console.log(myAccount.#balance); // SyntaxError

    // Демонстрація збереження контексту
    myAccount.delayedStatement();
}