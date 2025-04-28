//redundant for now

document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById('category-container');
    const randomBtn = document.getElementById('randomQuizBtn');
  
    // load questions
    fetch('../data/questions.json')
      .then(res => {
        if (!res.ok) throw new Error('Could not load questions.json');
        return res.json();
      })
      .then(data => {
        //keys are categ names
        const categories = Object.keys(data);
  
        // generate button for each
        categories.forEach(cat => {
          const btn = document.createElement('button');
          btn.textContent = cat;
          btn.classList.add('category-btn');
          btn.addEventListener('click', () => startQuiz(cat));
          container.appendChild(btn);
        });
  
        //call rand quiz
        randomBtn.addEventListener('click', () => {
          const randomCat = categories[Math.floor(Math.random() * categories.length)];
          startQuiz(randomCat);
        });
      })
      .catch(err => console.error(err));
  });
  
  //replace
  function startQuiz(category) {
    //save to storage and redirect
    sessionStorage.setItem('selectedCategory', category);
    window.location.href = 'quiz.html';
  }
  