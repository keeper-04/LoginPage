async function register(event) {
  event.preventDefault(); // Stop form from submitting the default way

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Username and password are required.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      window.location.href = "index.html"; // Redirect to login on success
    }
  } catch (err) {
    alert("Error connecting to server.");
    console.error(err);
  }
}
