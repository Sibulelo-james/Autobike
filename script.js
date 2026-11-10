document.addEventListener('DOMContentLoaded', () => {
  const yearNodes = document.querySelectorAll('#year');
  yearNodes.forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const forms = document.querySelectorAll('.enquiry-form');
  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#ffb4a2';
        } else {
          field.style.borderColor = 'rgba(255,255,255,0.15)';
        }
      });

      const status = form.querySelector('.form-status');
      if (!isValid) {
        status.textContent = 'Please complete all required fields before submitting.';
        status.style.color = '#ffd9a8';
        return;
      }

      status.textContent = 'Thank you! Your request has been received and our team will contact you soon.';
      status.style.color = '#d8f7dc';
      form.reset();
    });
  });
});
