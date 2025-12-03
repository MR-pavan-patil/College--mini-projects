// ============================================
// 🔥 ULTIMATE REAL-TIME CHAT APP
// ============================================

import { auth, db, storage } from './firebase-config.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    limit,
    doc,
    setDoc,
    deleteDoc,
    updateDoc,
    where,
    getDocs
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import {
    ref,
    uploadBytes,
    getDownloadURL
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';

// ============ DOM ELEMENTS ============
const authScreen = document.getElementById('authScreen');
const chatScreen = document.getElementById('chatScreen');

// Auth Elements
const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const authStatus = document.getElementById('authStatus');

const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginUsername = document.getElementById('loginUsername');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signupUsername = document.getElementById('signupUsername');

// Chat Elements
const sidebar = document.getElementById('sidebar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarAvatar = document.getElementById('sidebarAvatar');
const sidebarUsername = document.getElementById('sidebarUsername');
const headerAvatar = document.getElementById('headerAvatar');
const currentRoomName = document.getElementById('currentRoomName');
const roomDescription = document.getElementById('roomDescription');

const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const charCount = document.getElementById('charCount');

const typingIndicator = document.getElementById('typingIndicator');
const typingText = document.getElementById('typingText');

const searchBtn = document.getElementById('searchBtn');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
const closeSearch = document.getElementById('closeSearch');

const themeToggle = document.getElementById('themeToggle');
const notificationToggle = document.getElementById('notificationToggle');
const logoutBtn = document.getElementById('logoutBtn');

const emojiBtn = document.getElementById('emojiBtn');
const emojiPicker = document.getElementById('emojiPicker');
const closeEmoji = document.getElementById('closeEmoji');

const fileBtn = document.getElementById('fileBtn');
const fileInput = document.getElementById('fileInput');

const roomButtons = document.querySelectorAll('.room-item');
const onlineUsers = document.getElementById('onlineUsers');
const onlineCount = document.getElementById('onlineCount');

const notificationSound = document.getElementById('notificationSound');

// ============ STATE VARIABLES ============
let currentUser = null;
let currentRoom = 'general';
let displayName = '';
let unsubscribeMessages = null;
let unsubscribeOnline = null;
let typingTimeout = null;
let notificationsEnabled = true;
let lastMessageTime = 0;

// ============ ROOM DESCRIPTIONS ============
const roomDescriptions = {
    general: 'General discussion for everyone',
    tech: 'Talk about technology and coding',
    random: 'Random thoughts and fun conversations',
    gaming: 'Discuss your favorite games',
    music: 'Share and discover music'
};

// ============ INITIALIZE APP ============
function init() {
    console.log('🚀 Initializing Ultimate Chat App...');

    // Load theme
    initTheme();

    // Auth tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchAuthTab(tabName);
        });
    });

    // Auth button listeners
    loginBtn.addEventListener('click', handleLogin);
    signupBtn.addEventListener('click', handleSignup);

    // Enter key for auth
    [loginEmail, loginPassword, loginUsername].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleLogin();
        });
    });

    [signupEmail, signupPassword, signupUsername].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSignup();
        });
    });

    // Chat listeners
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('input', handleTyping);
    messageInput.addEventListener('keypress', handleKeyPress);

    logoutBtn.addEventListener('click', handleLogout);
    themeToggle.addEventListener('click', toggleTheme);

    // Room switching
    roomButtons.forEach(btn => {
        btn.addEventListener('click', () => switchRoom(btn.dataset.room));
    });

    // Search
    searchBtn.addEventListener('click', () => {
        searchBar.style.display = 'flex';
        searchInput.focus();
    });

    closeSearch.addEventListener('click', () => {
        searchBar.style.display = 'none';
        searchInput.value = '';
    });

    searchInput.addEventListener('input', handleSearch);

    // Emoji picker
    emojiBtn.addEventListener('click', () => {
        emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
    });

    closeEmoji.addEventListener('click', () => {
        emojiPicker.style.display = 'none';
    });

    document.querySelectorAll('.emoji-grid span').forEach(emoji => {
        emoji.addEventListener('click', () => {
            messageInput.value += emoji.textContent;
            updateCharCount();
            messageInput.focus();
        });
    });

    // File upload
    // fileBtn.addEventListener('click', () => fileInput.click());
    // fileInput.addEventListener('change', handleFileUpload);

    // Mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Notifications
    notificationToggle.addEventListener('click', () => {
        notificationsEnabled = !notificationsEnabled;
        const icon = notificationToggle.querySelector('i');
        icon.className = notificationsEnabled ? 'fas fa-bell' : 'fas fa-bell-slash';
        showToast(notificationsEnabled ? 'Notifications enabled' : 'Notifications disabled');
    });

    console.log('✅ App initialized!');
}

