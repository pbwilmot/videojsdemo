$('select').material_select();

$('.choose-type').on('click', function() {
  $('.li-type').hide();
  id = $(this).val();
  $('#' + id.toLowerCase()).toggle();
});

$('#setup-form').submit(function(e) {
  e.preventDefault();
  verticle = $('#verticle').val();
  type = $('#type').val();
  query = $('#setup-form input').not('[value=""]').serialize();
  query += '&type=' + type;
  var parent, url;
  if (document.getElementById('randomid')) {
    url = 'http://localhost:8080/?' + query;
    parent = document.getElementById('randomid').contentWindow.document.getElementsByClassName('iframe-div');  
  } else {
    url = 'http://localhost:8080/test/post/' + verticle + '/?' + query;
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
    document.getElementById('randomid').contentWindow.document.getElementById('iframe-player').src = source;
  } else {
    parent.appendChild(iframe); 
  }
  $('.progress').show();
  
  if ($('iframe').contents().find('iframe')) {
    $('iframe').contents().find('iframe').load(function () {
      $('.progress').css('display', 'none');
    });
  } else {
    $('iframe').load(function () {
      $('.progress').css('display', 'none');
    });
  };
}

$('.collapsible-header').on('click', function(e) {
  $(this).find("[type=radio]").attr('checked', true);
})

$('#setup-form input[type=text').not($('#setup-form .select-dropdown')).keyup(function(e) {
  $('#setup-form input[type=text')
    .not(e.target)
    .not($('#setup-form .select-dropdown'))
    .val("");
});