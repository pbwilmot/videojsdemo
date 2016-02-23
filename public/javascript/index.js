var closeFrame = document.getElementById('close-iframe');
var toggleSlider = document.getElementById('toggle-slider');
var slider = document.getElementById('slider');
var closeBtn = document.getElementById('toggle-close');
var contentVideo = document.getElementById('content_video');
var adMuted = false;

toggleSlider.addEventListener('click', function(){
  showHide();
});

closeFrame.addEventListener('click', function() {
  showHide();
});

closeBtn.addEventListener('click', function() {
  toggleCloseBtn();
});

window.addEventListener('scroll', function() {
  startInView();
});

// contentVideo.addEventListener('mouseover', function() {
//   adsManager.setVolume(0);
// });

adsManager = adsManagerLoadedEvent.getAdsManager(
    contentPlayheadTracker, adsRenderingSettings);

document.getElementById('ima-sample-videoplayer').addEventListener('mouseover', function() {
  console.log('hi');
  var muteDiv = document.getElementById('ima-mute-div');
  if (adMuted) {
    muteDiv.className = 'ima-non-muted';
    adsManager.setVolume(1);
    // Bubble down to content player
    player.muted(false);
    adMuted = false;
    sliderLevelDiv.style.width = player.volume() * 100 + "%";
  } else {
    muteDiv.className = 'ima-muted';
    adsManager.setVolume(0);
    // Bubble down to content player
    player.muted(true);
    adMuted = true;
    sliderLevelDiv.style.width = "0%";
  }
});


function showHide() {
  if (slider) {
    if (slider.style.height === '0px') {
      slider.style.height = 364;
    } else {
      slider.style.height = 0;
    }
  }
}

function toggleCloseBtn() {
  if (closeFrame.style.display === 'none') {
    closeFrame.style.display = 'block';
  } else {
    closeFrame.style.display = 'none';
  }
}

function startInView() {
  if (viewability.vertical(document.getElementById('slider')).value <= 0.50) {
    console.log('hi');
  }
}
