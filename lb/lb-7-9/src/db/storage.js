import { get, set } from 'idb-keyval';

export const saveGameState = async (state) => {
  await set('clicker_save', state);
};

export const loadGameState = async () => {
  return await get('clicker_save');
};
