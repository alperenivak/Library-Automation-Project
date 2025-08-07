// Login form handling
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const userType = document.getElementById('userType').value;

            // Redirect based on user type
            switch(userType) {
                case 'admin':
                    window.location.href = 'admin-dashboard.html';
                    break;
                case 'staff':
                    window.location.href = 'staff-dashboard.html';
                    break;
                case 'student':
                    window.location.href = 'student-dashboard.html';
                    break;
            }
        });
    }

    // Profile page form handling
    const personalInfoForm = document.getElementById('personalInfoForm');
    if (personalInfoForm) {
        personalInfoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically make an API call to update personal information
            alert('Kişisel bilgileriniz güncellendi!');
        });
    }

    const securityForm = document.getElementById('securityForm');
    if (securityForm) {
        securityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (newPassword !== confirmPassword) {
                alert('Yeni şifreler eşleşmiyor!');
                return;
            }

            // Here you would typically make an API call to update password
            alert('Şifreniz başarıyla güncellendi!');
            securityForm.reset();
        });
    }

    const notificationsForm = document.getElementById('notificationsForm');
    if (notificationsForm) {
        notificationsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically make an API call to update notification settings
            alert('Bildirim ayarlarınız güncellendi!');
        });
    }

    // Profile photo change handling
    const photoChangeBtn = document.querySelector('.btn-outline-primary');
    if (photoChangeBtn) {
        photoChangeBtn.addEventListener('click', function() {
            // Here you would typically implement file upload functionality
            alert('Fotoğraf değiştirme özelliği yakında eklenecek!');
        });
    }

    // Initialize charts if on admin dashboard
    const monthlyStats = document.getElementById('monthlyStats');
    if (monthlyStats) {
        new Chart(monthlyStats, {
            type: 'line',
            data: {
                labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
                datasets: [{
                    label: 'Ödünç Alınan Kitaplar',
                    data: [65, 59, 80, 81, 56, 55],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }

    const bookCategories = document.getElementById('bookCategories');
    if (bookCategories) {
        new Chart(bookCategories, {
            type: 'doughnut',
            data: {
                labels: ['Bilgisayar', 'Edebiyat', 'Tarih', 'Bilim', 'Diğer'],
                datasets: [{
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }

    // Book management functions
    window.saveBook = function() {
        const isbn = document.getElementById('isbn').value;
        const bookTitle = document.getElementById('bookTitle').value;
        const author = document.getElementById('author').value;
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;

        if (!isbn || !bookTitle || !author || !category) {
            alert('Lütfen tüm zorunlu alanları doldurun!');
            return;
        }

        // Here you would typically make an API call to save the book
        alert('Kitap başarıyla kaydedildi!');
        const modal = bootstrap.Modal.getInstance(document.getElementById('addBookModal'));
        modal.hide();
    };

    window.editBook = function(button) {
        const row = button.closest('tr');
        const isbn = row.cells[0].textContent;
        const bookTitle = row.cells[1].textContent;
        const author = row.cells[2].textContent;
        const category = row.cells[3].textContent;

        // Here you would typically populate a modal with the book details
        alert(`Kitap düzenleme: ${bookTitle}`);
    };

    window.deleteBook = function(button) {
        const row = button.closest('tr');
        const bookTitle = row.cells[1].textContent;

        if (confirm(`${bookTitle} kitabını silmek istediğinize emin misiniz?`)) {
            // Here you would typically make an API call to delete the book
            row.remove();
            alert('Kitap başarıyla silindi!');
        }
    };

    // Reservation management functions
    window.approveReservation = function(button) {
        const row = button.closest('tr');
        const studentName = row.cells[2].textContent;
        const bookName = row.cells[3].textContent;

        if (confirm(`${studentName} adlı öğrencinin ${bookName} kitabı için rezervasyon talebini onaylamak istediğinize emin misiniz?`)) {
            // Here you would typically make an API call to approve the reservation
            row.cells[6].innerHTML = '<span class="badge bg-success">Onaylandı</span>';
            row.cells[7].innerHTML = `
                <button class="btn btn-primary btn-sm" onclick="viewDetails(this)">
                    <i class="bi bi-eye"></i> Detay
                </button>
            `;
            alert('Rezervasyon onaylandı!');
        }
    };

    window.rejectReservation = function(button) {
        const row = button.closest('tr');
        const studentName = row.cells[2].textContent;
        const bookName = row.cells[3].textContent;

        if (confirm(`${studentName} adlı öğrencinin ${bookName} kitabı için rezervasyon talebini reddetmek istediğinize emin misiniz?`)) {
            // Here you would typically make an API call to reject the reservation
            row.cells[6].innerHTML = '<span class="badge bg-danger">Reddedildi</span>';
            row.cells[7].innerHTML = `
                <button class="btn btn-primary btn-sm" onclick="viewDetails(this)">
                    <i class="bi bi-eye"></i> Detay
                </button>
            `;
            alert('Rezervasyon reddedildi!');
        }
    };

    window.viewDetails = function(button) {
        const row = button.closest('tr');
        const reservationNumber = row.cells[0].textContent;
        const studentNumber = row.cells[1].textContent;
        const studentName = row.cells[2].textContent;
        const bookTitle = row.cells[3].textContent;
        const isbn = row.cells[4].textContent;
        const date = row.cells[5].textContent;
        const status = row.cells[6].querySelector('.badge').textContent;

        // Populate modal with reservation details
        document.getElementById('studentName').textContent = studentName;
        document.getElementById('studentNumber').textContent = studentNumber;
        document.getElementById('bookTitle').textContent = bookTitle;
        document.getElementById('bookIsbn').textContent = isbn;
        document.getElementById('reservationNumber').textContent = reservationNumber;
        document.getElementById('reservationDate').textContent = date;
        document.getElementById('reservationStatus').textContent = status;

        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById('reservationDetailsModal'));
        modal.show();
    };

    window.exportReservations = function() {
        // Here you would typically implement the export functionality
        alert('Rezervasyon listesi dışa aktarılıyor...');
    };

    // Book reservation handling
    const reserveButtons = document.querySelectorAll('.btn-primary');
    reserveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookTitle = this.closest('.card').querySelector('.card-title').textContent;
            if (confirm(`${bookTitle} kitabını rezerve etmek istediğinize emin misiniz?`)) {
                // Here you would typically make an API call to handle the reservation
                alert('Rezervasyon talebiniz alındı!');
            }
        });
    });
}); 