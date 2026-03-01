document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bmi-form');
  const resultDiv = document.getElementById('result');
  const bmiValueEl = document.getElementById('bmi-value');
  const categoryEl = document.getElementById('category');
  const messageEl = document.getElementById('message');
  const adviceEl = document.getElementById('advice');
  const weightUnit = document.getElementById('weight-unit');
  const heightUnit = document.getElementById('height-unit');

  const unitRadios = document.querySelectorAll('input[name="unit"]');

  // Update units when toggle changes
  unitRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'metric') {
        weightUnit.textContent = 'kg';
        heightUnit.textContent = 'cm';
      } else {
        weightUnit.textContent = 'lbs';
        heightUnit.textContent = 'in';
      }
      // Optional: clear previous result on unit change
      resultDiv.classList.add('hidden');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let weight = parseFloat(document.getElementById('weight').value);
    let height = parseFloat(document.getElementById('height').value);
    const unit = document.querySelector('input[name="unit"]:checked').value;

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      alert('Please enter valid positive numbers.');
      return;
    }

    // Convert to metric if imperial
    if (unit === 'imperial') {
      weight = weight * 0.453592;      // lbs → kg
      height = height * 0.0254;        // inches → meters
    } else {
      height = height / 100;           // cm → meters
    }

    const bmi = weight / (height * height);
    const roundedBmi = Math.round(bmi * 100) / 100;  // 2 decimals

    let category = '';
    let message = '';
    let advice = '';
    let badgeClass = '';

    if (roundedBmi < 18.5) {
      category = 'Underweight';
      message = 'Your BMI indicates you are underweight.';
      advice = 'Consider consulting a doctor or nutritionist to gain healthy weight.';
      badgeClass = 'underweight';
    } else if (roundedBmi < 25) {
      category = 'Normal';
      message = 'Your BMI is in the healthy range.';
      advice = 'Keep up the good habits — maintain a balanced diet and regular activity.';
      badgeClass = 'normal';
    } else if (roundedBmi < 30) {
      category = 'Overweight';
      message = 'Your BMI indicates overweight.';
      advice = 'Small lifestyle changes can help reach a healthier range.';
      badgeClass = 'overweight';
    } else {
      category = 'Obese';
      message = 'Your BMI indicates obesity.';
      advice = 'It’s recommended to speak with a healthcare professional for personalized guidance.';
      badgeClass = 'obese';
    }

    bmiValueEl.textContent = roundedBmi;
    categoryEl.textContent = category;
    categoryEl.className = 'category-badge ' + badgeClass;
    messageEl.textContent = message;
    adviceEl.textContent = advice;

    resultDiv.classList.remove('hidden');
  });
});