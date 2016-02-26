$('select').material_select();

$('#setup-form').submit(function(e) {
  e.preventDefault();
  verticle = $('#verticle').val();
  type = $('#type').val();
  query = $('#setup-form input').not('[value=""]').serialize();
  query += '&type=' + type;
  var parent, url;

  if (document.getElementById('randomid')) {
   var url = 'http://localhost:8080/?' + query;
    replaceIframe(url)
  }
  
});

$('#verticle').change(function() {
  verticle = $('#verticle').val();
  url = 'http://localhost:8080/test/post/' + verticle;
  parent = document.getElementById('content');
  if ($('#randomid').contents().find('.iframe-new').length > 0) {
    addIFrame(parent, url);
    $('#randomid').load(function () {
      query = $('#setup-form input').not('[value=""]').serialize();
      type = $('#type').val();
      query += '&type=' + type;
      var url = 'http://localhost:8080/?' + query;
      replaceIframe(url);  
    });
  } else {
    addIFrame(parent, url);
  }
});

function replaceIframe(source) {
  height = $('#randomid').contents().find('#iframe-div').height();
  width = $('#randomid').contents().find('#iframe-div').width();

  $('#randomid')
    .contents()
    .find('#iframe-replace')
    .replaceWith("<iframe class='iframe-new' id='iframe-replace' src='" + source + "' width='" + width + "' height='" + height + "'></iframe>");
    
  $('#randomid')
    .contents()
    .find('#iframe-replace').load(function () {
      $(this)
        .contents()
        .find('#BuzzAdDiv')
        .attr("style","position: absolute;top: 0;left: 0;width: 100%;height: 100%;");    
    });
};

function addIFrame(parent, source, adSettings) {
  var iframe = document.createElement('iframe');
  iframe.frameBorder = "0";
  iframe.style.width = "100%";
  iframe.style.height = "100vh";
  iframe.id = "randomid";
  iframe.src = source;
  if (document.getElementById('randomid')) {
    parent.replaceChild(iframe, document.getElementById('randomid'))
  } else {
    parent.appendChild(iframe);   
  }
  
  $('.progress').show();
  $('#randomid').load(function () {
    $('.progress').css('display', 'none');
  });
};

$('#setup-form input[type=text').not($('#setup-form .select-dropdown')).keyup(function(e) {
  $('#setup-form input[type=text')
    .not(e.target)
    .not($('#setup-form .select-dropdown'))
    .val("");
});