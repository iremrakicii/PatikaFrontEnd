document.querySelectorAll('.flower').forEach(button => {
    button.addEventListener('click', () => {
        const soundId = button.getAttribute('data-sound');
        const audio = document.getElementById(soundId);
        audio.currentTime = 0; // Sesi baştan çal
        audio.play();
    });
});
