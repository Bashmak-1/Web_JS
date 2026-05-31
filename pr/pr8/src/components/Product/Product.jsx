import { useState } from 'react';
import './Product.css'; // Підключаємо стилі для компонента

const Product = (props) => {
  // Деструктуризація пропсів
  const { title, price, img } = props;
  
  // Створення стану для підрахунку кліків
  const [count, setCount] = useState(0);

  // Функція для оновлення стану
  const handleBuy = () => {
    setCount(count + 1);
  };

  return (
    <div className="product">
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <p className="price">Ціна: {price} грн</p>
      <p className="count">Куплено: {count}</p>
      <button onClick={handleBuy}>Купити</button>
    </div>
  );
};

export default Product;
