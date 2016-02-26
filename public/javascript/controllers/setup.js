$('select').material_select();

$('#setup-form').submit(function(e) {
  e.preventDefault();
  verticle = $('#verticle').val();
  type = $('#type').val();
  query = $('#setup-form input').not('[value=""]').serialize();
  query += '&type=' + type;
  var parent, url;

  if (document.getElementById('randomid')) {
   url = 'http://localhost:8080/?' + query;
   replaceIframe(url);
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

$('#type').change(function(e) {
  if ($('#type').val() === 'VIDEO') {
    $('#input-poster').show();
  } else {
    $('#input-poster').hide();
    $('#poster').val('');
  }
});

window.addEventListener('message', function(e) {
  console.log('hi');
  if (event.origin !== 'http://localhost:8080/test') {
    return;
  }
  console.log(event.data);
}, false);

// clear value if not dispay video
// window.postmessage listen for events that come form window.postmessage
// string is first parameter, second is the domain being sent to (*)
// each meessage fires an event
// each event is going to a metcic
// display the metcic a a line item
// can use window.onMessage

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
}

function addIFrame(parent, source, adSettings) {
  var iframe = document.createElement('iframe');
  iframe.frameBorder = "0";
  iframe.style.width = "100%";
  iframe.style.height = "100vh";
  iframe.id = "randomid";
  iframe.src = source;
  if (document.getElementById('randomid')) {
    parent.replaceChild(iframe, document.getElementById('randomid'));
  } else {
    parent.appendChild(iframe);
  }

  $('.progress').show();
  $('#randomid').load(function () {
    $('.progress').css('display', 'none');
  });
}
