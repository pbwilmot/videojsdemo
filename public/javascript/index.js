var closeFrame = document.getElementById('close-iframe');
var toggleSlider = document.getElementById('toggle-slider');
var slider = document.getElementById('slider');
var closeBtn = document.getElementById('toggle-close');

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
