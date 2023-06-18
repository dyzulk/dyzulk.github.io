/*===== TELEGRAM BOT =====*/
function kirimPesan() {

    var nama = document.getElementById('name');
    var email = document.getElementById('email');
    var subject = document.getElementById('subject');
    var pesan = document.getElementById('message');

    var gabungan = '%F0%9D%90%8D%F0%9D%90%9A%F0%9D%90%A6%F0%9D%90%9A%20%3A%0A' + nama.value + '%0A%0A%F0%9D%90%84%F0%9D%90%A6%F0%9D%90%9A%F0%9D%90%A2%F0%9D%90%A5%20%3A%0A' + email.value + '%0A%0A%F0%9D%90%92%F0%9D%90%AE%F0%9D%90%9B%F0%9D%90%A3%F0%9D%90%9E%F0%9D%90%A4%20%3A%0A' + subject.value + '%0A%0A%F0%9D%90%8F%F0%9D%90%9E%F0%9D%90%AC%F0%9D%90%9A%F0%9D%90%A7%20%3A%0A' + message.value;

    var token = '6260715907:AAHYHXLrAwSjnUecHxLi0AC01k1FM0xbr8M'; // Ganti dengan token bot yang kamu buat
    var grup = '-836942032'; // Ganti dengan chat id dari bot yang kamu buat

    $.ajax({
        url: `https://api.telegram.org/bot${token}/sendMessage?chat_id=${grup}&text=${gabungan}`,
        method: `POST`,
    })
}
