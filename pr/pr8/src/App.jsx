import { products } from './products.js';
import Product from './components/Product/Product.jsx';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Мій React Магазин</h1>
      <div className="product-list">
        {products.map(p => (
           // Передаємо всі властивості об'єкта як пропси за допомогою spread-оператора {...p}
          <Product key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}

export default App;
