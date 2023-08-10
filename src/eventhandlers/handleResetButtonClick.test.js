import { handleResetButtonClick } from './resetButtonEventHandler';

describe('handleResetButtonClick', () => {
  let gameMock;
  let uiGraphicsMock;
  let resetButton;

  beforeEach(() => {
    gameMock = new GameMem();
    uiGraphicsMock = new UI(gameMock);

    resetButton = document.createElement('button');
    resetButton.id = 'reset';
    document.body.appendChild(resetButton);

    handleResetButtonClick(gameMock, uiGraphicsMock);
  });

  afterEach(() => {
    resetButton.remove();
  });

  it('should reset the game and refresh the board when the reset button is clicked', () => {
    const resetSpy = jest.spyOn(gameMock, 'resetGame');
    const refreshBoardSpy = jest.spyOn(uiGraphicsMock, 'refreshBoard');

    resetButton.click();

    expect(resetSpy).toHaveBeenCalled();
    expect(refreshBoardSpy).toHaveBeenCalled();
  });
});
