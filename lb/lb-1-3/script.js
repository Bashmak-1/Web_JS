"use strict"; // Вимога: використання strict mode

// ==========================================
// 1. ЗАМИКАННЯ ТА КАРРІНГ (Валідація даних)
// ==========================================
// Функція вищого порядку, яка повертає функцію-валідатор (Каррінг/Замикання)
const createValidator = (type) => {
    return (value) => {
        if (!value || value.trim() === '') return { valid: false, error: "Поле не може бути порожнім" };
        
        if (type === 'age') {
            const ageNum = Number(value); // Перетворення типів
            if (isNaN(ageNum) || ageNum < 16 || ageNum > 100) {
                return { valid: false, error: "Некоректний вік (має бути число від 16 до 100)" };
            }
            return { valid: true, value: ageNum };
        }
        
        if (type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return { valid: false, error: "Некоректний формат email" };
            }
        }
        return { valid: true, value: value.trim() };
    };
};

// Створюємо конкретні валідатори через замикання
const validateAge = createValidator('age');
const validateText = createValidator('text');
const validateEmail = createValidator('email');


// ==========================================
// 2. ОБ'ЄКТНО-ОРІЄНТОВАНЕ ПРОГРАМУВАННЯ
// ==========================================

// Базовий клас (Демонстрація наслідування)
class ResumeBlock {
    constructor(title) {
        this.title = title;
    }
    renderTitle() {
        return `<h3>${this.title}</h3>`;
    }
}

// Клас Особисті дані (Інкапсуляція, геттери/сеттери)
class PersonalInfo extends ResumeBlock {
    constructor(name, age, email, phone) {
        super('Особиста інформація');
        this.name = name;
        this.email = email;
        this.phone = phone;
        this._age = 0; 
        this.age = age; // Виклик сеттера
    }

    // Геттер та Сеттер
    get age() {
        return this._age;
    }
    set age(value) {
        if (typeof value === 'number' && value > 0) {
            this._age = value;
        } else {
            console.warn("Спроба встановили некоректний вік в об'єкті");
        }
    }

    getHTML() {
        return `
            <div class="res-header">
                <h1>${this.name}</h1>
                <div class="res-contact">
                    Вік: ${this.age} років | Email: ${this.email} | Тел: ${this.phone}
                </div>
            </div>
        `;
    }
}

// Клас Навички
class Skills extends ResumeBlock {
    constructor(skillsString) {
        super('Навички');
        // Розбиваємо рядок на масив
        this.skillsList = skillsString.split(',').map(s => s.trim());
    }
    getHTML() {
        const listItems = this.skillsList.map(skill => `<li>${skill}</li>`).join('');
        return `
            <div class="res-section">
                ${this.renderTitle()}
                <ul>${listItems}</ul>
            </div>
        `;
    }
}

// Клас Освіта
class Education extends ResumeBlock {
    constructor(info) {
        super('Освіта');
        this.info = info;
    }
    getHTML() {
        return `
            <div class="res-section">
                ${this.renderTitle()}
                <p class="res-item">${this.info}</p>
            </div>
        `;
    }
}

// Клас Досвід
class Experience extends ResumeBlock {
    constructor(info) {
        super('Досвід роботи');
        this.info = info;
    }
    getHTML() {
        return `
            <div class="res-section">
                ${this.renderTitle()}
                <p class="res-item">${this.info}</p>
            </div>
        `;
    }
}

// Головний клас Резюме (Агрегація)
class Resume {
    constructor(personal, skills, education, experience) {
        this.personal = personal;
        this.skills = skills;
        this.education = education;
        this.experience = experience;
    }

    // DOM-метод для відображення
    renderTo(containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = `
            ${this.personal.getHTML()}
            ${this.skills.getHTML()}
            ${this.experience.getHTML()}
            ${this.education.getHTML()}
        `;
        console.log("Резюме успішно відрендерено!"); // Робота з DevTools
    }

    // Збереження в LocalStorage (Додаткове завдання)
    save() {
        const data = {
            name: this.personal.name,
            age: this.personal.age,
            email: this.personal.email,
            phone: this.personal.phone,
            skills: this.skills.skillsList.join(', '),
            education: this.education.info,
            experience: this.experience.info
        };
        localStorage.setItem('savedResume', JSON.stringify(data));
        alert("Резюме успішно збережено!"); // Робота з alert
    }
}


// ==========================================
// 3. ІНТЕГРАЦІЯ ТА РОБОТА З DOM
// ==========================================
document.getElementById('resume-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Зупиняємо перезавантаження сторінки

    // Збір даних з форми
    const rawData = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        skills: document.getElementById('skills').value,
        education: document.getElementById('education').value,
        experience: document.getElementById('experience').value
    };

    // Валідація
    const ageCheck = validateAge(rawData.age);
    const emailCheck = validateEmail(rawData.email);
    const nameCheck = validateText(rawData.name);

    if (!ageCheck.valid) return alert(`Помилка: ${ageCheck.error}`);
    if (!emailCheck.valid) return alert(`Помилка: ${emailCheck.error}`);
    if (!nameCheck.valid) return alert(`Помилка: ${nameCheck.error}`);

    // Створення об'єктів класів
    const personalInfo = new PersonalInfo(rawData.name, ageCheck.value, rawData.email, rawData.phone);
    const skillsInfo = new Skills(rawData.skills);
    const educationInfo = new Education(rawData.education);
    const experienceInfo = new Experience(rawData.experience);

    // Створення головного об'єкта та рендер
    const myResume = new Resume(personalInfo, skillsInfo, educationInfo, experienceInfo);
    myResume.renderTo('resume-output');
    
    // Зберігаємо дані
    myResume.save();
});

// Завантаження збережених даних
document.getElementById('load-btn').addEventListener('click', () => {
    const saved = localStorage.getItem('savedResume');
    if (saved) {
        const data = JSON.parse(saved);
        document.getElementById('name').value = data.name;
        document.getElementById('age').value = data.age;
        document.getElementById('email').value = data.email;
        document.getElementById('phone').value = data.phone;
        document.getElementById('skills').value = data.skills;
        document.getElementById('education').value = data.education;
        document.getElementById('experience').value = data.experience;
        alert("Дані завантажено! Натисніть 'Згенерувати' для показу.");
    } else {
        alert("Збережених даних не знайдено.");
    }
});
