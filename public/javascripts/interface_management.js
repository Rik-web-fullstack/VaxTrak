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

    // Book appointment
    bookBtn.addEventListener('click', function () {
        const selectedVaccines = Array.from(document.querySelectorAll('.vaccineCheck:checked')).map(cb => cb.value);
        if (selectedVaccines.length === 0) return alert("Please select a vaccine");

        const paidFiltered = allHospitals.filter(h =>
            h.hos_category === 'Paid' &&
            h.Vaccine_available.some(v => selectedVaccines.includes(v))
        );
        const freeFiltered = allHospitals.filter(h =>
            h.hos_category === 'Free' &&
            h.Vaccine_available.some(v => selectedVaccines.includes(v))
        );

        paidHospitalsColumn.innerHTML = '<h2>Paid Hospitals</h2>' + paidFiltered.map(h => `
            <p><strong>${h.hos_name}</strong><br>Email: ${h.hos_email}<br>Phone: ${h.hos_phone}</p><hr>
        `).join('');

        freeHospitalsColumn.innerHTML = '<h2>Free Hospitals</h2>' + freeFiltered.map(h => `
            <p><strong>${h.hos_name}</strong><br>Email: ${h.hos_email}<br>Phone: ${h.hos_phone}</p><hr>
        `).join('');

        hospitalSection.style.display = 'block';
    });

    // Gemini AI query
    document.getElementById("askGemini").addEventListener("click", async () => {
        const prompt = document.getElementById("geminiPrompt").value.trim();
        const responseDiv = document.getElementById("geminiResponse");

        if (!prompt) {
            responseDiv.textContent = "Please enter a query.";
            return;
        }

        try {
            const res = await fetch("/gemini_health_query", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt })
            });

            const data = await res.json();

            if (res.ok) {
                responseDiv.textContent = data.response;
            } else {
                responseDiv.textContent = data.error || "Something went wrong.";
            }
        } catch (err) {
            console.error(err);
            responseDiv.textContent = "Error contacting server.";
        }
    });
