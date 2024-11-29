// Initialize SpeechSynthesis API
const synth = window.speechSynthesis;

// Map for special character pronunciation
const specialCharacterNames = {
    '!': 'exclamation mark',
    '@': 'at symbol',
    '#': 'hash',
    '$': 'dollar',
    '%': 'percent',
    '^': 'caret',
    '&': 'ampersand',
    '*': 'asterisk',
    '(': 'open parenthesis',
    ')': 'close parenthesis',
    '-': 'hyphen',
    '_': 'underscore',
    '+': 'plus',
    '=': 'equals',
    '{': 'open curly brace',
    '}': 'close curly brace',
    '[': 'open square bracket',
    ']': 'close square bracket',
    '|': 'vertical bar',
    '\\': 'backslash',
    ':': 'colon',
    ';': 'semicolon',
    '"': 'double quote',
    "'": 'single quote',
    '<': 'less than',
    '>': 'greater than',
    ',': 'comma',
    '.': 'period',
    '?': 'question mark',
    '/': 'slash',
    '`': 'backtick',
    '~': 'tilde',
    ' ': 'space' // Add space character
};

// Helper function to read text aloud
function readText(text) {
    if (synth.speaking) {
        synth.cancel(); // Stop any ongoing speech to avoid overlap
    }
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

// Function to get character pronunciation
function getCharacterName(char) {
    return specialCharacterNames[char] || char; // Fallback to the character itself
}

// Add global click event listener for full-page readability
document.body.addEventListener('click', (event) => {
    const target = event.target;

    // If the clicked element has meaningful text, read it
    if (target.tagName === 'BUTTON' || target.tagName === 'TEXTAREA' || target.tagName === 'P' || target.tagName === 'H1' || target.classList.contains('comment')) {
        const textToRead = target.innerText || target.placeholder || target.getAttribute('aria-label');
        if (textToRead) {
            readText(textToRead);
        }
    }
});

// Event listener for the submit button
document.getElementById('submitComment').addEventListener('click', function () {
    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value.trim();

    if (commentText) {
        const commentSection = document.getElementById('commentSection');
        
        // Remove "no comments" message if it's present
        const noCommentsMessage = document.querySelector('.no-comments');
        if (noCommentsMessage) {
            noCommentsMessage.remove();
        }

        // Create a new comment element
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.textContent = commentText;

        // Add the comment to the section
        commentSection.appendChild(commentDiv);

        // Clear the input field
        commentInput.value = '';

        // Provide spoken feedback for adding a comment
        readText("Comment added successfully.");
    } else {
        // Speak error message
        readText("Please enter a comment!");
        alert('Please enter a comment!');
    }
});

// Real-time reading of alphabets, special characters, and spaces typed in the textarea
document.getElementById('commentInput').addEventListener('input', (event) => {
    const inputField = event.target;
    const currentValue = inputField.value;

    if (currentValue.length > 0) {
        // Get the last typed character
        const lastChar = currentValue.slice(-1);
        const characterToRead = getCharacterName(lastChar); // Get pronunciation
        readText(characterToRead);
    }
});