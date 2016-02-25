//allows div to be draggable if position is fixed
$.fn.draggable = function(){
  var $this = this,
  ns = 'draggable_'+(Math.random()+'').replace('.',''),
  mm = 'mousemove.'+ns,
  mu = 'mouseup.'+ns,
  $w = $(window),
  isFixed = ($this.css('position') === 'fixed'),
  adjX = 0, adjY = 0;

  $this.mousedown(function(ev){
    var pos = $this.offset();
    if (isFixed) {
      adjX = $w.scrollLeft(); adjY = $w.scrollTop();
    }
    var ox = (ev.pageX - pos.left), oy = (ev.pageY - pos.top);
    $this.data(ns,{ x : ox, y: oy });
    $w.on(mm, function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      if (isFixed) {
        adjX = $w.scrollLeft(); adjY = $w.scrollTop();
      }
      var offset = $this.data(ns);
      $this.css({left: ev.pageX - adjX - offset.x, top: ev.pageY - adjY - offset.y});
    });
    $w.on(mu, function(){
      $w.off(mm + ' ' + mu).removeData(ns);
    });
  });

  return this;
};

$('#setup').draggable();
$('select').material_select();

$('.choose-type').on('click', function() {
  $('.li-type').hide();
  id = $(this).val();
  $('#' + id.toLowerCase()).toggle();
});

$('#setup-form').submit(function(e) {
  e.preventDefault();
  verticle = $('#verticle').val();
  query = $('#setup-form input').not('[value=""]').serialize();
  var parent = document.getElementById('content');
  url = 'http://localhost:8080/test/post/' + verticle + '/?' + query;
  
  if (document.getElementById('randomid')) {
    parent = document.getElementById('randomid').contentWindow.document.getElementsByClassName('image-inner');  
  }
  else {
    parent = document.getElementById('content');
  } 
  addIFrame(parent, url);
});


function addIFrame(parent, source, adSettings) {
  var iframe = document.createElement('iframe');
  iframe.frameBorder = "0";
  iframe.style.width = "100%";
  iframe.style.height = "100vh";
  iframe.id = "randomid";
  iframe.src = source;
  if (parent.length) {
    parent[0].innerHTML = iframe;  
  }
  else {
    parent.appendChild(iframe); 
  }
  $('.progress').show();
  $('#randomid').load(function () {
    $('.progress').css('display', 'none');
  });
}

$('.collapsible-header').on('click', function(e) {
  $(this).find("[type=radio]").attr('checked', true);
})