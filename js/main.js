import Blocks from './blocks/game.js';

const game = new Blocks($$('.game__board'), { size: 12, speed: 500 });
game.events.addEventListener('blocks.gameover', evt => console.log(evt.type));

addEventListener('error', () => {
  game.stop();
});
$$('.game__controls button').on('click', evt => {
  game[evt.target.id].call(game);
});

function updateStyling () {
  $$('body').css({ height: `${innerHeight}px` });
}

updateStyling();
addEventListener('resize', updateStyling);