// ============ THEME MANAGEMENT ============
function initTheme() {
    const savedTheme = localStorage.getItem('chatTheme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeToggle.querySelector('i').className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('chatTheme', isLight ? 'light' : 'dark');
}

// ============ AUTH TAB SWITCHING ============
function switchAuthTab(tab) {
    authTabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

    if (tab === 'login') {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    } else {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
    }

    authStatus.textContent = '';
}

// ============ AUTHENTICATION ============
async function handleLogin() {
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();
    const username = loginUsername.value.trim();

    if (!email || !password || !username) {
        showAuthStatus('Please fill all fields', 'error');
        return;
    }

    try {
        showAuthStatus('Logging in...', 'info');
        await signInWithEmailAndPassword(auth, email, password);
        displayName = username;
        localStorage.setItem('chatUsername', username);
    } catch (error) {
        console.error('Login error:', error);
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            showAuthStatus('Invalid credentials. Try signing up!', 'error');
        } else {
            showAuthStatus(error.message, 'error');
        }
    }
}

async function handleSignup() {
    const email = signupEmail.value.trim();
    const password = signupPassword.value.trim();
    const username = signupUsername.value.trim();

    if (!email || !password || !username) {
        showAuthStatus('Please fill all fields', 'error');
        return;
    }

    if (password.length < 6) {
        showAuthStatus('Password must be at least 6 characters', 'error');
        return;
    }

    try {
        showAuthStatus('Creating account...', 'info');
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        displayName = username;
        localStorage.setItem('chatUsername', username);

        // Create user document
        await setDoc(doc(db, 'users', userCredential.user.uid), {
            username: username,
            email: email,
            createdAt: serverTimestamp()
        });

        showAuthStatus('Account created successfully!', 'success');
    } catch (error) {
        console.error('Signup error:', error);
        if (error.code === 'auth/email-already-in-use') {
            showAuthStatus('Email already in use. Try logging in!', 'error');
        } else {
            showAuthStatus(error.message, 'error');
        }
    }
}

function showAuthStatus(message, type) {
    authStatus.textContent = message;
    authStatus.style.background = type === 'error' ? 'rgba(239, 68, 68, 0.2)' :
        type === 'success' ? 'rgba(16, 185, 129, 0.2)' :
        'rgba(59, 130, 246, 0.2)';
    authStatus.style.color = type === 'error' ? '#ef4444' :
        type === 'success' ? '#10b981' :
        '#3b82f6';
}

