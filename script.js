var websiteTitle = document.getElementById('website-title');
var websiteUrl = document.getElementById('website-url');
var enterButton = document.getElementById('enter-button');
var bookmark = document.getElementById('bookmark');
var bookmarkTitle = document.getElementById('bookmark-title');
var bookmarkLink = document.getElementById('website-link');
var rightSide = $ ('.right-side')
var buttonRead = document.getElementById('read')


$('.left-side').on('click', '#enter-button', function(event) {
    event.preventDefault();
    // noInput();
    realUrl();
    numberOfBookmarks();
    numberOfUnreadBookmarks();
    clearFields();
});

websiteTitle.addEventListener('input', disableButton);
websiteUrl.addEventListener('input', disableButton);
 
function createBookmark () {
 var newTitle = $('.website-input').val();
 var newLink = $('#website-url').val();

 $('.right-side').append(
   `<article class="bookmark" id="bookmark">
     <h2 class="bookmark-title" id="bookmark-title">${newTitle} </h2>
     <hr class="hr-1">
     <a class="website-link hover" id="website-link" href=${newLink} target="_blank">${newLink}</a>
     <hr class="hr-2">
     <input class="bookmark-buttons hover" id="read" type="submit" name="read" value="Read">
     <input class="bookmark-buttons hover" id="delete" type="submit" name="delete" value="Delete">
   </article>`);
 };
 
rightSide.on('click', '#read', function() {
   $(this).toggleClass('red');
   $(this).closest('article').toggleClass('background');
   numberOfReadBookmarks();
   numberOfUnreadBookmarks();
  });
 
rightSide.on('click', '#delete', function() {
  $(this).closest('article').remove('.bookmark');
  numberOfUnreadBookmarks();
  numberOfReadBookmarks();
  numberOfBookmarks();
 });
 
function noInput() {
  if (websiteTitle.value === '' && websiteUrl.value === '') {
    alert('Error: Enter a Title and Link');
  } else if (websiteUrl.value === '' || websiteTitle.value === '') {
    alert('Error: Enter a Title and Link');
  } else { 
    createBookmark();
  };
 };  

function disableButton() {
  if (websiteTitle.value == '' && websiteUrl.value == '') {
    enterButton.disabled = true;
  } else if (websiteUrl.value == '' || websiteTitle.value == '') {
    enterButton.disabled = true;
  } else { 
    enterButton.disabled = false;
  };
 };

function clearFields() {
  websiteTitle.value = '';
  websiteUrl.value = '';
  websiteTitle.focus();
  enterButton.disabled = true;
 }

function numberOfBookmarks() {
  $('#bookmark-number').text(+ $('.bookmark').length);
 }

function numberOfReadBookmarks() {
  $('#bookmark-read').text(+ $('.red').length);
 }

function numberOfUnreadBookmarks() {
  var unread = $('.bookmark').length - $('.red').length; 
  $('#bookmark-unread').text(+ unread);
}

$('.left-side').on('click', '#clear-read', function() {
  clearReadBookmarks();
});

function clearReadBookmarks() {
  $('.red').closest('.bookmark').remove();
  numberOfBookmarks();
  numberOfReadBookmarks();
  numberOfUnreadBookmarks();
}

function realUrl(){
   var regexQuery = /(http(s)?:\/\/\.)?(www\.)/;
   var url = new RegExp(regexQuery);
   if (url.test(websiteUrl.value)) {
     createBookmark();
   }else{
   alert('Please enter a valid URL')
   }     
}
