function twitterLoader(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
      p = /^http:/.test(d.location) ? 'http' : 'https';
  if (!d.getElementById(id)) {
      js = d.createElement(s);
      js.id = id;
      js.src = p + '://platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js, fjs);
  }
}

function facebookLoader(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=1699353300277593";
    fjs.parentNode.insertBefore(js, fjs);
}

function PopupCenter(url, width, height) {
    var leftPosition, topPosition;
    //Allow for borders.
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    //Open the window.
    window.open(url, "Window2",
    "status=no,height=" + height + ",width=" + width + ",resizable=yes,left="
    + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY="
    + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no");
}

function loadSocialBtns(type, source) {
  if (type === 'TWITCH') {
    url = "https://twitch.tv/" + source;
  } else if (type === 'YOUTUBE') {
    url = "https://www.youtube.com/watch?v=" + source;
  } else if (type === 'VINE') {
    url = 'https://vine.co/v/' + source;
  } else if (type === 'VIDEO') {
    url = parent.parent.window.location.href;
  }

  var fbShareBtn = document.getElementById('facebook-share');
  var twtrShareBtn = document.getElementById('twitter-share');
  var linkShareBtn = document.getElementById('linkedin-share');
  var emailShareBtn = document.getElementById('email-share');
  var googleShareBtn = document.getElementById('google-share');
  var stumbleShareBtn = document.getElementById('stumble-share');
  var redditShareBtn = document.getElementById('reddit-share');

  var text = encodeURI('This is great!');
  var via = 'Advertiser';
  var twitterLink = 'https://twitter.com/intent/tweet?text=' + text + '&via=' + via + '&url=' + encodeURIComponent(url);

  var message = 'Hey, I saw this video and thought of you.';
  var email = 'mailto:?to=&body=' + message + ' \n' + encodeURIComponent(url) + '&subject=Check This Out!';

  var facebookLink = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);

  var linkedinLink = "https://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(url);

  var googlePlusLink = "https://plus.google.com/share?url=" + encodeURIComponent(url);

  var stumbleLink = 'http://www.stumbleupon.com/submit/?url=' + encodeURIComponent(url) + '&feature=share';

  var redditLink = '//www.reddit.com/submit?url=' + encodeURIComponent(url);

  twtrShareBtn.setAttribute('href', twitterLink);
  emailShareBtn.setAttribute('href', email);

  fbShareBtn.addEventListener('click', function(e) {
    e.preventDefault();
    PopupCenter(facebookLink, 626, 436);
  });

  linkShareBtn.addEventListener('click', function(e) {
    e.preventDefault();
    PopupCenter(linkedinLink, 626, 436);
  });

  googleShareBtn.addEventListener('click', function(e) {
    e.preventDefault();
    PopupCenter(googlePlusLink, 626, 436);
  });

  stumbleShareBtn.addEventListener('click', function(e) {
    e.preventDefault();
    PopupCenter(stumbleLink, 626, 436);
  });

  redditShareBtn.addEventListener('click', function(e) {
    e.preventDefault();
    PopupCenter(redditLink, 1000, 600);
  });

  twitterLoader(document, 'script', 'twitter-wjs');
  facebookLoader(document, 'script', 'facebook-jssdk');
}
