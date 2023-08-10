// hit Button Event Handler
import { GameMem } from '../data/mem';
import { Entity } from '../model/entityInterfaces';
import { EntityType } from '../model/entityTypes';
import { UI } from '../ui/ui';

export const handleHitButtonClick = (game: GameMem, uiGraphics: UI) => {
  document.getElementById('hit').addEventListener('click', function () {
    const aliveBees = game.board.allBees.filter((bee: Entity) => bee.isAlive());
    const queen = aliveBees.some(bee => bee.getType() === EntityType.QUEEN)
    const bees = aliveBees.some(bee => bee.getType() !== EntityType.QUEEN)

    if (bees && queen) {
      const randomBee = aliveBees[Math.floor(Math.random() * aliveBees.length)];
      randomBee.takeDamage();
      uiGraphics.refreshBoard();
    } else {
      game.resetGame();
      alert('Game is over');
      uiGraphics.refreshBoard();
    }
  });
};