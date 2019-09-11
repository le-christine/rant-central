console.log("hello world");

// When signup button is clicked, form appears
function displaySignUp(event) {
  event.preventDefault();
  document.querySelector('#signUpForm').style.display = 'block';
}

// Signup POST Request
// after successful request, redirects user to new page
function postData(event) {
  event.preventDefault();
  let email = document.querySelector('#signUpEmail');
  let username = document.querySelector('#signUpUsername');
  localStorage.setItem('username', username.value);
  let password = document.querySelector('#signUpPassword');

  fetch('http://thesi.generalassemb.ly:8080/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email: email.value,
              password: password.value,
              username: username.value
          })
  })
  .then((res) => {
      return res.json();
  })
  .then((res) => {
      localStorage.setItem('user', res.token);
  })
  .catch((err) => {
      console.log(err);
  })
  window.location.href="./main.html";
};

// after successul sign up, changes username element
function changeUser() {
  document.querySelector('.loggedInUser').innerText = localStorage.getItem('username');
};

function updateDom() {
    fetch("http://thesi.generalassemb.ly:8080/user/post", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('user')
        }
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        const list = document.querySelector('.posts');

        for (let i = 0; i < res.length; i++) {
            const item = document.createElement('li');
            const title = document.createElement('h3');
            const description = document.createElement('p');
            item.appendChild(title);
            item.appendChild(description);
            title.innerText = res[i].title;
            description.innerText = res[i].description;
            list.appendChild(item);
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

function createPost(event) {
    event.preventDefault();
    const title = document.querySelector('.title');
    const description = document.querySelector('.description');
    fetch("http://thesi.generalassemb.ly:8080/post", {
        method: 'POST',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJleHByZXNhc2Rmc0B0cmFpbi5jb20iLCJleHAiOjE1NjgxNDkwMDAsImlhdCI6MTU2ODEzMTAwMH0.28OoEKc3FBXn5iqg1d1C_sjuowklVuAPAs8RYAnPXjMoNFuebNRCQJJiU-Dp6PQKhzgNES95ftckHhw9aTNyFg",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title.value,
            description: description.value
        })
    })
    .then((res) => {
        console.log(res);
        updateDom(res);
    })
    .catch((err) => {
        console.log(err);
    })
}

// Load all posts and populate document
function listAllPosts() {
  fetch ('http://thesi.generalassemb.ly:8080/post/list', {
    method: 'GET'
  })
  .then(function(result) {
  console.log(result.json());
  })
}


function populatePosts(data) {
  let title, content, username;

  for (let i = 0; i<data.length; i++) {
    title = data[i]['title'];
    username = data[i]['user']['username'];
    if (data[i]['description']) {
      content = data[i]['description'];
    } else {
      console.log(data[i]['description']);
      content = ' ';
    }
  //manipulateDomPosts(title, content, username)
  }
};


function manipulateDomPosts(title, content, user) {
  // creates a div for each post and appends it to posts-container
  let userPost = document.createElement('div');
  userPost.classList = 'userPost';
  document.querySelector(".posts-container").appendChild(userPost);


  //creates a span for post title and appends it to the post
  let postOwner = document.createElement('span');
  postOwner.classList = 'postOwner';
  postOwner.innerText = `Posted by: ${user}`;
  //console.log(postOwner);

  // creates a post title and appends it to the post
  let postTitle = document.createElement('h3');
  postTitle.classList = 'userPostTitle';
  postTitle.innerText = title;
  //console.log(postTitle);
  // creates a div with post's contents and appends it to the post
  let postContent = document.createElement('p');
  postContent.classList = 'userPostContent';
  postContent.innerText = content;
  //console.log(postContent);
  // creates a comment box and appends it to the post
  let commentsBox = document.createElement('div');
  commentsBox.classList = "userPostComments";
  //console.log(commentsBox);
  // a user's post
  let newPost = document.querySelector('#userPost');
  newPost.append(postOwner);
  newPost.append(postContent);
  newPost.append(commentsBox);
};

// Allow a user to view comments on other posts.

function makePost(event) {
event.preventDefault();
let titlePost = document.querySelector('.titlepost').value;
let titledescription = document.querySelector('.titledescription').value;

fetch("http://thesi.generalassemb.ly:8080/post",{
  method: 'POST',
  header: {
    "Content-Type":"application/json",
    "Authorization": "Bearer " + localStorage.getItem('user')
  },

  body: JSON.stringify ({
      title: titlePost,
      description: titledescription
    })
})
.then((res) => {
  console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
}





// Allow a user to create and delete their own comments.
// Allow a user to update their profile information.
// Use JavaScript for DOM manipulation.
// Show user-friendly messages in case any errors occur.












  //R.H.
  // login to rant

function displayLoginIn() {
  document.querySelector('.loginRant').addEventListener('click', function() {
    document.querySelector('.loginForm').style.display = 'block';
  })
}

displayLoginIn();

function loginUser() {
  document.querySelector('.rantAway').addEventListener('click', function(e) {
    e.preventDefault();
    let email = document.querySelector('#loginEmail').value;
    let password = document.querySelector('#loginPassword').value;
    console.log(email, password)
    userLog(email, password);
  });
  }

loginUser();


function userLog(email, password) {
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
      };
