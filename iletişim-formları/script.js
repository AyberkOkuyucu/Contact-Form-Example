document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.container-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    // Hataları temizle
    document.querySelectorAll('.error-message').forEach(el => {
      el.style.display = 'none';
    });

    // Normal borderlara geri dön
    document.querySelectorAll('input, textarea').forEach(el => {
      el.style.borderColor = '#cbd5d1';
    });

    // Radio buton kutularını da sıfırla
    document.querySelectorAll('.radio-option').forEach(option => {
      option.style.borderColor = 'gray';
    });

    // Alanları al
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const queryType = document.querySelector('input[name="queryType"]:checked');
    const queryGroup = document.querySelector('.radio-group');
    const message = document.getElementById('message');
    const consent = document.getElementById('consent');

    // First Name
    if (firstName.value.trim() === '') {
      showError(firstName, 'This field is required');
      isValid = false;
    }

    // Last Name
    if (lastName.value.trim() === '') {
      showError(lastName, 'This field is required');
      isValid = false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      showError(email, 'Please enter a valid email address');
      isValid = false;
    }

    // Query Type
    if (!queryType) {
      showError(queryGroup, 'Please select a query type');
      isValid = false;
    }

    // Message
    if (message.value.trim() === '') {
      showError(message, 'This field is required');
      isValid = false;
    }

    // Consent
    if (!consent.checked) {
      showError(consent, 'You must consent to be contacted');
      isValid = false;
    }

    // ✅ Burası sadece tüm alanlar doluysa çalışır
    if (isValid) {
      form.reset();

      const alertBox = document.getElementById("success-alert");
      alertBox.style.display = "block";

      setTimeout(() => {
        alertBox.style.display = "none";
      }, 3000);
    }
  });

  function showError(inputElement, message) {
    const formGroup = inputElement.closest('.form-group')
                    || inputElement.closest('.checkbox-group')
                    || inputElement.closest('.radio-group');

    const errorDiv = formGroup?.querySelector('.error-message');

    // Eğer radio group ise, içindeki tüm radio-option'lara kırmızı border ver
    if (formGroup && formGroup.querySelectorAll('.radio-option').length > 0) {
      const options = formGroup.querySelectorAll('.radio-option');
      options.forEach(option => {
        option.style.borderColor = '#DB3A34';
      });
    }

    // Diğer inputlar için kırmızı border
    if (inputElement.tagName !== 'DIV') {
      inputElement.style.borderColor = '#DB3A34';
    }

    // Hata mesajını göster
    if (errorDiv) {
      errorDiv.innerText = message;
      errorDiv.style.display = 'block';
    }
  }
});