// ============ AUTH STATE LISTENER ============
onAuthStateChanged(auth, async(user) => {
    if (user) {
        currentUser = user;

        // Get username
        if (!displayName) {
            displayName = localStorage.getItem('chatUsername') || user.email.split('@')[0];
        }

        // Show chat screen
        authScreen.style.display = 'none';
        chatScreen.style.display = 'flex';

        // Update UI
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random&bold=true&size=128`;
        sidebarAvatar.src = avatarUrl;
        headerAvatar.src = avatarUrl;
        sidebarUsername.textContent = displayName;

        // Set online status
        await setOnlineStatus(true);

        // Load messages
        loadMessages();

        // Listen to online users
        listenToOnlineUsers();

        console.log('✅ User logged in:', displayName);
    } else {
        authScreen.style.display = 'flex';
        chatScreen.style.display = 'none';
        currentUser = null;

        if (unsubscribeMessages) unsubscribeMessages();
        if (unsubscribeOnline) unsubscribeOnline();
    }
});

// ============ ONLINE STATUS ============
async function setOnlineStatus(isOnline) {
    if (!currentUser) return;

    const userOnlineRef = doc(db, 'online', currentUser.uid);

    if (isOnline) {
        await setDoc(userOnlineRef, {
            username: displayName,
            avatar: sidebarAvatar.src,
            lastSeen: serverTimestamp()
        });

        // Remove on disconnect
        window.addEventListener('beforeunload', async() => {
            await deleteDoc(userOnlineRef);
        });
    } else {
        await deleteDoc(userOnlineRef);
    }
}

function listenToOnlineUsers() {
    if (unsubscribeOnline) unsubscribeOnline();

    const onlineRef = collection(db, 'online');

    unsubscribeOnline = onSnapshot(onlineRef, (snapshot) => {
        onlineUsers.innerHTML = '';
        let count = 0;

        snapshot.forEach((doc) => {
            if (doc.id !== currentUser.uid) {
                const user = doc.data();
                const userEl = document.createElement('div');
                userEl.className = 'online-user';
                userEl.innerHTML = `
                    <img src="${user.avatar}" alt="${user.username}">
                    <div class="online-user-info">
                        <div class="online-user-name">${user.username}</div>
                        <div class="online-user-status">Online</div>
                    </div>
                `;
                onlineUsers.appendChild(userEl);
                count++;
            }
        });

        onlineCount.textContent = count + 1; // +1 for current user
    });
}

// ============ LOGOUT ============
async function handleLogout() {
    try {
        await setOnlineStatus(false);
        await signOut(auth);
        messagesContainer.innerHTML = '';
        loginEmail.value = '';
        loginPassword.value = '';
        signupEmail.value = '';
        signupPassword.value = '';
        authStatus.textContent = '';
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// ============ ROOM SWITCHING ============
function switchRoom(room) {
    if (room === currentRoom) return;

    currentRoom = room;

    // Update UI
    roomButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.room === room);
    });

    const roomIcon = {
        general: 'fa-comments',
        tech: 'fa-code',
        random: 'fa-random',
        gaming: 'fa-gamepad',
        music: 'fa-music'
    };

    currentRoomName.innerHTML = `<i class="fas ${roomIcon[room]}"></i> ${room.charAt(0).toUpperCase() + room.slice(1)}`;
    roomDescription.textContent = roomDescriptions[room];

    // Close mobile menu
    sidebar.classList.remove('active');

    // Load new room messages
    loadMessages();
}

// ============ LOAD MESSAGES (REAL-TIME) ============
function loadMessages() {
    if (unsubscribeMessages) unsubscribeMessages();

    messagesContainer.innerHTML = '<div class="welcome-message"><i class="fas fa-spinner fa-spin"></i><h3>Loading messages...</h3></div>';

    const messagesRef = collection(db, `rooms/${currentRoom}/messages`);
    const q = query(messagesRef, orderBy('timestamp', 'desc'), limit(50));

    unsubscribeMessages = onSnapshot(q, (snapshot) => {
        const messages = [];

        snapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...doc.data() });
        });

        // Reverse to show oldest first
        messages.reverse();

        // Clear and render
        messagesContainer.innerHTML = '';

        if (messages.length === 0) {
            messagesContainer.innerHTML = `
                <div class="welcome-message">
                    <i class="fas fa-comments"></i>
                    <h3>No messages yet</h3>
                    <p>Be the first to say something!</p>
                </div>
            `;
        } else {
            messages.forEach(msg => renderMessage(msg));
            scrollToBottom();
        }
    }, (error) => {
        console.error('Error loading messages:', error);
        messagesContainer.innerHTML = '<div class="welcome-message"><i class="fas fa-exclamation-circle"></i><h3>Error loading messages</h3></div>';
    });
}

// ============ RENDER MESSAGE ============
function renderMessage(msg) {
    const isMe = msg.userId === currentUser.uid;

    const messageWrapper = document.createElement('div');
    messageWrapper.className = `message-wrapper ${isMe ? 'me' : ''}`;
    messageWrapper.dataset.id = msg.id;

    const time = msg.timestamp ? new Date(msg.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now';

    const avatarUrl = msg.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.sender)}&background=random`;

    messageWrapper.innerHTML = `
        <img src="${avatarUrl}" alt="${msg.sender}" class="message-avatar">
        <div class="message-content">
            <div class="message-header">
                <span class="message-sender">${msg.sender}</span>
                <span class="message-time">${time}</span>
            </div>
            <div class="message-bubble">
                ${escapeHtml(msg.text)}
                ${msg.imageUrl ? `<img src="${msg.imageUrl}" class="message-image" onclick="window.open('${msg.imageUrl}', '_blank')">` : ''}
            </div>
            ${isMe ? `
                <div class="message-actions">
                    <button class="message-action-btn" onclick="deleteMessage('${msg.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            ` : ''}
        </div>
    `;
    
    messagesContainer.appendChild(messageWrapper);
    
    // Play notification sound for new messages
    if (!isMe && msg.timestamp && (Date.now() - lastMessageTime > 1000)) {
        playNotification();
        lastMessageTime = Date.now();
    }
}

// ============ SEND MESSAGE ============
async function sendMessage() {
    const text = messageInput.value.trim();
    
    if (!text) return;
    if (!currentUser) {
        showToast('Please login first!');
        return;
    }
    
    try {
        const messagesRef = collection(db, `rooms/${currentRoom}/messages`);
        
        await addDoc(messagesRef, {
            text: text,
            sender: displayName,
            userId: currentUser.uid,
            avatar: sidebarAvatar.src,
            timestamp: serverTimestamp()
        });
        
        messageInput.value = '';
        updateCharCount();
        typingIndicator.style.display = 'none';
        
    } catch (error) {
        console.error('Error sending message:', error);
        showToast('Failed to send message');
    }
}

// ============ FILE UPLOAD ============
async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showToast('File size must be less than 5MB');
        return;
    }
    
    try {
        showToast('Uploading file...');
        
        const storageRef = ref(storage, `chat-uploads/${currentUser.uid}/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        
        const messagesRef = collection(db, `rooms/${currentRoom}/messages`);
        await addDoc(messagesRef, {
            text: `Shared a file: ${file.name}`,
            imageUrl: downloadURL,
            sender: displayName,
            userId: currentUser.uid,
            avatar: sidebarAvatar.src,
            timestamp: serverTimestamp()
        });
        
        showToast('File uploaded successfully!');
        fileInput.value = '';
        
    } catch (error) {
        console.error('Error uploading file:', error);
        showToast('Failed to upload file');
    }
}

// ============ DELETE MESSAGE ============
window.deleteMessage = async function(messageId) {
    if (!confirm('Delete this message?')) return;
    
    try {
        await deleteDoc(doc(db, `rooms/${currentRoom}/messages`, messageId));
        showToast('Message deleted');
    } catch (error) {
        console.error('Error deleting message:', error);
        showToast('Failed to delete message');
    }
};

// ============ TYPING INDICATOR ============
function handleTyping() {
    updateCharCount();
    
    typingIndicator.style.display = 'flex';
    
    if (typingTimeout) clearTimeout(typingTimeout);
    
    typingTimeout = setTimeout(() => {
        typingIndicator.style.display = 'none';
    }, 2000);
}

// ============ KEY PRESS HANDLER ============
function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

// ============ SEARCH MESSAGES ============
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const messages = document.querySelectorAll('.message-wrapper');
    
    messages.forEach(msg => {
        const text = msg.querySelector('.message-bubble').textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            msg.style.display = 'flex';
        } else {
            msg.style.display = 'none';
        }
    });
}

// ============ UTILITY FUNCTIONS ============
function updateCharCount() {
    charCount.textContent = messageInput.value.length;
}

function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function playNotification() {
    if (notificationsEnabled) {
        notificationSound.play().catch(() => {});
    }
}

function showToast(message) {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--accent-primary);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============ INITIALIZE ============
init();

console.log('🔥 Ultimate Chat App is ready!');