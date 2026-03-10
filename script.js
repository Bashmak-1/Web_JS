document.addEventListener('DOMContentLoaded', () => {
    console.log("Портал готовий до роботи!");

    // Логіка для карток, які ще не готові
    const disabledCards = document.querySelectorAll('.card.disabled');
    disabledCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Ця робота ще не додана до архіву.");
        });
    });
});