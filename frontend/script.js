// Registration form
const form = document.getElementById('registerForm');

form.addEventListener('submit', function(e){
  e.preventDefault();

  // Save user data in localStorage
  const user = {
    name: document.getElementById('name').value,
    age: document.getElementById('age').value,
    mobile: document.getElementById('mobile').value
  };
  localStorage.setItem('userData', JSON.stringify(user));

  // Redirect to book reader page
  window.location.href = "book.html";
});
