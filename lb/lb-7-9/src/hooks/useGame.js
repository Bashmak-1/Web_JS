import { useState, useEffect, useCallback } from 'react';
import { saveGameState, loadGameState } from '../db/storage';
import { UPGRADES } from '../utils/constants';

export const useGame = () => {
  const [credits, setCredits] = useState(0);
  const [duiktcoins, setDuiktcoins] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [passiveIncome, setPassiveIncome] = useState(0);
  const [upgrades, setUpgrades] = useState({});
  const [unlockedSkins, setUnlockedSkins] = useState(['default']);
  const [activeSkin, setActiveSkin] = useState('default');
  const [antiBonus, setAntiBonus] = useState(null); // Для вірусів/DDoS

  // Завантаження гри
  useEffect(() => {
    loadGameState().then(state => {
      if (state) {
        setCredits(state.credits || 0);
        setDuiktcoins(state.duiktcoins || 0);
        setClickValue(state.clickValue || 1);
        setPassiveIncome(state.passiveIncome || 0);
        setUpgrades(state.upgrades || {});
        setUnlockedSkins(state.unlockedSkins || ['default']);
        setActiveSkin(state.activeSkin || 'default');
      }
    });
  }, []);

  // Збереження гри (кожні 5 сек)
  useEffect(() => {
    const saveInterval = setInterval(() => {
      saveGameState({ credits, duiktcoins, clickValue, passiveIncome, upgrades, unlockedSkins, activeSkin });
    }, 5000);
    return () => clearInterval(saveInterval);
  }, [credits, duiktcoins, clickValue, passiveIncome, upgrades, unlockedSkins, activeSkin]);

  // Пасивний дохід (з урахуванням множника Престижу та багів)
  useEffect(() => {
    const incomeInterval = setInterval(() => {
      if (antiBonus === 'bug') return; // Антибонус: баг зупиняє пасивний дохід
      const multiplier = 1 + (duiktcoins * 0.1); // Кожен Duiktcoin дає +10%
      setCredits(prev => prev + (passiveIncome * multiplier));
    }, 1000);
    return () => clearInterval(incomeInterval);
  }, [passiveIncome, duiktcoins, antiBonus]);

  // Система випадкових Антибонусів
  useEffect(() => {
    const eventInterval = setInterval(() => {
      const chance = Math.random();
      if (chance < 0.05) { // 5% шанс кожні 30 сек
        const events = ['ddos', 'virus', 'bug'];
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        setAntiBonus(randomEvent);
        
        if (randomEvent === 'virus') {
          setCredits(prev => prev * 0.9); // Вірус забирає 10%
        }
        
        // Відновлення через 10 секунд
        setTimeout(() => setAntiBonus(null), 10000);
      }
    }, 30000);
    return () => clearInterval(eventInterval);
  }, []);

  const handleClick = useCallback(() => {
    if (antiBonus === 'ddos') return; // DDoS блокує кліки
    const multiplier = 1 + (duiktcoins * 0.1);
    setCredits(prev => prev + (clickValue * multiplier));
  }, [clickValue, duiktcoins, antiBonus]);

  const buyUpgrade = (upgrade) => {
    const count = upgrades[upgrade.id] || 0;
    const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, count));
    
    if (credits >= cost) {
      setCredits(prev => prev - cost);
      setUpgrades(prev => ({ ...prev, [upgrade.id]: count + 1 }));
      if (upgrade.type === 'click') setClickValue(prev => prev + upgrade.effect);
      if (upgrade.type === 'passive') setPassiveIncome(prev => prev + upgrade.effect);
    }
  };

  const buySkin = (skin) => {
    if (credits >= skin.price && !unlockedSkins.includes(skin.id)) {
      setCredits(prev => prev - skin.price);
      setUnlockedSkins(prev => [...prev, skin.id]);
      setActiveSkin(skin.id);
    } else if (unlockedSkins.includes(skin.id)) {
      setActiveSkin(skin.id);
    }
  };

  const doPrestige = () => {
    if (credits >= 10000) {
      const earnedCoins = Math.floor(Math.sqrt(credits / 10000));
      setDuiktcoins(prev => prev + earnedCoins);
      // Скидання прогресу
      setCredits(0);
      setClickValue(1);
      setPassiveIncome(0);
      setUpgrades({});
    }
  };

  return { credits, duiktcoins, passiveIncome, upgrades, unlockedSkins, activeSkin, antiBonus, handleClick, buyUpgrade, buySkin, doPrestige };
};
