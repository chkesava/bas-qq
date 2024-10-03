// Redirect to home if already logged in
if (localStorage.getItem('jwtToken')) {
  window.location.href = 'index.html'; // Redirect to home page
}

document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const messageElement = document.getElementById('message');

  try {
    const response = await fetch('https://backend-project-vrv9.onrender.com/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (response.ok) {
      // Store the JWT token in localStorage
      localStorage.setItem('jwtToken', result.jwtToken);
      
      alert('Login successful! Redirecting to home page...');
      setTimeout(() => {
        window.location.href = 'index.html'; // Redirect to home page
      }, 2000);
    } else {
      messageElement.textContent = result.message || 'Invalid login details';
    }
  } catch (error) {
    messageElement.textContent = 'Error logging in';
  }
});
