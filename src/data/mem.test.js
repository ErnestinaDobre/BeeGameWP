import { GameMem } from './mem';
import { Board } from '../model/board';

describe('GameMem', () => {
  let gameMem;
  let mockBoard;
  let mockEntity;

  beforeEach(() => {
    mockBoard = new Board();
    mockEntity = {
      getType: jest.fn(),
      isAlive: jest.fn(),
    };

    gameMem = new GameMem();
    gameMem.setBoard(mockBoard);
  });

  describe('saveGame', () => {
    it('should save the game state to local storage if at least one bee is alive', () => {
      mockBoard.allBees = [mockEntity];
      mockEntity.isAlive.mockReturnValue(true);

      localStorage.setItem = jest.fn();

      gameMem.saveGame();

      expect(localStorage.setItem).toHaveBeenCalledWith('GAME_STATE', JSON.stringify(mockBoard));
    });

    it('should not save the game state to local storage if no bees are alive', () => {
      mockBoard.allBees = [mockEntity];
      mockEntity.isAlive.mockReturnValue(false);

      localStorage.setItem = jest.fn();

      gameMem.saveGame();

      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('loadGame', () => {
    it('should load the game state from local storage and update the board', () => {
      const savedBoardData = {
        _allBees: [
          { entityType: 'QUEEN', hp: 10 },
          { entityType: 'WORKER', hp: 5 },
        ],
      };

      localStorage.getItem = jest.fn().mockReturnValue(JSON.stringify(savedBoardData));
      mockBoard.initFromLoad = jest.fn();

      gameMem.loadGame();

      expect(mockBoard.initFromLoad).toHaveBeenCalledWith(savedBoardData._allBees);
    });

    it('should not update the board if local storage does not have saved game state', () => {
      localStorage.getItem = jest.fn().mockReturnValue(null);
      mockBoard.initFromLoad = jest.fn();

      gameMem.loadGame();

      expect(mockBoard.initFromLoad).not.toHaveBeenCalled();
    });
  });

  describe('resetGame', () => {
    it('should reset the game state and remove the saved game state from local storage', () => {
      mockBoard.initDefault = jest.fn();
      localStorage.removeItem = jest.fn();

      gameMem.resetGame();

      expect(mockBoard.initDefault).toHaveBeenCalled();
      expect(localStorage.removeItem).toHaveBeenCalledWith('GAME_STATE');
    });
  });

});
