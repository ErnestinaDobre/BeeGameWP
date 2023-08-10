import { GameMem } from '../data/mem';
import { EntityType } from '../model/entityTypes';
import { UI } from '../ui/ui';
import { handleHitButtonClick } from './hitButtonEventHandler';

describe('handleHitButtonClick', () => {
  let game;
  let uiGraphics;

  beforeEach(() => {
    game = new GameMem();
    uiGraphics = new UI(game);
  });

  it('should damage a random bee and refresh the board if both worker bees and queen are alive', () => {
    const mockWorkerBee = {
      getType: () => EntityType.WORKER,
      isAlive: () => true,
      takeDamage: jest.fn(),
    };
    const mockQueenBee = {
      getType: () => EntityType.QUEEN,
      isAlive: () => true,
    };
    game.board.allBees = [mockWorkerBee, mockQueenBee];

    const randomBeeIndex = 0;
    jest.spyOn(Math, 'floor').mockReturnValue(randomBeeIndex);

    handleHitButtonClick(game, uiGraphics);
    
    expect(mockWorkerBee.takeDamage).toHaveBeenCalled();
    expect(uiGraphics.refreshBoard).toHaveBeenCalled();
  });

  it('should reset the game and display an alert if no worker bees are alive', () => {
    const mockQueenBee = {
      getType: () => EntityType.QUEEN,
      isAlive: () => true,
    };
    game.board.allBees = [mockQueenBee];

    const alertSpy = jest.spyOn(window, 'alert');
    handleHitButtonClick(game, uiGraphics);

    expect(game.resetGame).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Game is over');
    expect(uiGraphics.refreshBoard).toHaveBeenCalled();
  });

  it('should reset the game and display an alert if no queen bee is alive', () => {
    const mockWorkerBee = {
      getType: () => EntityType.WORKER,
      isAlive: () => true,
    };
    game.board.allBees = [mockWorkerBee];

    const alertSpy = jest.spyOn(window, 'alert');
    handleHitButtonClick(game, uiGraphics);

    expect(game.resetGame).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Game is over');
    expect(uiGraphics.refreshBoard).toHaveBeenCalled();
  });
});
