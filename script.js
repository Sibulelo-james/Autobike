document.addEventListener('DOMContentLoaded', () => {
  const yearNodes = document.querySelectorAll('#year');
  yearNodes.forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const categoryValues = {
    brakes: 3490,
    lighting: 1890,
    gear: 5640,
    maintenance: 620,
    performance: 4799,
  };

  const priceInput = document.getElementById('priceInput');
  const depositInput = document.getElementById('depositInput');
  const categorySelect = document.getElementById('categorySelect');
  const termInput = document.getElementById('termInput');
  const estimateValue = document.getElementById('estimateValue');
  const calculateBtn = document.getElementById('calculateBtn');

  const updateDefaultPrice = () => {
    const selected = categorySelect.value;
    const defaultPrice = categoryValues[selected] || 0;
    if (!priceInput.dataset.userEdited) {
      priceInput.value = defaultPrice;
    }
  };

  categorySelect.addEventListener('change', () => {
    priceInput.dataset.userEdited = 'false';
    updateDefaultPrice();
  });

  priceInput.addEventListener('input', () => {
    priceInput.dataset.userEdited = 'true';
  });

  calculateBtn.addEventListener('click', () => {
    const basePrice = Number(priceInput.value) || 0;
    const deposit = Number(depositInput.value) || 0;
    const term = Number(termInput.value) || 1;
    const financed = Math.max(basePrice - deposit, 0);
    const monthly = financed / term;
    const finalMonthly = monthly * 1.07;

    estimateValue.textContent = `R ${finalMonthly.toLocaleString('en-ZA', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  });

  updateDefaultPrice();

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
