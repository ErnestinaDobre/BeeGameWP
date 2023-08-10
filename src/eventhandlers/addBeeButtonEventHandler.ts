// addBee Button EventHandler
import { GameMem } from '../data/mem';
import { UI } from '../ui/ui';

export const handleAddBeeButtonClick = (game: GameMem, uiGraphics: UI, beeType: string) => {
  const addButtonId = beeType === "worker" ? 'addworker' : 'adddrone';

  document.getElementById(addButtonId).addEventListener('click', function () {
    if (beeType === "worker") {
      uiGraphics.gameMem.board.addWorkerBee();
    } else if (beeType === "drone") {
      uiGraphics.gameMem.board.addDroneBee();
    }
    uiGraphics.refreshBoard();
  });
};
