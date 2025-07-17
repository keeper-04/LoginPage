async function login(event) {
  event.preventDefault(); // Prevent form reload

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    alert(data.message); // Show login result
    // Optionally redirect if login is successful:
    // if (data.message === "Login successful") window.location.href = "home.html";
  } catch (err) {
    alert("Error connecting to server.");
    console.error(err);
  }
}
