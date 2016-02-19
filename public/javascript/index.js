var show = document.getElementById('example-show');
var hide = document.getElementById('example-hide');

show.addEventListener('click', function(){
  showHide('example');
});

hide.addEventListener('click', function(){
  showHide('example');
});

function showHide(shID) {
  if (document.getElementById(shID)) {
    if (document.getElementById('example').style.height === '0px') {
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
