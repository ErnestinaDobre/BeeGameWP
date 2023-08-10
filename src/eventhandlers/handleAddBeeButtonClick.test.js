import { GameMem } from '../data/mem';
import { UI } from '../ui/ui';
import { handleAddBeeButtonClick } from './addBeeButtonEventHandler';

// Mocking necessary components and functions
jest.mock('../data/mem');
jest.mock('../ui/ui');

describe('handleAddBeeButtonClick', () => {
  let gameMemMock;
  let uiGraphicsMock;
  let addButtonMock;

  beforeEach(() => {
    // Reset mocks and setup initial conditions
    jest.clearAllMocks();
    gameMemMock = new GameMem();
    uiGraphicsMock = new UI(gameMemMock);

    // Mocking getElementById
    addButtonMock = document.createElement('button');
    addButtonMock.id = 'addworker'; 
    document.getElementById = jest.fn().mockReturnValue(addButtonMock);
  });

  test('should add a worker bee when worker button is clicked', () => {
    handleAddBeeButtonClick(gameMemMock, uiGraphicsMock, 'worker');
    addButtonMock.click();

    expect(uiGraphicsMock.gameMem.board.addWorkerBee).toHaveBeenCalled();
    expect(uiGraphicsMock.refreshBoard).toHaveBeenCalled();
  });

  test('should add a drone bee when drone button is clicked', () => {
    handleAddBeeButtonClick(gameMemMock, uiGraphicsMock, 'drone');
    addButtonMock.click();

    expect(uiGraphicsMock.gameMem.board.addDroneBee).toHaveBeenCalled();
    expect(uiGraphicsMock.refreshBoard).toHaveBeenCalled();
  });
});