
console.log("hello world");
function displaySignUp() {
  document.querySelector('.signup').addEventListener('click', function() {
    document.querySelector('#signUpForm').style.display = 'block';
  })
}

displaySignUp();

function userSignUp() {
  document.querySelector('.signUpSubmit').addEventListener('click', function(e) {
    e.preventDefault();
    let email = document.querySelector('#signUpEmail').value;
    let username = document.querySelector('#signUpUsername').value;
    let password = document.querySelector('#signUpPassword').value;
    postData(email, username, password);
  });
}

userSignUp();

// Signup POST Request
let token;
function postData(email, username, password) {
  fetch('http://thesi.generalassemb.ly:8080/signup', {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      email : `${email}`,
      username: `${username}`,
      password : `${password}`
    })
  })
  .then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data);
    token = data["token"];
  })
  .catch((error) => {
    console.log(error);
  })
}

// Login Post Request

// Load all posts


// Allow a user to create and delete their own posts.
// Allow a user to view comments on other posts.
// Allow a user to create and delete their own comments.
// Allow a user to update their profile information.
// Use JavaScript for DOM manipulation.
// Show user-friendly messages in case any errors occur.
