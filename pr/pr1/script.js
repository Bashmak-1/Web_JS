"use strict";

function startSurvey() {
    // 1. Збір даних через prompt
    const userName = prompt("Як вас звати?");
    const userAgeInput = prompt("Скільки вам років?");
    const userCity = prompt("З якого ви міста?");
    const favoriteColor = prompt("Який ваш улюблений колір?");
    const isWorking = confirm("Ви зараз працюєте? (ОК - так, Скасувати - ні)");

    // 2. Перетворення типу (як вимагає інструкція)
    const userAge = Number(userAgeInput);

    // 3. Логічна перевірка
    const isAdult = userAge >= 18;
    const adultStatus = isAdult ? "повнолітня особа" : "неповнолітня особа";

    // 4. Вивід типів змінних у консоль (для викладача)
    console.group("--- Типи даних (typeof) ---");
    console.log("Ім'я:", typeof userName);
    console.log("Вік (після Number()):", typeof userAge);
    console.log("Місто:", typeof userCity);
    console.log("Колір:", typeof favoriteColor);
    console.log("Статус роботи:", typeof isWorking);
    console.groupEnd();

    // 5. Формування результату
    const resultMessage = `Користувач: ${userName}
Вік: ${userAge} (${adultStatus})
Місто: ${userCity}
Улюблений колір: ${favoriteColor}
Працює: ${isWorking ? "Так" : "Ні"}`;

    // 6. Фінальний вивід
    alert(resultMessage);
    console.log("--- Фінальний результат ---");
    console.log(resultMessage);
}