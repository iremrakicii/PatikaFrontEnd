// Tıklama olaylarını dinleme
document.querySelectorAll(".key").forEach((button) => {
    button.addEventListener("click", function () {
        const key = this.getAttribute("data-key");
        playSound(key);
    });
});

// Klavyeden tuş basılmasını dinleme
document.addEventListener("keydown", function (event) {
    playSound(event.keyCode);
});

// Ses oynatma fonksiyonu
function playSound(keyCode) {
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const button = document.querySelector(`.key[data-key="${keyCode}"]`);

    if (!audio) return;

    audio.currentTime = 0; // Sesin tekrar çalmasını sağlar
    audio.play();

    button.classList.add("playing");
    setTimeout(() => button.classList.remove("playing"), 150);
}
