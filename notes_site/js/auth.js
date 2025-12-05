// js/auth.js

// -----------------------------------
// SIGNUP FUNCTION
// -----------------------------------
async function signup(email, password, fullName, branch, semester) {
    try {
        // Step 1: Create auth user in Supabase
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password
        });

        if (error) throw error;

        // Step 2: Insert user profile in profiles table
        const { error: profileError } = await supabaseClient
            .from('profiles')
            .insert([{
                id: data.user.id,
                full_name: fullName,
                email: email,
                branch: branch,
                semester: parseInt(semester)
            }]);

        if (profileError) throw profileError;

        return { success: true, message: 'Account created successfully! Please login.' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// -----------------------------------
// LOGIN FUNCTION
// -----------------------------------
async function login(email, password) {
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        return { success: true, message: 'Login successful!', user: data.user };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// -----------------------------------
// LOGOUT FUNCTION
// -----------------------------------
async function logout() {
    try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// -----------------------------------
// CHECK IF USER IS LOGGED IN
// -----------------------------------
async function getCurrentUser() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    return session && session.user ? session.user : null;
}

// -----------------------------------
// REDIRECT TO LOGIN IF NOT AUTHENTICATED
// (Use this on protected pages like upload.html)
// -----------------------------------
async function requireAuth() {
    const user = await getCurrentUser();
    if (!user) {
        alert('Please login to access this page');
        window.location.href = 'login.html';
    }
    return user;
}

// -----------------------------------
// EVENT LISTENERS FOR LOGIN PAGE
// -----------------------------------
if (document.getElementById('loginForm')) {
    // Handle Login Form Submit
    document.getElementById('loginForm').addEventListener('submit', async(e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const messageEl = document.getElementById('loginMessage');

        messageEl.textContent = 'Logging in...';
        messageEl.style.color = 'blue';

        const result = await login(email, password);

        if (result.success) {
            messageEl.textContent = result.message;
            messageEl.style.color = 'green';

            // Redirect to upload page after successful login
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            messageEl.textContent = result.message;
            messageEl.style.color = 'red';
        }
    });

    // Handle Signup Form Submit
    document.getElementById('signupForm').addEventListener('submit', async(e) => {
        e.preventDefault();

        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const branch = document.getElementById('signupBranch').value;
        const semester = document.getElementById('signupSemester').value;
        const password = document.getElementById('signupPassword').value;
        const messageEl = document.getElementById('signupMessage');

        messageEl.textContent = 'Creating account...';
        messageEl.style.color = 'blue';

        const result = await signup(email, password, name, branch, semester);

        if (result.success) {
            messageEl.textContent = result.message;
            messageEl.style.color = 'green';

            // Switch to login tab after successful signup
            setTimeout(() => {
                document.getElementById('loginTabBtn').click();
            }, 1500);
        } else {
            messageEl.textContent = result.message;
            messageEl.style.color = 'red';
        }
    });
}