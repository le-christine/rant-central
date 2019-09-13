console.log("hello world");


/**
 *                *
 * EVENT HANDLERS *
 *                *
 */

// When signup button is clicked, form appears
function displaySignUp(event) {
  event.preventDefault();
  document.querySelector('#signUpForm').style.display = 'block';
}

// after successul sign up, changes username element
function changeUser() {
  document.querySelector('.loggedInUser').innerText = localStorage.getItem('username');
};

// update Profile appears when clicked in drop-down menu
function displayUpdateProfile(event) {
  event.preventDefault();
  document.querySelector('.updateProfile').style.display = 'block';
}

function displayLogIn(event) {
  event.preventDefault();
  document.querySelector('.loginForm').style.display = 'block';
}

// update Profile appears when clicked in drop-down menu

function hideLogin() {
  let loginForm = document.querySelector('.loginForm');
      loginForm.style.display = 'none';
    }

function hideSignUp() {
  let signUp = document.querySelector('#signUpForm');
      signUp.style.display = 'none';
    }

function hideUpdateProfile() {
  let updateProfile = document.querySelector('.updateProfile');
      updateProfile.style.display = 'none';
    }

  function logOutUser(event) {
  event.preventDefault();
  localStorage.removeItem('user');
  window.location.href='./index.html';


}


/**
 *               *
 * POST REQUESTS *
 *               *
 */

// Login POST request
function loginUser(event) {
    event.preventDefault();
    let email = document.querySelector('#loginEmail').value;
    localStorage.setItem('username', email);
    let password = document.querySelector('#loginPassword').value;
    fetch('http://thesi.generalassemb.ly:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
        email: email,
        password: password
    })
  })
  .then((res) => {
      return res.json();
  })
  .then((res) => {
    localStorage.setItem('user', res.token);
    window.location.href="./main.html";
  })
  .catch((err) => {
    console.log(err);
  })
}

// Signup POST Request
// after successful request, redirects user to new page
// TODO: rename this to signup and replace the name in html add a docstring
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
        window.location.href="./main.html";
    })
  .catch((err) => {
      console.log(err);
  })
}

// Request to create profile
function createProfile(event) {
  event.preventDefault();

  let addtEmail = document.querySelector('.addtEmail');
  let mobile = document.querySelector('.addMobile');
  let address = document.querySelector('.address');

  fetch('http://thesi.generalassemb.ly:8080/profile', {
    method: 'POST',
    headers: {
      "Authorization": "Bearer " + localStorage.getItem('user'),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        additionalEmail: addtEmail.value,
        mobile: mobile.value,
        address: address.value
    })
  })
  .then((res) =>{
    alert('You have successfully created a profile');
    document.querySelector('.makeUserProfile').style.display = "none";
    displayProfile();
  })
  .catch((error) => {
  console.log(error)
  })
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
    document.querySelector('.myProfile').innerText = "";
    displayProfile();
  })
  .catch((err) => {
    console.log(err);
  })
}

// Allow a user to make a post, upon successful POST updateDOM function is called
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

// The post loads in the DOM
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
        document.querySelector('.posts').innerHTML="";
        listAllPosts();
    })
    .catch((err) => {
        console.log(err);
    })
}

// Allow a user to make a comment on a post
// function passes a postId
function makeComment(postId) {
  let commentToPost= document.querySelector((`[postid="${postId}"]`)).querySelector('.commentInput');
  fetch(`http://thesi.generalassemb.ly:8080/comment/${postId}`, {
    method: 'POST',
    headers: {
            "Authorization": "Bearer " + localStorage.getItem('user'),
            "Content-Type": "application/json"
        },
    body: JSON.stringify({
          text: commentToPost.value
      })
    })
    .then((res) => {
      document.querySelector((`[commentBoxId="${postId}"]`)).innerHTML="";
      viewComments(postId);
    })
    .catch((error) => {
      console.log(error);
    })
}

/**
 *              *
 * GET REQUESTS *
 *              *
 */

// Get profile and load the DOM with the response data
function displayProfile() {
  fetch('http://thesi.generalassemb.ly:8080/profile', {
    method: 'GET',
    headers: {
            "Authorization": "Bearer " + localStorage.getItem('user'),
            "Content-Type": "application/json"
        }
  })
  .then((res) => {
    return(res.json());
  })
  .then((res) => {
    showProfile(res);
  })
  .catch((error) => {
    console.log(error)
  })
}

function showProfile(res) {
  let sidenav = document.querySelector('.sidenav');
  let usersProfile = document.querySelector('.myProfile');
  usersProfile.innerText = `\n\nWelcome, ${res.user.username}!\n
                            Additional email address:\n
                            ${res.additionalEmail}\n
                            Mobile: \n
                            ${res.mobile}\n
                            Address: \n
                            ${res.address}`;
  sidenav.append(usersProfile);
}

// view comments function

function viewComments(postId) {
  fetch(`http://thesi.generalassemb.ly:8080/post/${postId}/comment`, {
    method: 'GET',
    headers: {
          "Content-Type": "application/json"
        }
      })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      for (let i = 0; i < res.length; i++ ) {
        manipulateDomComments(res[i].id, res[i].text, res[i].post.id, res[i].user.username);
    }
    })
  .catch((err) => {
    console.log(err)
  })
}

