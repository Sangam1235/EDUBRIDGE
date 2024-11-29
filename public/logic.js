// 1. Functions to load PDFs into the viewer
function loadPart1() {
  const viewer = document.getElementById("pdf-viewer");
  viewer.src = "assets/part1quad.pdf";
}

function loadPart2() {
  const viewer = document.getElementById("pdf-viewer");
  viewer.src = "assets/part2quad.pdf";
}

function loadPart3() {
  const viewer = document.getElementById("pdf-viewer");
  viewer.src = "assets/part3quad.pdf";
}

function loadPart4() {
  const viewer = document.getElementById("pdf-viewer");
  viewer.src = "assets/part4quad.pdf";
}

// 2. Functions to load flashcards for each part (Questions stored in the JS file)
function loadFlashcardsPart1() {
  const questionsPart1 = [
    { question: "What is a quadratic equation?", answer: "An equation where the variable is of the second degree, also called an equation of degree 2." },
    { question: "What is the general form of a quadratic equation?", answer: "ax² + bx + c = 0, where a, b, and c are constants, and a ≠ 0" },
    { question: "How do we interpret the discriminant?", answer: "If D > 0, two real roots; D = 0, one real root; D < 0, no real roots (complex roots)." },
    { question: " Who published the modern formula for solving quadratic equations?", answer: "René Descartes published it in 1637 in La Géométrie." }
  ];
  displayFlashcards(questionsPart1);
}

function loadFlashcardsPart2() {
  const questionsPart2 = [
    { question: "What determines the nature of the roots of a quadratic equation?", answer: "The discriminant,D=b^2-4ac, determines the nature of the roots." },
    { question: " What are the roots of a quadratic equation when b^2-4ac>0 and is a perfect square?", answer: "The roots are real, rational, and unequal." },
    { question: "When are the roots of a quadratic equation imaginary?", answer: "When b^2-4a0, the roots are imaginary." },
    { question: "What is the number of roots of a quadratic equation, and why?", answer: "A quadratic equation has 2 roots because its degree is 2" }
  ];
  displayFlashcards(questionsPart2);
}
function loadFlashcardsPart3() {
  const questionsPart3 = [
    { question: "What is the sum of the roots of a quadratic equation ax^2+bx+c=0?", answer: "The sum of the roots is -b/a." },
    { question: "What is the product of the roots of a quadratic equation ax^2+bx+c=0?", answer: "The product of the roots is c/a." },
    { question: "How can a quadratic equation be expressed in terms of its roots?", answer: "x^2-(sum of roots)x+(products of roots)=0" },
    { question: "What is the first step in solving a quadratic equation using the completing the square method?", answer: "Make the coefficient of x^2 equal to 1." }
  ];
  displayFlashcards(questionsPart3);
}
function loadFlashcardsPart4() {
  const questionsPart4 = [
    { question: "How are these equations used in projectile motion?", answer: " They model the path of projectiles to predict maximum height, distance  and  position." },
    { question: "How do quadratic equations help businesses optimize profits?", answer: "They determine optimal production volume and pricing strategies." },
    { question: "What role do quadratic equations play in designing satellite dishes and telescopes?", answer: "They define the curved shapes for efficient signal reception." },
    { question: "How are quadratic equations applied in bridge and arch construction?", answer: "They calculate load-bearing capacity and stress distribution for stability." }
  ];
  displayFlashcards(questionsPart4);
}




// 3. Function to display flashcards
function displayFlashcards(questions) {
  const container = document.getElementById("flashcard-container");
  container.innerHTML = ""; // Clear existing flashcards

  questions.forEach((q, index) => {
    const card = document.createElement("div");
    card.className = "flashcard"; // Add CSS styling for flashcards

    // Adding question and answer
    card.innerHTML = `
      <p><strong>Q${index + 1}: ${q.question}</strong></p>
      <p class="answer" style="display: none;">${q.answer}</p>
      <button onclick="toggleFlashcardAnswer(this)">Show Answer</button>
    `;

    container.appendChild(card);
  });
}

// 4. Function to toggle flashcard answer visibility
function toggleFlashcardAnswer(button) {
  const answer = button.previousElementSibling; // Get the <p> containing the answer
  if (answer.style.display === "none") {
    answer.style.display = "block";
    button.textContent = "Hide Answer";
  } else {
    answer.style.display = "none";
    button.textContent = "Show Answer";
  }
}