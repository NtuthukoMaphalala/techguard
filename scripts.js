document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isVisible = answer.style.display === 'block';

        // Hide all other answers
        document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');

        // Toggle current answer
        answer.style.display = isVisible ? 'none' : 'block';
    });
});
