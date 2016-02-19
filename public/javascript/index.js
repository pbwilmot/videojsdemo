var show = document.getElementById('slider-show');
var hide = document.getElementById('slider-hide');
var closeFrame = document.getElementById('close-iframe');

show.addEventListener('click', function(){
  showHide('slider');
});

hide.addEventListener('click', function(){
  showHide('slider');
});

closeFrame.addEventListener('click', function() {
  showHide('slider');
});

function showHide(shID) {
  if (document.getElementById(shID)) {
    if (document.getElementById('slider').style.height === '0px') {
      document.getElementById(shID+'-show').style.display = 'none';
      document.getElementById(shID+'-hide').style.display = 'inline';
      document.getElementById(shID).style.height = '364px';
    } else {
      document.getElementById(shID+'-show').style.display = 'inline';
      document.getElementById(shID+'-hide').style.display = 'none';
      document.getElementById(shID).style.height = '0px';
    }
  }
}
