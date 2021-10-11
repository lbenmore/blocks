import Blocks from './blocks/game.js';

var game = new Blocks($$('.game__board'), { size: 8, speed: 500 });
window.addEventListener('error', () => {
  game.stop();
});