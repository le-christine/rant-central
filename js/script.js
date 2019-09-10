
console.log("hello world");
function displaySignUp() {
  document.querySelector('.signup').addEventListener('click', function() {
    document.querySelector('#signUpForm').style.display = 'block';
  })
}

// displaySignUp();

function userSignUp() {
  document.querySelector('.signUpSubmit').addEventListener('click', function(e) {
    e.preventDefault();
    let email = document.querySelector('#signUpEmail').value;
    let username = document.querySelector('#signUpUsername').value;
    let password = document.querySelector('#signUpPassword').value;
    postData(email, username, password);
  });
}

// userSignUp();

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


// Load all posts and populate document
function listAllPosts() {
  fetch ('http://thesi.generalassemb.ly:8080/post/list', {
    method: 'GET'
  })
  .then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data);
  })
};

listAllPosts();

function populatePosts(title, content, user) {
  // creates a div for each post and appends it to posts-container
  let userPost = document.createElement('div');
  userPost.classList = 'userPost';
  document.querySelector(".posts-container").appendChild(userPost);

  // a user's post
  let newPost = document.querySelector('#userPost');

  //creates a span for post title and appends it to the post
  let postOwner = document.createElement('span');
  postOwner.classList = 'postOwner';
  postOwner.innerText = `Posted by: ${user}`;

  // creates a post title and appends it to the post
  let postTitle = document.createElement('h3');
  postTitle.classList = 'userPostTitle';
  postTitle.innerText = title;
  newPost.appendChild(postTitle);

  // creates a div with post's contents and appends it to the post
  let postContent = document.createElement('p');
  postContent.classList = 'userPostContent';
  postContent.innerText = content;
  newPost.appendChild(postContent);

  // creates a comment box and appends it to the post
  let commentsBox = document.createElement('div');
  commentsBox.classList = "userPostComments";
  newPost.appendChild(commentsBox);

  // let titlePost = document.querySelector('.userPostTitle');
  // let postContent = document.querySelector('.userPostContent');
  // let postOwner = document.querySelector('postOwner');

};

/*
<p>Posted by: <span class="userPost"></span></p>
<h3 class = "userPostTitle">Today the MTA made me late by 30 minutes</h3>
<p class = "userPostContent">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<div class = "userPostComents">
 */

// Allow a user to create and delete their own posts.
// Allow a user to view comments on other posts.
// Allow a user to create and delete their own comments.
// Allow a user to update their profile information.
// Use JavaScript for DOM manipulation.
// Show user-friendly messages in case any errors occur.
