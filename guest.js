// Guest Login Validation
function guestLogin() {
    const guestName = document.getElementById('guest-name').value;
    const guestGrade = document.getElementById('guest-grade').value;

    if (guestName && guestGrade === "12-advanced") {
        localStorage.setItem("guestName", guestName); // Save name for session
        window.location.href = "guest-dashboard.html";
    } else {
        alert("Currently, only Grade 12 Advanced is available.");
    }
}

// Show selected feature for the guest
function showFeature(feature) {
    const featureContent = document.getElementById('feature-content');
    featureContent.innerHTML = ""; // Clear previous content

    if (feature === "eotResources") {
        featureContent.innerHTML = "<h2>EOT Resources</h2><div id='resource-list'></div>";
        displayResources();
    } else if (feature === "eotPptx") {
        featureContent.innerHTML = "<h2>EOT PPTX Files</h2><div id='pptx-list'></div>";
        displayPptx();
    } else if (feature === "eotPractice") {
        featureContent.innerHTML = `
            <h2>EOT Practice Smart System</h2>
            <div id='question-container'></div>
            <div id='feedback' class='hidden'></div>
            <button id='next-button' class='hidden' onclick='loadNextQuestion()'>Next Question</button>
        `;
        startPractice();
    }
}

// Display resources and PPTX files for guests
function displayResources() {
    const resources = JSON.parse(localStorage.getItem("resources")) || [];
    const resourceList = document.getElementById("resource-list");

    if (resources.length === 0) {
        resourceList.innerHTML = "<p>No resources available.</p>";
    } else {
        resourceList.innerHTML = resources.map(resource => `
            <a href="${resource.link}" target="_blank">${resource.name}</a>
        `).join("<br>");
    }
}

function displayPptx() {
    const pptxFiles = JSON.parse(localStorage.getItem("pptxFiles")) || [];
    const pptxList = document.getElementById("pptx-list");

    if (pptxFiles.length === 0) {
        pptxList.innerHTML = "<p>No PPTX files available.</p>";
    } else {
        pptxList.innerHTML = pptxFiles.map(file => `
            <a href="${file.link}" target="_blank">${file.name}</a>
        `).join("<br>");
    }
}

// EOT Practice System for guests
let currentQuestionIndex = 0;
let score = 0;

function startPractice() {
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    currentQuestionIndex = 0;
    score = 0;

    if (questions.length > 0) {
        loadQuestion();
    } else {
        document.getElementById('question-container').innerHTML = "<p>No questions available for practice.</p>";
    }
}

function loadQuestion() {
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    const questionContainer = document.getElementById('question-container');
    const feedback = document.getElementById('feedback');
    const nextButton = document.getElementById('next-button');

    feedback.classList.add('hidden');
    nextButton.classList.add('hidden');

    if (questions[currentQuestionIndex]) {
        const question = questions[currentQuestionIndex];
        questionContainer.innerHTML = `
            <p>${question.text}</p>
            ${question.options.map((opt, index) => `
                <button onclick="checkAnswer(${index + 1})">${opt}</button>
            `).join('')}
        `;
    } else {
        questionContainer.innerHTML = `<p>Practice completed! Your score: ${score}</p>`;
    }
}

function checkAnswer(selectedOption) {
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    const question = questions[currentQuestionIndex];
    const feedback = document.getElementById('feedback');
    const nextButton = document.getElementById('next-button');

    if (selectedOption == question.correctAnswer) {
        score += 10;
        feedback.textContent = "Correct! Move to the next question.";
    } else {
        feedback.textContent = "Incorrect. Try again.";
    }
    feedback.classList.remove('hidden');
    nextButton.classList.remove('hidden');
}

function loadNextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}
