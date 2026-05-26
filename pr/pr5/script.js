"use strict";
console.log("Підключено JavaScript для Практичної роботи №5");

// ==========================================
// Завдання 3. Отримання користувачів з API
// ==========================================
const loadUsersBtn = document.getElementById("loadUsers");
const usersOutput = document.getElementById("usersOutput");

loadUsersBtn.addEventListener("click", async () => {
    try {
        usersOutput.textContent = "Завантаження даних...";
        
        // Робимо запит до API
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        // Перевіряємо статус відповіді (Завдання 5.2)
        if (!response.ok) {
            throw new Error(`Помилка HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Виводимо гарно відформатований JSON
        usersOutput.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error("Помилка при завантаженні користувачів:", error);
        usersOutput.textContent = `Сталася помилка: ${error.message}`;
    }
});

// ==========================================
// Завдання 4. Робота з PokeAPI (Зі стилізацією)
// ==========================================
const loadPokemonBtn = document.getElementById("loadPokemon");
const pokemonOutput = document.getElementById("pokemonOutput");

loadPokemonBtn.addEventListener("click", async () => {
    // Запитуємо у користувача ім'я або ID покемона
    const query = prompt("Введіть ім'я або ID покемона (наприклад, pikachu або 25):");
    
    // Якщо нічого не ввели або натиснули "Скасувати", перериваємо виконання
    if (!query) return; 

    try {
        pokemonOutput.innerHTML = "<p>Пошук покемона...</p>";
        
        // Формуємо URL. PokeAPI вимагає дані в нижньому регістрі.
        const url = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase().trim()}`;
        
        const response = await fetch(url);
        
        // Перевірка, чи існує покемон
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Покемона не знайдено! Перевірте правильність імені або ID.");
            }
            throw new Error(`Помилка сервера: ${response.status}`);
        }
        
        const pokemon = await response.json();
        
        // Формуємо бейджі для типів покемона
        const typesHTML = pokemon.types.map(t => `<span class="type">${t.type.name}</span>`).join(" ");
        
        // Відображаємо стилізовану картку (виконання коментаря викладача)
        pokemonOutput.innerHTML = `
            <div class="pokemon-card">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <h2>${pokemon.name}</h2>
                <p><strong>ID:</strong> #${pokemon.id}</p>
                <p><strong>Тип:</strong> ${typesHTML}</p>
                <p><strong>Зріст:</strong> ${pokemon.height / 10} м</p>
                <p><strong>Вага:</strong> ${pokemon.weight / 10} кг</p>
            </div>
        `;
    } catch (error) {
        console.error("Помилка PokeAPI:", error);
        pokemonOutput.innerHTML = `<p class="error">${error.message}</p>`;
    }
});
