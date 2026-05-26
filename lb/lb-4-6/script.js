"use strict";

// Глобальна змінна для збереження всіх завантажених фільмів
let allMovies = [];

// Елементи DOM
const moviesContainer = document.getElementById('movies');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const errorContainer = document.getElementById('error-container');
const loader = document.getElementById('loader');

// Завдання 3: Отримання даних з API та обробка помилок
const fetchMovies = async () => {
    try {
        // Асинхронний запит до TV Maze API
        const response = await fetch('https://api.tvmaze.com/shows');
        
        // Перевірка статусу відповіді
        if (!response.ok) {
            throw new Error(`Помилка HTTP: ${response.status}`);
        }

        const data = await response.json();
        allMovies = data; // Зберігаємо дані локально для фільтрації

        // Приховуємо лоадер і відображаємо дані
        loader.style.display = 'none';
        renderMovies(allMovies);

    } catch (error) {
        loader.style.display = 'none';
        errorContainer.textContent = `Не вдалося завантажити дані: ${error.message}. Спробуйте пізніше.`;
        console.error("Помилка завантаження API:", error);
    }
};

// Завдання 4: Відображення даних на сторінці (деструктуризація, шаблонні рядки)
const renderMovies = (moviesArray) => {
    // Очищаємо контейнер
    moviesContainer.innerHTML = '';

    if (moviesArray.length === 0) {
        moviesContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Фільмів не знайдено.</p>';
        return;
    }

    // Створення розмітки для кожного фільму
    const moviesHTML = moviesArray.map(movie => {
        // ES6 Деструктуризація
        const { name, rating, genres, image, summary } = movie;
        
        // Обробка відсутності даних
        const imageUrl = image?.medium || 'https://via.placeholder.com/210x295?text=No+Image';
        const movieRating = rating?.average ? `⭐ ${rating.average}` : 'Без рейтингу';
        const movieGenres = genres.length > 0 ? genres.join(', ') : 'Жанр невідомий';

        // Шаблонні рядки для HTML
        return `
            <div class="movie-card">
                <img src="${imageUrl}" alt="Постер ${name}">
                <div class="movie-info">
                    <h2 class="movie-title">${name}</h2>
                    <div class="movie-rating">${movieRating}</div>
                    <div class="movie-genres">${movieGenres}</div>
                    <div class="movie-summary">${summary || 'Опис відсутній.'}</div>
                </div>
            </div>
        `;
    }).join(''); // Об'єднуємо масив рядків в один рядок

    // Вставка в DOM
    moviesContainer.innerHTML = moviesHTML;
};

// Завдання 5: Реалізація функціоналу фільтрації та сортування
const handleFilterAndSort = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const sortType = sortSelect.value;

    // 1. Фільтрація за назвою
    let processedMovies = allMovies.filter(movie => 
        movie.name.toLowerCase().includes(searchTerm)
    );

    // 2. Сортування
    if (sortType === 'rating') {
        // Від найвищого рейтингу до найнижчого
        processedMovies.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
    } else if (sortType === 'az') {
        // За алфавітом А-Я
        processedMovies.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === 'za') {
        // За алфавітом Я-А
        processedMovies.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Рендер оновленого списку
    renderMovies(processedMovies);
};

// Додавання слухачів подій (Event Listeners)
searchInput.addEventListener('input', handleFilterAndSort);
sortSelect.addEventListener('change', handleFilterAndSort);

// Ініціалізація застосунку при завантаженні сторінки
fetchMovies();
