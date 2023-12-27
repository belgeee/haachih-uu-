function getValueForFilter() {
  // Get selected values
  var huniiTooValue = document.getElementById('huniiToo').value;
  var oirhonGazarValue = document.getElementById('oirhonGazar').value;
  var typeValue = document.getElementById('type').value;

  // Display selected values
  var newUrl = "/letsgo" +  "?address=" + oirhonGazarValue + "&category=" + typeValue+"&countPeople=" + huniiTooValue;
  window.location.href = newUrl;
}
  




function changeColor() {
    var button = document.querySelector('.like');
    
    if (button.style.color === 'red') {
        button.style.color = 'black';
    } else {
        button.style.color = 'red';
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logoutButton');

    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            // Ketika tombol "Logout" diklik, kirim permintaan POST ke /logout
            fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Jika logout berhasil, arahkan ke halaman login atau halaman lain yang sesuai.
                        window.location.href = '/'; // Ganti '/login' dengan URL halaman login yang sesuai.
                    } else {
                        // Jika logout gagal, tampilkan pesan kesalahan atau sesuaikan tindakan lain yang sesuai.
                        alert(data.message);
                    }
                })
            location.reload()
        });
    }
});