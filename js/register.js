document.getElementById('registerForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const gender = document.getElementById('gender').value;
  const messageElement = document.getElementById('message');
console.log(name)
console.log(username)
console.log(password)
console.log(gender)
  try {
    const response = await fetch('https://backend-project-vrv9.onrender.com/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, password, gender })
    });

    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    let result;

    if (contentType && contentType.includes('application/json')) {
      result = await response.json();  // Parse as JSON
    } else {
      result = await response.text();  // Parse as plain text
    }

    if (response.ok) {
      messageElement.textContent = 'User created successfully! Redirecting to login...';
      setTimeout(() => {
        window.location.href = 'login.html';  // Redirect to login page
      }, 2000);  // Redirect after 2 seconds
    } else {
      messageElement.textContent = result.message || result || 'Error registering user';
    }
  } catch (error) {
    messageElement.textContent = 'Error registering user';
  }
});
