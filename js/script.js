
console.log("hello world");

function signUp() {
  document.querySelector('.signup').addEventListener('click', function() {
    document.querySelector('#signUpForm').style.display = 'block';
  })
}

signUp();