// Get comments by user and populate in Profile
function getCommentsByUser(event) {
  event.preventDefault();
  fetch('http://thesi.generalassemb.ly:8080/user/comment', {
    method: 'GET',
    headers: {
          "Authorization": "Bearer " + localStorage.getItem('user'),
          "Content-Type": "application/json"
        }
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      let loadCommentsHere = document.querySelector('.usersComments');
      for (let i = 0; i< res.length; i++) {
        let comment = document.createElement('li');
        comment.innerText = res[i].text;
        loadCommentsHere.append(comment);
      }
    })
    .catch((error) => {
      console.log(error);
    })
}

// get posts by user and populate in profile
function getPostsByUser(event) {
  event.preventDefault();
  fetch('http://thesi.generalassemb.ly:8080/user/post', {
    method: 'GET',
    headers: {
          "Authorization": "Bearer " + localStorage.getItem('user'),
          "Content-Type": "application/json"
        }
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      let loadPostsHere = document.querySelector('.usersPosts');
      for (let i = 0; i< res.length; i++) {
        let post = document.createElement('li');
        post.innerText = res[i].title;
        loadPostsHere.append(post);
      }
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
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    for (let i = 0; i < res.length; i++) {
    populatePosts(res[i].title, res[i].description, res[i].id, res[i].user.username);
    }
  })
}

listAllPosts();

/**
 *                *
 * DELETE         *
 * REQUESTS       *
 *                *
 */


 // function to delete comment
 function deleteComment(commentId, postId) {
   fetch (`http://thesi.generalassemb.ly:8080/comment/${commentId}`, {
     method: 'DELETE',
     headers: {
           "Authorization": "Bearer " + localStorage.getItem('user'),
           "Content-Type": "application/json"
         }
   })
   .then(function(response) {
     if (response.status === 200) {
       removeCommentFromDom(commentId, postId);
     } else {
       alert('Error. You are only allowed to delete your own comments.');
     }
   })
   .catch((error) => {
     console.log(error);
   })
 }

// function to delete post

function deletePost(id) {
  fetch(`http://thesi.generalassemb.ly:8080/post/${id}`, {
    method: 'DELETE',
    headers: {
          "Authorization": "Bearer " + localStorage.getItem('user'),
          "Content-Type": "application/json"
        }
      })
  .then((res) => {
    document.querySelector('.posts').innerHTML = "";
    listAllPosts();
    })

  .catch((error) => {
  console.log(id);
  })

}

/**
 * DOM           *
 * MANIPULATION  *
 *               *
 */


function populatePosts(title, content, id, owner) {
  let userPost = document.createElement('div');
  userPost.classList = 'userPost';
  userPost.setAttribute('postId', id);
  document.querySelector(".posts").appendChild(userPost);

  // creates a post title and appends it to the post
  let postTitle = document.createElement('h3');
  postTitle.classList = 'userPostTitle';
  postTitle.innerText = title;

  // creates a div with post's contents and appends it to the post
  let postContent = document.createElement('p');
  postContent.classList = 'userPostContent';
  postContent.innerText = content;

  let userOwner = document.createElement('span');
  userOwner.classList = 'userOwner';
  userOwner.innerText = `Posted by: ${owner}`;
  // creates a comment box and appends it to the post
  let commentsBox = document.createElement('div');
  commentsBox.classList = "userPostComments";
  commentsBox.setAttribute('commentBoxId', id);

  // creates a delete button
  let deleteBtn;

  // creates a comment form
  makeCommentHeader = document.createElement('h4');
  makeCommentHeader.innerText = 'Make a comment:';
  let commentInput = document.createElement('input');
  commentInput.type = "text";
  commentInput.classList = "commentInput";
  let commentSubmit = document.createElement('input');
  commentSubmit.type = "submit";
  commentSubmit.addEventListener('click', function() {
    event.preventDefault();
    makeComment(event.target.parentNode.getAttribute('postid'));
  });

  // if it is the user's post it has a delete option
  if (owner === localStorage.getItem('username')) {
    deleteBtn = document.createElement('i');
    deleteBtn.classList = "fa fa-times";
    deleteBtn.id = "deletePost";
    deleteBtn.setAttribute("onclick", "deletePost(" +id+")");
    userPost.append(deleteBtn);
  }
  userPost.append(postTitle, userOwner, postContent, commentsBox, makeCommentHeader,
  commentInput,commentSubmit);
  viewComments(id);
}


function removeCommentFromDom(commentId, postId) {
  let commentToRemove = document.querySelector((`[commentid="${commentId}"]`));
  let removeFromParent = document.querySelector((`[commentboxid="${postId}"]`));
  removeFromParent.removeChild(commentToRemove);
}


function manipulateDomComments(commentId, commentText, id, commentOwner) {
  let commentToGet= document.querySelector((`[commentboxid="${id}"]`));
  let p = document.createElement('p');
  p.innerText = commentText;
  p.setAttribute('commentid', commentId);
  p.innerText = commentText;
  commentToGet.appendChild(p);

  let deleteBtn = document.createElement('button');
  deleteBtn.classList = "fa fa-times";
  deleteBtn.id = "deleteComment";
  deleteBtn.addEventListener('click', function(event) {
    event.preventDefault();
    deleteComment(commentId, id);
  })
  p.append(deleteBtn);
}
