import Blocks from './blocks/game.js';

const game = new Blocks($$('.game__board'), { size: 12, speed: 500 });

addEventListener('error', () => {
  game.stop();
});
$$('button').on('click', evt => {
  game[evt.target.id].call(game);
});

function updateStyling () {
  $$('body').css({ height: `${innerHeight}px` });
}

updateStyling();
addEventListener('resize', updateStyling);