import { useState, useEffect } from "react";
import "./App.css"; // Підключаємо стилі

export default function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, text: "Купити продукти для вечері 🍎", done: false },
    { id: 2, text: "Написати звіт по лабораторній роботі 📝", done: true },
    { id: 3, text: "Розібратися з хуками в React ⚛️", done: false }
  ]);
  const [filter, setFilter] = useState("all"); // Стан для фільтрації: 'all', 'active', 'done'
  
  // Зчитуємо тему з localStorage або ставимо за замовчуванням 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("todo-theme") || "light";
  });

  // Зберігаємо тему при її зміні
  useEffect(() => {
    localStorage.setItem("todo-theme", theme);
  }, [theme]);

  // Додавання завдання
  const addTask = () => {
    if (!text.trim()) return; // Запобігаємо додаванню порожніх завдань
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
    setText(""); // Очищуємо поле вводу
  };

  // Перемикання статусу (виконано / не виконано)
  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  // Видалення завдання
  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Логіка фільтрації завдань
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "done") return task.done;
    return true; // Якщо 'all'
  });

  return (
    <div className="app-page" data-theme={theme}>
      <div className="app-container">
        
        {/* Панель вибору тем */}
        <div className="theme-selector">
          <button 
            className={theme === "light" ? "active-theme" : ""} 
            onClick={() => setTheme("light")}
            title="Світла тема"
          >
            ☀️
          </button>
          <button 
            className={theme === "dark" ? "active-theme" : ""} 
            onClick={() => setTheme("dark")}
            title="Темна тема"
          >
            🌙
          </button>
          <button 
            className={theme === "sunset" ? "active-theme" : ""} 
            onClick={() => setTheme("sunset")}
            title="Захід сонця"
          >
            🌅
          </button>
          <button 
            className={theme === "cyberpunk" ? "active-theme" : ""} 
            onClick={() => setTheme("cyberpunk")}
            title="Кіберпанк"
          >
            ⚡
          </button>
          <button 
            className={theme === "hacker" ? "active-theme" : ""} 
            onClick={() => setTheme("hacker")}
            title="Хакер"
          >
            💻
          </button>
          <button 
            className={theme === "ocean" ? "active-theme" : ""} 
            onClick={() => setTheme("ocean")}
            title="Синє море"
          >
            🌊
          </button>
        </div>

        <h1>Mini ToDo List</h1>
        
        {/* Поле вводу та кнопка */}
        <div className="input-group">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()} // Додавання по Enter
            placeholder="Введіть завдання..."
          />
          <button className="add-btn" onClick={addTask}>Add</button>
        </div>

        {/* Кнопки фільтрації */}
        <div className="filters">
          <button 
            className={filter === "all" ? "active-filter" : ""} 
            onClick={() => setFilter("all")}>All</button>
          <button 
            className={filter === "active" ? "active-filter" : ""} 
            onClick={() => setFilter("active")}>Active</button>
          <button 
            className={filter === "done" ? "active-filter" : ""} 
            onClick={() => setFilter("done")}>Done</button>
        </div>

        {/* Список завдань */}
        <ul>
          {filteredTasks.length === 0 ? (
            <p className="empty-message">Завдань немає</p>
          ) : (
            filteredTasks.map((task) => (
              <li key={task.id} className={task.done ? "task-done" : ""}>
                <span onClick={() => toggleTask(task.id)}>
                  {task.text}
                </span>
                <button className="delete-btn" onClick={() => removeTask(task.id)}>
                  ✖
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
