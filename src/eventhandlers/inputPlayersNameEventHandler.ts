//Input player's name event Handler

export const handleNameInput = (inputElement: HTMLInputElement, editButton: HTMLButtonElement, submitButton: HTMLButtonElement, outputDiv: HTMLDivElement) => {
    if (inputElement && editButton && submitButton && outputDiv) {
        editButton.addEventListener('click', () => {
            inputElement.disabled = false;
            editButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        });

        submitButton.addEventListener('click', () => {
            const playerName = inputElement.value;
            outputDiv.textContent = `Player: ${playerName}`;
            inputElement.disabled = true;
            submitButton.style.display = 'none';
            editButton.style.display = 'inline-block';
        });
    }
};