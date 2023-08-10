// resetButton Event Handler
import { GameMem } from '../data/mem';
import { UI } from '../ui/ui';

export const handleResetButtonClick = (game: GameMem, uiGraphics: UI) => {
  document.getElementById('reset').addEventListener('click', function () {
    game.resetGame();
    uiGraphics.refreshBoard();
  });
};