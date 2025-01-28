// Инициализация переменных
let cheese = 0;
let level = 1;
const cheeseDisplay = document.getElementById("cheese");
const levelDisplay = document.getElementById("level");

// Функции для управления игрой
document.getElementById("earnCheese").addEventListener("click", () => {
    cheese += level;
    cheeseDisplay.textContent = cheese;
    updatePlayerData(cheese, level);
});

document.getElementById("upgrade").addEventListener("click", () => {
    if (cheese >= level * 10) {
        cheese -= level * 10;
        level++;
        cheeseDisplay.textContent = cheese;
        levelDisplay.textContent = level;
        alert("Уровень повышен!");
        updatePlayerData(cheese, level);
    } else {
        alert("Недостаточно сыра для улучшения!");
    }
});

document.getElementById("logout").addEventListener("click", () => {
    // Логика выхода из игры
    alert("Вы вышли из игры!");
    window.close(); // Закрывает окно Web App в Telegram
});

// Функция для обновления данных на сервере
function updatePlayerData(cheese, level) {
    fetch("/update_player_data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ cheese: cheese, level: level })
    })
    .then(response => response.json())
    .then(data => {
        cheeseDisplay.textContent = data.cheese;
        levelDisplay.textContent = data.level;
    });
}
