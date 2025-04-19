function restartAnimation() {
    const name = document.getElementById('name');
    name.style.animation = 'none';
    name.offsetHeight; 
    name.style.animation = 'typing 2s steps(7) forwards, blink 0.5s step-end infinite';
  }

setTimeout(() => {
    window.location.href = "/register"; 
  }, 3000); 
  