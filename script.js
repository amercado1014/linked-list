var websiteTitle = $('#website-title');
var websiteUrl = $('#website-url');

$('.left-side').on('click', '#enter-button', function(event) {
    event.preventDefault();
    // noInput();
    realUrl();
    numberOfBookmarks();
    numberOfUnreadBookmarks();
    clearFields();
});

$('.left-side').on('input', '#website-title, #website-url', disableButton);
 
 
$('.right-side').on('click', '#read', function() {
   $(this).toggleClass('red');
   $(this).closest('article').toggleClass('background');
   numberOfReadBookmarks();
   numberOfUnreadBookmarks();
   disableClearReadButton();
});
 
$('.right-side').on('click', '#delete', function() {
  $(this).closest('article').remove('.bookmark');
  numberOfUnreadBookmarks();
  numberOfReadBookmarks();
  numberOfBookmarks();
});
 
$('.left-side').on('click', '#clear-read', function() {
  clearReadBookmarks();
  $('#clear-read').prop('disabled', true);
});

function createBookmark () {
 var newTitle = websiteTitle.val();
 var newLink = websiteUrl.val();

 $('#right-side').append(
   `<article class="bookmark" id="bookmark">
     <h2 class="bookmark-title" id="bookmark-title">${newTitle} </h2>
     <hr class="hr-1">
     <a class="website-link hover" id="website-link" href=${newLink} target="_blank">${newLink}</a>
     <hr class="hr-2">
     <input class="bookmark-buttons hover" id="read" type="submit" name="read" value="Read">
     <input class="bookmark-buttons hover" id="delete" type="submit" name="delete" value="Delete">
   </article>`);
};


function disableButton() {
  if ($(websiteTitle).val() == '' && $(websiteUrl).val() == '') {
    $('#enter-button').prop('disabled', true);
  } else if ($(websiteTitle).val() == '' || $(websiteUrl).val() == '') {
    $('#enter-button').prop('disabled', true);
  } else { 
    $('#enter-button').prop('disabled', false);
  }
};

function clearFields() {
  websiteTitle.val('');
  websiteUrl.val('');
  websiteTitle.focus();
  $('#enter-button').prop('disabled', true);
};

function numberOfBookmarks() {
  $('#bookmark-number').text(+ $('.bookmark').length);
};

function numberOfReadBookmarks() {
  $('#bookmark-read').text(+ $('.red').length);
};

function numberOfUnreadBookmarks() {
  var unread = $('.bookmark').length - $('.red').length; 
  $('#bookmark-unread').text(+ unread);
};


function clearReadBookmarks() {
  $('.red').closest('.bookmark').remove();
  numberOfBookmarks();
  numberOfReadBookmarks();
  numberOfUnreadBookmarks();
};

function disableClearReadButton() {
  if ($('.red').length = 0) {
    $('#clear-read').prop('disabled', true)
  } else {
    $('#clear-read').prop('disabled', false)
  }
};

function realUrl(){
   var regexQuery = /(http(s)?:\/\/\.)?(www\.)/;
   var url = new RegExp(regexQuery);
   if (url.test(websiteUrl.val())) {
     createBookmark();
   }else{
   alert('Please enter a valid URL')
   }     
};

// function noInput() {
//   if (websiteTitle.value === '' && websiteUrl.value === '') {
//     alert('Error: Enter a Title and Link');
//   } else if (websiteUrl.value === '' || websiteTitle.value === '') {
//     alert('Error: Enter a Title and Link');
//   } else { 
//     createBookmark();
//   };
//  };  
