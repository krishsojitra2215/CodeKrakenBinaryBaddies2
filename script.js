// Sample user data for demonstration (replace with your authentication logic)
const users = [
    { username: 'user1', password: 'password1', name: 'User One', email: 'user1@example.com' },
    { username: 'user2', password: 'password2', name: 'User Two', email: 'user2@example.com' }
];

let currentUser = null; // Current user (null if not logged in)
const chatMessages = []; // Store chat messages
const globalChatMessages = []; // Store global chat messages
const friendsList = []; // Store friends list

// Helper function to update the chat window
function updateChatWindow() {
    const chatMessagesDiv = document.getElementById('chat-messages');
    chatMessagesDiv.innerHTML = '';
    chatMessages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatMessagesDiv.appendChild(messageElement);
    });
}

// Helper function to update the global chat window
function updateGlobalChatWindow() {
    const globalChatMessagesDiv = document.getElementById('global-chat-messages');
    globalChatMessagesDiv.innerHTML = '';
    globalChatMessages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        globalChatMessagesDiv.appendChild(messageElement);
    });
}

// Helper function to update the friends list
function updateFriendsList() {
    const friendList = document.getElementById('friend-list');
    friendList.innerHTML = '';
    friendsList.forEach(friend => {
        const listItem = document.createElement('li');
        listItem.textContent = friend.name;
        friendList.appendChild(listItem);
    });
}

// Function to toggle page visibility
function showPage(pageId) {
    const pages = document.querySelectorAll('section');
    pages.forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

// Sign Up Form Submission
document.querySelector('#sign-up-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('sign-up-username').value;
    const password = document.getElementById('sign-up-password').value;

    // Simulate user registration (for demonstration)
    users.push({ username, password });

    // Log the user in after successful registration
    currentUser = { username, password };
    alert('Registration successful.');

    // Update profile information (for demonstration)
    currentUser.name = 'New User';
    currentUser.email = 'newuser@example.com';

    // Redirect to the chat page after successful registration
    window.location.href = 'chat.html';
});

// Sign In Form Submission
document.querySelector('#sign-in-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('sign-in-username').value;
    const password = document.getElementById('sign-in-password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        alert('Login successful.');

        // Redirect to the chat page after successful login
        window.location.href = 'chat.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
});



// Log Out Button Click
document.querySelector('#log-out-button').addEventListener('click', function () {
    currentUser = null;
    alert('Logged out successfully.');

    // Clear chat messages and global chat messages
    chatMessages.length = 0;
    globalChatMessages.length = 0;
    updateChatWindow();
    updateGlobalChatWindow();

    // Redirect to the sign-in page after logging out
    window.location.href = 'index.html';
});


// Chat Form Submission
document.querySelector('#message-form').addEventListener('submit', function (event) {
    event.preventDefault();
    if (!currentUser) {
        alert('Please log in to send messages.');
        return;
    }
    const messageInput = document.getElementById('message-input');
    const message = `${currentUser.name}: ${messageInput.value}`;
    chatMessages.push(message);
    updateChatWindow();
    messageInput.value = '';
});

// Global Chat Form Submission
document.querySelector('#global-message-form').addEventListener('submit', function (event) {
    event.preventDefault();
    if (!currentUser) {
        alert('Please log in to send global messages.');
        return;
    }
    const globalMessageInput = document.getElementById('global-message-input');
    const globalMessage = `${currentUser.name}: ${globalMessageInput.value}`;
    globalChatMessages.push(globalMessage);
    updateGlobalChatWindow();
    globalMessageInput.value = '';
});



// Profile Form Submission
document.querySelector('#profile-form').addEventListener('submit', function (event) {
    event.preventDefault();
    if (!currentUser) {
        alert('Please log in to edit your profile.');
        return;
    }
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    // Update user profile (in a real application, send to server or update database)
    currentUser.name = nameInput.value;
    currentUser.email = emailInput.value;

    // Update profile information on the page
    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('profile-email').textContent = currentUser.email;

    alert('Profile information saved successfully.');
});

// Initialize chat window and profile info
updateChatWindow();
updateGlobalChatWindow();
updateFriendsList();

// Show the sign-in page initially
showPage('sign-in');
