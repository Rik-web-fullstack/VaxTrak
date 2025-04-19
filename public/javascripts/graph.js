const ctx = document.getElementById('benefitChart').getContext('2d');

    const vaccineChart = new Chart(ctx, {
      type: 'doughnut',  // Doughnut gives a better 3D illusion than pie
      data: {
        labels: ['Disease Prevention', 'Reduced Hospitalizations', 'Herd Immunity'],
        datasets: [{
          data: [0, 0, 0], // Start from 0 for "real-time loading" effect
          backgroundColor: ['#ef476f', '#ffd166', '#06d6a0'],
          borderColor: '#1f2a38',
          borderWidth: 5,
          hoverOffset: 15
        }]
      },
      options: {
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 3000, // Slow and smooth
          onComplete: function() {
            console.log("Chart animation finished!");
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Vaccine Benefits Breakdown',
            color: '#dde6ed',
            font: {
              size: 18
            }
          },
          legend: {
            labels: {
              color: '#dde6ed',
              font: {
                size: 14
              }
            }
          }
        }
      }
    });

    setTimeout(() => {
      vaccineChart.data.datasets[0].data = [50, 30, 20];
      vaccineChart.update();
    }, 1000);