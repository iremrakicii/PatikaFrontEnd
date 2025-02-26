// Kullanıcıdan isim isteme
let userName = prompt("Lütfen adınızı giriniz:");
let welcomeMessage = document.getElementById('welcome');

// İsim girilmişse mesajı göster
if (userName) {
    welcomeMessage.textContent = `Merhaba, ${userName}! Hoş geldin!`;
} else {
    welcomeMessage.textContent = "Merhaba! Hoş geldin!";
}

// Saati ve günü gösterme fonksiyonu
function showTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const days = [
        "Pazar", "Pazartesi", "Salı", "Çarşamba", 
        "Perşembe", "Cuma", "Cumartesi"
    ];
    const day = days[now.getDay()];

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds} ${day}`;
}

// Saati her saniye güncelle
setInterval(showTime, 1000);
showTime();
