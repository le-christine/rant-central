
console.log("hello world");
let token;
function displaySignUp() {
  document.querySelector('.signup').addEventListener('click', function() {
    document.querySelector('#signUpForm').style.display = 'block';
  })
}

displaySignUp();

function userSignUp() {
  document.querySelector('#signUpSubmit').addEventListener('click', function() {
    let email = document.querySelector('#signUpEmail').value;
      let username = document.querySelector('#signUpUsername').value;
    let password = document.querySelector('#signUpPassword').value;
    postData(email, username, password);
  })
}


let data;
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
  .then((res) => {
    console.log(res);
    data = res;
    // res.json().then(function(result) {
    //   token = result.token;
    // });
  })
  .catch((error) => {
    console.log(error);
  })
}
