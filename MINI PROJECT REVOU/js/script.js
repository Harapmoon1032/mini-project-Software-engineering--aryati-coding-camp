document.addEventListener('DOMContentLoaded', function () {
    let userName = sessionStorage.getItem('guestName');
    const nameSpan = document.getElementById('dynamic-name');
    const nameModal = document.getElementById('name-modal');
    const nameInput = document.getElementById('visitor-name-input');
    const nameSubmit = document.getElementById('name-submit');

    function updateGreeting(name) {
        if (nameSpan) {
            nameSpan.textContent = name;
        }
    }

    function showModal() {
        if (nameModal) {
            nameModal.classList.add('active');
        }
    }

    function hideModal() {
        if (nameModal) {
            nameModal.classList.remove('active');
        }
    }

    if (!userName) {
        showModal();
    } else {
        updateGreeting(userName);
    }

    if (nameSubmit && nameInput) {
        nameSubmit.addEventListener('click', function () {
            let name = nameInput.value.trim();
            if (name === '') {
                name = 'Aryati'; 
            }
            sessionStorage.setItem('guestName', name);
            updateGreeting(name);
            hideModal();
        });

        nameInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                nameSubmit.click();
            }
        });
    }

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
            });
        });
    }

    const form = document.getElementById('message-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

           
            clearErrors();

            const nama = document.getElementById('nama').value.trim();
            const tanggalLahir = document.getElementById('tanggal-lahir').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const jenisKelamin = document.querySelector('input[name="jenis-kelamin"]:checked');
            const pesan = document.getElementById('pesan').value.trim();

            let isValid = true;

            
            if (!nama) {
                showError('nama', 'Nama wajib diisi');
                isValid = false;
            }

           
            if (!tanggalLahir) {
                showError('tanggal-lahir', 'Tanggal lahir wajib diisi');
                isValid = false;
            }

          
            if (!email) {
                showError('email', 'Email wajib diisi');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Format email tidak valid');
                isValid = false;
            }

        
            if (!phone) {
                showError('phone', 'Nomor telepon wajib diisi');
                isValid = false;
            } else if (!isValidPhone(phone)) {
                showError('phone', 'Format nomor telepon tidak valid');
                isValid = false;
            }

           
            if (!jenisKelamin) {
                showError('gender-group', 'Jenis kelamin wajib dipilih');
                isValid = false;
            }


            if (!pesan) {
                showError('pesan', 'Pesan wajib diisi');
                isValid = false;
            }

            if (isValid) {
                displayResult({
                    nama: nama,
                    tanggalLahir: tanggalLahir,
                    email: email,
                    phone: phone,
                    jenisKelamin: jenisKelamin.value,
                    pesan: pesan
                });
            }
        });
    }
});


function isValidEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    var re = /^[0-9+\-\s()]{7,20}$/;
    return re.test(phone);
}

function showError(fieldId, message) {
    var field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('error');
        var errorEl = field.parentElement.querySelector('.error-text');
        if (!errorEl) {
            errorEl = document.createElement('span');
            errorEl.className = 'error-text';
            field.parentElement.appendChild(errorEl);
        }
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(function (el) {
        el.classList.remove('error');
    });
    document.querySelectorAll('.error-text').forEach(function (el) {
        el.style.display = 'none';
    });
}

function displayResult(data) {
    var resultBox = document.getElementById('result-box');
    if (!resultBox) return;

    resultBox.classList.remove('empty');
    var currentTime = new Date().toString();

    resultBox.innerHTML =
        '<div class="result-time">Current Time : ' + currentTime + '</div>' +
        '<div class="result-data">' +
        '<p><strong>Nama : </strong>' + escapeHtml(data.nama) + '</p>' +
        '<p><strong>Tanggal Lahir : </strong>' + escapeHtml(data.tanggalLahir) + '</p>' +
        '<p><strong>Email : </strong>' + escapeHtml(data.email) + '</p>' +
        '<p><strong>Phone : </strong>' + escapeHtml(data.phone) + '</p>' +
        '<p><strong>Jenis Kelamin : </strong>' + escapeHtml(data.jenisKelamin) + '</p>' +
        '<p><strong>Pesan : </strong>' + escapeHtml(data.pesan) + '</p>' +
        '</div>';
}

function escapeHtml(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}
