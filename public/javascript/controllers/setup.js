$('select').material_select();

$('#setup-form').submit(function(e) {
  e.preventDefault();

  type = $('#type').val();

  if (validateSrc(type)) {
    verticle = $('#verticle').val();
    $('#src').val(validateSrc(type));
    query = $('#setup-form input').not('[value=""]').serialize();
    query += '&type=' + type;
    url = 'http://localhost:8080/?' + query;
    replaceIframe(url);
  } else {
    console.log('not a valid url for ' + type);
  }

});

$('#verticle').change(function() {
  var verticle = $('#verticle').val();
  var url = 'http://localhost:8080/test/post/' + verticle;
  var parent = document.getElementById('content');
  if ($('#randomid').contents().find('.iframe-new').length > 0) {
    var innerSrc = $('#randomid').contents().find('.iframe-new').attr('src');
    addIFrame(parent, url);
    $('#randomid').load(function () {
      replaceIframe(innerSrc);
    });
  } else {
    addIFrame(parent, url);
  }
});

$('#type').change(function() {
  if ($('#type').val() === 'VIDEO') {
    $('#input-poster').show();
  } else {
    $('#input-poster').hide();
    $('#poster').val('');
  }
});

window.addEventListener('message', function(e) {
  // messages handled here for metrics
  if (e.origin !== 'http://localhost:8080/test') {
    return;
  }
  console.log(e.data);
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


function validateSrc(type) {
  var url = $.trim($('#src').val());
  switch(type) {
    case 'YOUTUBE':
      return validateYouTubeUrl(url);
      break;
    case 'TWITCH':
      return validateTwitchUrl(url);
      break;
  }
}

function validateYouTubeUrl(url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if ((match && match[2].length) == 11) {
    return match[2];
  } else if (url.length == 11) {
    return url;
  } else {
    return false;
  }
}

function validateTwitchUrl(url) {
  var regEXP = /^.*(twitch\.tv)\/?([^#\&\?]*).*/
  var match = url.match(regEXP);

  if (match && match[1] === 'twitch.tv') {
    return match[2];
  } else {
    return url;
  }
}
