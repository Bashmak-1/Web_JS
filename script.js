document.addEventListener('DOMContentLoaded', () => {
    console.log("Сайт завантажено, JS підключено!");

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            const folderName = card.querySelector('h2').innerText;
            console.log(`Перехід до папки: ${folderName}`);
        });
    });
});