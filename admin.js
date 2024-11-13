// Admin Login Validation
function validateAdmin() {
    const adminName = document.getElementById('admin-name').value;
    const adminCode = document.getElementById('admin-code').value;

    if (adminName === "mohammed-almarzooqi" && adminCode === "HBR#1228") {
        window.location.href = "admin-dashboard.html";
    } else {
        alert("Invalid Admin Name or Code. Please try again.");
    }
}

// Show the selected feature for the admin
function showFeature(feature) {
    const featureContent = document.getElementById('feature-content');
    featureContent.innerHTML = ""; // Clear previous content

    if (feature === "resources") {
        featureContent.innerHTML = `
            <h2>Upload Resources</h2>
            <input type="text" id="resourceName" placeholder="Resource Name">
            <input type="url" id="resourceLink" placeholder="Resource Link">
            <button onclick="addResource()">Add Resource</button>
            <div id="resource-list"></div>
        `;
        displayResources();
    } else if (feature === "pptx") {
        featureContent.innerHTML = `
            <h2>Upload PPTX Files</h2>
            <input type="text" id="pptxName" placeholder="PPTX Name">
            <input type="url" id="pptxLink" placeholder="PPTX Link">
            <button onclick="addPptx()">Add PPTX</button>
            <div id="pptx-list"></div>
        `;
        displayPptx();
    } else if (feature === "practiceSystem") {
        featureContent.innerHTML = `
            <h2>Manage EOT Practice Questions</h2>
            <textarea id="question-text" placeholder="Enter question text"></textarea>
            <div id="options">
                <input type="text" id="option1" placeholder="Option 1">
                <input type="text" id="option2" placeholder="Option 2">
                <input type="text" id="option3" placeholder="Option 3">
                <input type="text" id="option4" placeholder="Option 4">
            </div>
            <select id="correct-option">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
            </select>
            <button onclick="addQuestion()">Add Question</button>
            <div id="question-list"></div>
        `;
        displayQuestions();
    }
}

// Functions for uploading and displaying resources and PPTX files
function addResource() {
    const resourceName = document.getElementById('resourceName').value;
    const resourceLink = document.getElementById('resourceLink').value;
    const resources = JSON.parse(localStorage.getItem("resources")) || [];

    if (resourceName && resourceLink) {
        resources.push({ name: resourceName, link: resourceLink });
        localStorage.setItem("resources", JSON.stringify(resources));
        displayResources();
    } else {
        alert("Please fill in both fields.");
    }
}

function displayResources() {
    const resources = JSON.parse(localStorage.getItem("resources")) || [];
    const resourceList = document.getElementById("resource-list");

    if (resources.length === 0) {
        resourceList.innerHTML = "<p>No resources available.</p>";
    } else {
        resourceList.innerHTML = resources.map(resource => `<a href="${resource.link}" target="_blank">${resource.name}</a>`).join("<br>");
    }
}

function addPptx() {
    const pptxName = document.getElementById('pptxName').value;
    const pptxLink = document.getElementById('pptxLink').value;
    const pptxFiles = JSON.parse(localStorage.getItem("pptxFiles")) || [];

    if (pptxName && pptxLink) {
        pptxFiles.push({ name: pptxName, link: pptxLink });
        localStorage.setItem("pptxFiles", JSON.stringify(pptxFiles));
        displayPptx();
    } else {
        alert("Please fill in both fields.");
    }
}

function displayPptx() {
    const pptxFiles = JSON.parse(localStorage.getItem("pptxFiles")) || [];
    const pptxList = document.getElementById("pptx-list");

    if (pptxFiles.length === 0) {
        pptxList.innerHTML = "<p>No PPTX files available.</p>";
    } else {
        pptxList.innerHTML = pptxFiles.map(file => `<a href="${file.link}" target="_blank">${file.name}</a>`).join("<br>");
    }
}

// EOT Practice Question Management
function addQuestion() {
    const questionText = document.getElementById('question-text').value;
    const options = [
        document.getElementById('option1').value,
        document.getElementById('option2').value,
        document.getElementById('option3').value,
        document.getElementById('option4').value,
    ];
    const correctAnswer = document.getElementById('correct-option').value;
    const questions = JSON.parse(localStorage.getItem("questions")) || [];

    if (questionText && options.every(opt => opt)) {
        questions.push({ text: questionText, options, correctAnswer });
        localStorage.setItem("questions", JSON.stringify(questions));
        displayQuestions();
    } else {
        alert("Please fill in all fields.");
    }
}

function displayQuestions() {
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    const questionList = document.getElementById("question-list");

    if (questions.length === 0) {
        questionList.innerHTML = "<p>No questions added yet.</p>";
    } else {
        questionList.innerHTML = questions.map((q, index) => `
            <p>Q${index + 1}: ${q.text}</p>
            <ul>${q.options.map((opt, idx) => `<li>${idx + 1}. ${opt}</li>`).join("")}</ul>
        `).join("");
    }
}
// Ensure admin dashboard shows correct feature
function validateAdmin() {
    const adminName = document.getElementById('admin-name').value;
    const adminCode = document.getElementById('admin-code').value;

    if (adminName === "mohammed-almarzooqi" && adminCode === "HBR#1228") {
        window.location.href = "admin-dashboard.html";
    } else {
        alert("Invalid Admin Name or Code. Please try again.");
    }
}

// Add questions to local storage for guests
function addQuestion() {
    const questionText = document.getElementById('question-text').value;
    const options = [
        document.getElementById('option1').value,
        document.getElementById('option2').value,
        document.getElementById('option3').value,
        document.getElementById('option4').value,
    ];
    const correctAnswer = document.getElementById('correct-option').value;
    const questions = JSON.parse(localStorage.getItem("questions")) || [];

    if (questionText && options.every(opt => opt)) {
        questions.push({ text: questionText, options, correctAnswer });
        localStorage.setItem("questions", JSON.stringify(questions));
        displayQuestions();
    } else {
        alert("Please fill in all fields.");
    }
}

function displayQuestions() {
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    const questionList = document.getElementById("question-list");

    if (questions.length === 0) {
        questionList.innerHTML = "<p>No questions added yet.</p>";
    } else {
        questionList.innerHTML = questions.map((q, index) => `
            <p>Q${index + 1}: ${q.text}</p>
            <ul>${q.options.map((opt, idx) => `<li>${idx + 1}. ${opt}</li>`).join("")}</ul>
        `).join("");
    }
}
