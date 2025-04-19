// const bookBtn = document.getElementById('confirm');
// const hospitalSection = document.getElementById('hospitalSection');
// const paidHospitalsColumn = document.getElementById('paidHospitalsColumn');
// const freeHospitalsColumn = document.getElementById('freeHospitalsColumn');

// bookBtn.addEventListener('click', function () {
//     const selectedVaccines = Array.from(document.querySelectorAll('.vaccineCheck:checked')).map(cb => cb.value);
//     if (selectedVaccines.length === 0) return alert("Please select a vaccine");

//     const paidFiltered = allHospitals.filter(h =>
//         h.hos_category === 'Paid' &&
//         h.Vaccine_available.some(v => selectedVaccines.includes(v))
//     );
//     const freeFiltered = allHospitals.filter(h =>
//         h.hos_category === 'Free' &&
//         h.Vaccine_available.some(v => selectedVaccines.includes(v))
//     );

//     paidHospitalsColumn.innerHTML = '<h2>Paid Hospitals</h2>' + paidFiltered.map(h => `
//         <li><strong>${h.hos_name}</strong></li>
//     `).join('');

//     freeHospitalsColumn.innerHTML = '<h2>Free Hospitals</h2>' + freeFiltered.map(h => `
//         <li><strong>${h.hos_name}</strong></li>
//     `).join('');

//     hospitalSection.style.display = 'block';
// });

// const allHospitals = <%- JSON.stringify(paidHospitals.concat(freeHospitals)) %>;

// let selectedType = '';
// let selectedHospital = '';

// document.querySelectorAll('.hospital-list li').forEach(item => {
//   item.addEventListener('click', () => {
//     // Remove selection from all
//     document.querySelectorAll('.hospital-list li').forEach(li => {
//       li.classList.remove('selected');
//     });

//     // Add selected class to clicked one
//     item.classList.add('selected');

//     // Save selected hospital data
//     selectedType = item.dataset.type;
//     selectedHospital = item.dataset.name;

//     // Enable button
//     document.getElementById('proceedBtn').disabled = false;
//   });
// });

// document.getElementById('proceedBtn').addEventListener('click', () => {
//   if (!selectedHospital) {
//     alert("Please select a hospital first.");
//     return;
//   }

//   const query = `?type=${encodeURIComponent(selectedType)}&hospital=${encodeURIComponent(selectedHospital)}`;
//   window.location.href = `payment.html${query}`;
// });

const paidHospitalsColumn = document.getElementById('paidHospitalsColumn');
const freeHospitalsColumn = document.getElementById('freeHospitalsColumn');

// Fetch the hospitals from EJS (passed dynamically via JSON)


const allHospitals = <%- JSON.stringify(paidHospitals.concat(freeHospitals)) %>;

document.querySelectorAll('.vaccineCheck').forEach(checkbox => {
  checkbox.addEventListener('change', filterHospitalsByVaccine);
});

function filterHospitalsByVaccine() {
  const selectedVaccines = Array.from(document.querySelectorAll('.vaccineCheck:checked')).map(cb => cb.value);

  if (selectedVaccines.length === 0) {
    // If no vaccine is selected, reset the lists
    paidHospitalsColumn.innerHTML = '<h2>Paid Hospitals</h2>';
    freeHospitalsColumn.innerHTML = '<h2>Free Hospitals</h2>';
    return;
  }

  // Filter hospitals based on the selected vaccines and category
  const paidFiltered = allHospitals.filter(h =>
    h.hos_category === 'Paid' &&
    h.Vaccine_available.some(v => selectedVaccines.includes(v))
  );

  const freeFiltered = allHospitals.filter(h =>
    h.hos_category === 'Free' &&
    h.Vaccine_available.some(v => selectedVaccines.includes(v))
  );

  // Display filtered hospitals in their respective categories
  displayHospitals(paidFiltered, paidHospitalsColumn);
  displayHospitals(freeFiltered, freeHospitalsColumn);
}

function displayHospitals(hospitals, container) {
  // Clear the list and populate with filtered hospitals
  container.innerHTML = `<h2>${container === paidHospitalsColumn ? 'Paid' : 'Free'} Hospitals</h2>`;
  if (hospitals.length === 0) {
    container.innerHTML += '<p>No hospitals found for the selected vaccines.</p>';
  } else {
    container.innerHTML += hospitals.map(h => `
      <li onclick="selectHospital('${h.hos_category}', '${h.hos_name}')">
        <strong>${h.hos_name}</strong>
      </li>
    `).join('');
  }
}

// Hospital selection logic (same as before)
let selectedType = '';
let selectedHospital = '';

function selectHospital(type, name) {
  // Remove all existing selections
  document.querySelectorAll('.hospital-list li').forEach(li => {
    li.classList.remove('selected');
  });

  // Find the clicked item and mark it selected
  const matchingLi = Array.from(document.querySelectorAll('.hospital-list li'))
    .find(li => li.textContent.trim() === name);

  if (matchingLi) {
    matchingLi.classList.add('selected');
  }

  // Save selected hospital info
  selectedType = type;
  selectedHospital = name;

  // Enable button
  document.getElementById('proceedBtn').disabled = false;
}

function goToPayment() {
  if (!selectedHospital) {
    alert("Please select a hospital first.");
    return;
  }

  const query = `?type=${encodeURIComponent(selectedType)}&hospital=${encodeURIComponent(selectedHospital)}`;
  window.location.href = `payment.html${query}`;
}
