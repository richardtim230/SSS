// =========================

// Authentication Logic

// =========================

// Toggle Between Screens

function showRegister() {

  document.getElementById('loginPage').classList.remove('active');

  document.getElementById('registerPage').classList.add('active');

}

function showLogin() {

  document.getElementById('registerPage').classList.remove('active');

  document.getElementById('forgotPasswordPage').classList.remove('active');

  document.getElementById('loginPage').classList.add('active');

}

function showForgotPassword() {

  document.getElementById('loginPage').classList.remove('active');

  document.getElementById('forgotPasswordPage').classList.add('active');

}

// Toggle Password Visibility

function togglePassword(fieldId) {

  const field = document.getElementById(fieldId);

  field.type = field.type === 'password' ? 'text' : 'password';

}

// Register User

function register() {

  const user = {

    fullName: document.getElementById('fullName').value,

    email: document.getElementById('email').value,

    phone: document.getElementById('phone').value,

    department: document.getElementById('department').value,

    level: document.getElementById('level').value,

    password: document.getElementById('password').value,

    securityQuestion: document.getElementById('securityQuestion').value,

    securityAnswer: document.getElementById('securityAnswer').value,

  };

  if (!user.email || !user.password || !user.securityAnswer) {

    alert('Please fill in all required fields!');

    return;

  }

  localStorage.setItem('user', JSON.stringify(user));

  alert('Registration successful! Please log in.');

  showLogin();

}

// Login User

function login() {

  const email = document.getElementById('loginEmail').value;

  const password = document.getElementById('loginPassword').value;

  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {

    alert('No user registered. Please register first!');

    return;

  }

  if (user.email === email && user.password === password) {

    document.getElementById('loginPage').classList.remove('active');

    document.getElementById('welcomePage').classList.add('active');

    document.getElementById('userName').innerText = user.fullName;

  } else {

    alert('Invalid email or password!');

  }

}

// Recover Password

function recoverPassword() {

  const email = document.getElementById('recoveryEmail').value;

  const securityAnswer = document.getElementById('recoveryAnswer').value;

  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {

    alert('No user registered with this email.');

    return;

  }

  if (user.email === email && user.securityAnswer === securityAnswer) {

    alert(`Your password is: ${user.password}`);

    showLogin();

  } else {

    alert('Security question or answer is incorrect!');

  }

}

// =========================

// Welcome Page Logic

// =========================

// Proceed to Main App

function proceedToApp() {

  document.getElementById('welcomePage').classList.remove('active');

  document.querySelector('main').style.display = 'block';

}

// Close Welcome Page

function closeWelcomePage() {

  document.getElementById('welcomePage').classList.remove('active');

  alert('Welcome Page Closed!');

}

// =========================

// Section Navigation Logic

// =========================

// Navigate to Sections

function navigateToSection(section) {
  document.querySelector('main').style.display = 'block';

  // Check if section is likely a URL (contains a period for relative URLs or starts with http/https for absolute URLs)
  if (section.includes('.') || section.startsWith('http://') || section.startsWith('https://')) {
    window.location.href = section;
  } else {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert('Section not found!');
    }
  }
}
// =========================

// Session Management

// =========================

// Load User Details on Welcome Page

document.addEventListener('DOMContentLoaded', () => {

  const user = JSON.parse(localStorage.getItem('user')) || { fullName: 'Guest' };

  document.getElementById('userName').innerText = user.fullName;

});

