// Registration form submit handler
const form = document.getElementById('registerForm');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  // Collect form values (matching your HTML IDs)
  const fullName = document.getElementById('name').value.trim();
  const age = parseInt(document.getElementById('age').value);
  const mobileNo = document.getElementById('mobile').value.trim();

  // --- Frontend Validation ---
  if (!fullName) {
    alert("Full name is required.");
    return;
  }

  if (isNaN(age) || age < 1 || age > 120) {
    alert("Age must be between 1 and 120.");
    return;
  }

  if (!/^[0-9]{10}$/.test(mobileNo)) {
    alert("Mobile number must be exactly 10 digits.");
    return;
  }

  // Create user object to send to backend
  const user = { fullName, age, mobileNo };

  try {
    // Call Spring Boot API
    const response = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      const savedUser = await response.json();
      localStorage.setItem("userData", JSON.stringify(savedUser));

      alert("🎉 Registration successful!");
      window.location.href = "book.html"; // redirect to next page
    } else {
      const errorData = await response.json();
      alert("❌ Registration failed: " + (errorData.message || JSON.stringify(errorData)));
    }

  } catch (error) {
    console.error("Error:", error);
    alert("⚠️ Unable to connect to server. Please make sure the backend is running.");
  }
});
