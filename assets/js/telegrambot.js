function kirimPesan() {

    var nama = document.getElementById('name');
    var email = document.getElementById('email');
    var email = document.getElementById('subject');
    var pesan = document.getElementById('message');

    var gabungan = 'Nama%3A%0A' + name.value + '%0AEmail%3A%0A' + email.value + '%0ASubject%3A%0A' + subject.value + '%0APesan%3A%0A' + message.value;

    var token = '6260715907:AAHYHXLrAwSjnUecHxLi0AC01k1FM0xbr8M'; // Ganti dengan token bot yang kamu buat
    var grup = '-836942032'; // Ganti dengan chat id dari bot yang kamu buat

    $.ajax({
        url: `https://api.telegram.org/bot${token}/sendMessage?chat_id=${grup}&text=${gabungan}&parse_mode=html`,
        method: `POST`,
    })
}
