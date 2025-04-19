function toggleFaq(element) {
    const answer = element.nextElementSibling;
    const isActive = element.classList.contains('active');
    
    // Close all FAQs
    const allQuestions = document.querySelectorAll('.faq-question');
    const allAnswers = document.querySelectorAll('.faq-answer');
    
    allQuestions.forEach(question => question.classList.remove('active'));
    allAnswers.forEach(answer => answer.classList.remove('show'));
    
    // Open the clicked FAQ if it wasn't open
    if (!isActive) {
      element.classList.add('active');
      answer.classList.add('show');
    }
  }
  
  // Initialize - make the first FAQ open by default
  document.addEventListener('DOMContentLoaded', function() {
    const firstQuestion = document.querySelector('.faq-question');
    const firstAnswer = document.querySelector('.faq-answer');
    
    if (firstQuestion && firstAnswer) {
      firstQuestion.classList.add('active');
      firstAnswer.classList.add('show');
    }
  });