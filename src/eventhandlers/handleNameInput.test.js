import { handleNameInput } from './inputPlayersNameEventHandler'; 

describe('handleNameInput', () => {
  let inputElement;
  let editButton;
  let submitButton;
  let outputDiv;

  beforeEach(() => {
    inputElement = document.createElement('input');
    editButton = document.createElement('button');
    submitButton = document.createElement('button');
    outputDiv = document.createElement('div');
  });

  it('should enable input element and show submit button when edit button is clicked', () => {
    handleNameInput(inputElement, editButton, submitButton, outputDiv);

    editButton.click();

    expect(inputElement.disabled).toBe(false);
    expect(editButton.style.display).toBe('none');
    expect(submitButton.style.display).toBe('inline-block');
  });

  it('should display player name in output div, disable input element, and show edit button when submit button is clicked', () => {
    const playerName = 'John Doe';
    inputElement.value = playerName;
    handleNameInput(inputElement, editButton, submitButton, outputDiv);

    submitButton.click();

    expect(outputDiv.textContent).toBe(`Player: ${playerName}`);
    expect(inputElement.disabled).toBe(true);
    expect(submitButton.style.display).toBe('none');
    expect(editButton.style.display).toBe('inline-block');
  });
});
