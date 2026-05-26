import React, { useEffect } from 'react';
import { useGame } from './hooks/useGame';
import { UPGRADES, SKINS } from './utils/constants';
import styles from './App.module.scss';

function App() {
  const { credits, duiktcoins, passiveIncome, upgrades, unlockedSkins, activeSkin, antiBonus, handleClick, buyUpgrade, buySkin, doPrestige } = useGame();

  // Додаткова вимога: Клавіатурне керування
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClick]);

  // Застосування скіна (зміна фону)
  const currentSkinBg = SKINS.find(s => s.id === activeSkin)?.bg || '#242424';

  return (
    <div className={styles.gameContainer} style={{ backgroundColor: currentSkinBg }}>
      
      <div className={styles.leftPanel}>
        <h1>Clicker Game</h1>
        <h2>Кредити: {Math.floor(credits)}</h2>
        <p>Пасивний дохід: {passiveIncome} / сек</p>
        <p>Duiktcoins (Множник): {duiktcoins} (+{duiktcoins * 10}%)</p>

        {antiBonus && (
          <div className={styles.warning}>
            УВАГА! Активний антибонус: {antiBonus.toUpperCase()}!
          </div>
        )}

        <div className={styles.clickArea}>
          <button 
            className={styles.mainButton} 
            onClick={handleClick}
            disabled={antiBonus === 'ddos'}
          >
            {antiBonus === 'ddos' ? 'DDoS АТАКА!' : 'КЛІК (Space)'}
          </button>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h3>Престиж</h3>
          <p>Скинути прогрес (крім скінів) в обмін на Duiktcoins.</p>
          <button onClick={doPrestige} disabled={credits < 10000}>
            Престиж (Мін. 10,000 кредитів)
          </button>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <h3>Апгрейди</h3>
        {UPGRADES.map(u => {
          const count = upgrades[u.id] || 0;
          const cost = Math.floor(u.baseCost * Math.pow(1.15, count));
          return (
            <div key={u.id} className={styles.upgradeItem}>
              <div>
                <strong>{u.name}</strong> (Рівень: {count})<br/>
                <small>Ефект: +{u.effect} {u.type === 'click' ? 'до кліку' : 'до пасиву'}</small>
              </div>
              <button onClick={() => buyUpgrade(u)} disabled={credits < cost}>
                Купити ({cost})
              </button>
            </div>
          );
        })}

        <h3 style={{ marginTop: '20px' }}>Скіни (Теми)</h3>
        {SKINS.map(s => {
          const isUnlocked = unlockedSkins.includes(s.id);
          const isActive = activeSkin === s.id;
          return (
            <div key={s.id} className={styles.upgradeItem}>
              <span>{s.name}</span>
              <button onClick={() => buySkin(s)} disabled={!isUnlocked && credits < s.price}>
                {isActive ? 'Вибрано' : isUnlocked ? 'Вибрати' : `Купити (${s.price})`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
