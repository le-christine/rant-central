//
console.log("hello world");

function displaySignUp() {
  document.querySelector('.signup').addEventListener('click', function() {
    document.querySelector('#signUpForm').style.display = 'block';
  })
}

function displayLoginIn() {
  document.querySelector('.loginRant').addEventListener('click', function() {
    document.querySelector('.loginForm').style.display = 'block';
  })
}
displaySignUp();

function userSignUp() {
  document.querySelector('.signUpSubmit').addEventListener('click', function(e) {
    e.preventDefault();
    let email = document.querySelector('#signUpEmail').value;
    let username = document.querySelector('#signUpUsername').value;
    let password = document.querySelector('#signUpPassword').value;
    userSignUp(email, username, password);
  });
}

userSignUp();

let token;
function userSignUp(email, username, password) {
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





// login to rant

function displayLoginIn() {
  document.querySelector('.loginRant').addEventListener('click', function() {
    document.querySelector('.loginForm').style.display = 'block';
  })
}

displayLoginIn();

function loginUser() {
  document.querySelector(".rantAway").addEventListener('click', function(e) {
    e.preventDefault();
    console.log('test')
    let email = document.querySelector('#loginEmail').value;
    let password = document.querySelector('#loginPassword').value;
    console.log(email, password)
    postData(email, password);
  });
  }

loginUser();


function postData(email, password) {
  fetch('http://thesi.generalassemb.ly:8080/login', {
  method: 'Post',
  headers: {
    'Content-type':'application/json'
  },
  body:JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(function(response) {
          return response.json();
        }).then(function(data) {
          location.href="main.html";
        })
        .catch((error) => {
          console.log(error);
        })
      }
