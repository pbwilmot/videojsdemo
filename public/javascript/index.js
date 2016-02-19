var closeFrame = $('#close-iframe');
var slider = $('.toggle-slider');
var closeBtn = $('.toggle-close-btn');

slider.click(function() {
  showHide();
});

closeFrame.click(function(){
  showHide();
});

closeBtn.click(function() {
  toggleCloseBtn();
});

function showHide() {
  if ($('#slider')) {
    if ($('#slider').height() === 0) {
      $('#slider').height(364);
    } else {
      $('#slider').height(0);
    }
  }
}

function toggleCloseBtn() {
  if ($('#close-iframe').css('display') === 'none') {
    setTimeout(function() {
      $('#close-iframe').fadeIn();
    }, 2000);
  } else
  $('#close-iframe').fadeOut();
}
