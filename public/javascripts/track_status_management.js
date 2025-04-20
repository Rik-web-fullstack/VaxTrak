    const select = document.getElementById('memberSelect');
    const recommendedContainer = document.getElementById('recommendedVaccines');
    const bookBtn = document.getElementById('bookBtn');
    const hospitalSection = document.getElementById('hospitalSection');
    const paidHospitalsColumn = document.getElementById('paidHospitalsColumn');
    const freeHospitalsColumn = document.getElementById('freeHospitalsColumn');

    select.addEventListener('change', function () {
        const member = members[this.value];
        const age = parseInt(member.age);
        const recommended = recommendedMap[this.value]; // Get recommended vaccines based on selected member

        // Clear previous recommendations and render the new ones
        recommendedContainer.innerHTML = recommended.map(vaccine => {
            const alreadyTaken = member.vaccines_taken.includes(vaccine);
            return `
                <label>
                    <input type="checkbox" class="vaccineCheck" value="${vaccine}" ${alreadyTaken ? 'disabled' : ''}>
                    ${vaccine} ${alreadyTaken ? '(Already Taken)' : ''}
                </label><br>
            `;
        }).join('');

        // Display member details
        document.querySelectorAll('.memberData').forEach(div => div.style.display = 'none');
        document.getElementById('member-' + this.value).style.display = 'block';
  });

  document.getElementById("findHospitalsBtn").addEventListener("click", () => {
    const selectedVaccines = Array.from(document.querySelectorAll('.vaccineCheck:checked')).map(cb => cb.value);
    
    if (selectedVaccines.length === 0) {
      alert("Please select at least one vaccine.");
      return;
    }

    const query = selectedVaccines.map(v => `vaccines=${encodeURIComponent(v)}`).join('&');
    window.location.href = `/hospital?${query}`;
  });

// function confirmAppointment() {
//     const date = document.getElementById("date").value;
//     const time = document.getElementById("time").value;
//     const family = document.getElementById("memberSelect").selectedOptions[0].text;
//     const msg = document.getElementById("confirmationMsg");

//     if (date && time && family !== "Select a member") {
//         msg.textContent = `✅ Appointment booked for ${family} on ${date} at ${time}`;
//         msg.style.color = "#28a745";
//     } else {
//         msg.textContent = "⚠️ Please select family member, date and time.";
//         msg.style.color = "#dc3545";
//     }
// }
