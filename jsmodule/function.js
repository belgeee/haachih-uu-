



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

            fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {

                        window.location.href = '/';
                    } else {

                        alert(data.message);
                    }
                })
            location.reload()
        });
    }
});

function getValueForFilter() {

    var huniiTooValue = document.getElementById('huniiToo').value;
    var oirhonGazarValue = document.getElementById('oirhonGazar').value;
    var typeValue = document.getElementById('type').value;


    var newUrl = "/letsgo" + "?address=" + oirhonGazarValue + "&category=" + typeValue + "&countPeople=" + huniiTooValue;
    window.location.href = newUrl;

}

function sideFilter() {
    var starValue = document.getElementById('star').value;
    var detailValue = document.getElementById('detail').value;

    var newUrl = "&star" + starValue + "&detail" + detailValue;
    window.location.href = newUrl;
}

