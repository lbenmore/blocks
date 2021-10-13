import Blocks from './blocks/game.js';

var game = new Blocks($$('.game__board'), { size: 12, speed: 500 });
window.addEventListener('error', () => {
  game.stop();
});

$$('#stop').on('click', game.stop.bind(game));