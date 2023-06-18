/*===== TELEGRAM BOT =====*/
function kirimPesan() {

    var nama = document.getElementById('name');
    var email = document.getElementById('email');
    var subject = document.getElementById('subject');
    var pesan = document.getElementById('message');

    var gabungan = '%F0%9D%90%8D%F0%9D%90%9A%F0%9D%90%A6%F0%9D%90%9A%20%3A%0A' + nama.value + '%0A%0A%F0%9D%90%84%F0%9D%90%A6%F0%9D%90%9A%F0%9D%90%A2%F0%9D%90%A5%20%3A%0A' + email.value + '%0A%0A%F0%9D%90%92%F0%9D%90%AE%F0%9D%90%9B%F0%9D%90%A3%F0%9D%90%9E%F0%9D%90%A4%20%3A%0A' + subject.value + '%0A%0A%F0%9D%90%8F%F0%9D%90%9E%F0%9D%90%AC%F0%9D%90%9A%F0%9D%90%A7%20%3A%0A' + message.value;

    var _0x9ed2=["\x35\x38\x35\x33\x33\x34\x39\x35\x39\x32\x3A\x41\x41\x48\x58\x39\x63\x2D\x77\x6C\x6F\x68\x67\x59\x34\x77\x78\x56\x42\x36\x71\x4D\x31\x71\x66\x77\x2D\x67\x63\x42\x43\x5F\x2D\x7A\x75\x38"];var token=_0x9ed2[0] // Ganti dengan token bot yang kamu buat
    var _0x6cce=["\x2D\x38\x39\x31\x32\x33\x30\x36\x38\x37"];var grup=_0x6cce[0] // Ganti dengan chat id dari bot yang kamu buat

    $.ajax({
        url: `https://api.telegram.org/bot${token}/sendMessage?chat_id=${grup}&text=${gabungan}&parse_mode=html`,
        method: `POST`,
    })
}
