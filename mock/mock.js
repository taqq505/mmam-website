const buttons = document.querySelectorAll('.copy-btn');

buttons.forEach(button => {
    button.addEventListener('click', async () => {
        const text = button.dataset.copy || '';
        try {
            await navigator.clipboard.writeText(text);
            button.classList.add('copied');
            button.textContent = 'コピー済み';
            setTimeout(() => {
                button.classList.remove('copied');
                button.textContent = 'コピー';
            }, 1800);
        } catch (err) {
            console.warn('Clipboard unavailable', err);
            button.textContent = '手動コピー';
        }
    });
});
