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
}

// after successul sign up, changes username element
function changeUser() {
  document.querySelector('.loggedInUser').innerText = localStorage.getItem('username');
};

// Load all posts and populate document
function listAllPosts() {
  fetch ('http://thesi.generalassemb.ly:8080/post/list', {
    method: 'GET'
  })
  .then(function(result) {
  console.log(result.json());
  })
};

/*
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

*/

function manipulateDomPosts(title, content) {
  // creates a div for each post and appends it to posts-container
  let userPost = document.createElement('div');
  userPost.classList = 'userPost';
  document.querySelector(".posts").appendChild(userPost);


  //creates a span for post title and appends it to the post
  // let postOwner = document.createElement('span');
  // postOwner.classList = 'postOwner';
  // postOwner.innerText = `Posted by: ${user}`;
  // //console.log(postOwner);

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
  userPost.append(postTitle);
  userPost.append(postContent);
  userPost.append(commentsBox);
};

// Allow a user to view comments on other posts.

// Allow a user to update their profile information.
// update Profile appears when clicked in drop-down menu
function displayUpdateProfile(event) {
  event.preventDefault();
  document.querySelector('.updateProfile').style.display = 'block';
}

// Request to update Profile. Upon success, informs user
function updateProfile(event) {
  event.preventDefault();

  let mobile = document.querySelector('.mobile');
  fetch('http://thesi.generalassemb.ly:8080/profile', {
    method: 'POST',
    headers: {
            "Authorization": "Bearer " + localStorage.getItem('user'),
            "Content-Type": "application/json"
        },
    body: JSON.stringify({
      mobile: mobile.value
    })
  })
  .then((res) => {
    console.log(res);
    alert('Your profile has been successfully updated.');
  })
  .catch((err) => {
    console.log(err);
  })
};

// Allow a user to create and delete their own comments.
/*
function createComment(event) {
  event.preventDefault();
  let comment = document.querySelector('.newComment');
  fetch('http://thesi.generalassemb.ly:8080/comment/3', {
    method: 'POST',
    headers: {
            "Authorization": "Bearer " + localStorage.getItem('user'),
            "Content-Type": "application/json"
        },
    body: JSON.stringify({
      text: comment.value
    })
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err)=> {
    console.log(err);
  })
};
*/

function makePost(event) {
  event.preventDefault();
  let title = document.querySelector('.titlePost');
  let titleDescription = document.querySelector('.titleDescription');

  fetch('http://thesi.generalassemb.ly:8080/post', {
    method: 'POST',
    headers: {
            "Authorization": "Bearer " + localStorage.getItem('user'),
            "Content-Type": "application/json"
        },
    body: JSON.stringify({
            title: title.value,
            description: titleDescription.value
          })
  })
  .then((res) => {
    updateDom(res)
  })
  .catch((err) => {
    console.log(err)
  })
}


function updateDom(res) {
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
            manipulateDomPosts(res[i].title, res[i].description)
        }
    })
    .catch((err) => {
        console.log(err);
    })
}
/*
----------POST Requests
create comment
create post
create profile
login
signup
update profile
----------GET Requests
get comments by Post id
get comments by User
get posts by User
get profile
signup
----------Delete Requests
delete comment by commentId
delete post by Post Id

*/
// Use JavaScript for DOM manipulation.
// Show user-friendly messages in case any errors occur.


/*
  //R.H.
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

*/
