$('select').material_select();

$('#setup-form').submit(function(e) {
  e.preventDefault();

  var type = $('#type').val();

  if (validateSrc(type)) {
    $('#src').val(validateSrc(type));
    var query = $('#setup-form input').not('[value=""]').serialize();
    query += '&type=' + type;
    var url = '/?' + query;
    replaceIframe(url);
  } else {
    alert('not a valid url for ' + type);
  }
  $('.event-non-fired').removeClass('event-fired');
});

$('#verticle').change(function() {
  var verticle = $('#verticle').val();
  var url = '/test/post/' + verticle;
  var parent = document.getElementById('content');
  if ($('#randomid').contents().find('.iframe-new').length > 0) {
    var innerSrc = $('#randomid').contents().find('.iframe-new').attr('src');
    addIFrame(parent, url);
    $('#randomid').load(function () {
      replaceIframe(innerSrc);
    });
    $('.event-non-fired').removeClass('event-fired');
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

function replaceIframe(source) {
  var height, width;
  if ($('#randomid').contents().find('.iframe-new').length > 0) {
    height = $('#randomid').contents().find('#iframe-replace').height();
    width = $('#randomid').contents().find('#iframe-replace').width();
  } else {
    height = $('#randomid').contents().find('#iframe-div').height();
    width = $('#randomid').contents().find('#iframe-div').width();
  }

  var verticle = $('#verticle').val();

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

    $('#randomid')
      .contents()
      .find('#iframe-div')
      .css('position', 'relative')
      .append('<button id="close-iframe" style="position: absolute; top: 10px; right: 10px; background-color: transparent; color: white; border: none; font-size: 20px; box-shadow: none; padding: 0">x</button>');

  $('#randomid')
    .contents()
    .find('#iframe-replace')
    .load(function() {
      $('#randomid')
        .contents()
        .find('#iframe-div')
        .css('position', 'relative')
        .find('#close-iframe')
        .on('click', function() {
          $('#randomid').contents().find('#iframe-replace').slideToggle(1000);
          player('pause');
          $(this).remove();
        });
  });

  if (verticle === 'male-lifestyle-post') {
    $('#randomid')
    .contents()
    .find('#iframe-replace').load(function () {
      $('#randomid')
        .contents()
        .find('#iframe-replace')
        .slideToggle();
    });
    $('#randomid').contents().scroll(function() {
      startInView();
    });
  }
  var closeIframe = $('#randomid').contents().find('#iframe-div').find('#close-iframe');
  $('#randomid').contents().scroll(function() {
    if ($("input[name='playpause']:checked").val() === 'true' && closeIframe.is(':visible')) {
      pauseOutOfView();
    }
  });
  $('#randomid').contents().scroll(function() {
    if ($("input[name='playpause']:checked").val() === 'true' && closeIframe.is(':visible')) {
      resumeInView();
    }
  });
}

function startInView() {
  if (viewability.vertical($('#randomid').contents().find('#overhere')[0]).value >= 0.75) {
    $('#randomid')
      .contents()
      .find('#iframe-replace')
      .slideDown(1000);
  }
}

function pauseOutOfView() {
  if (viewability.vertical($('#randomid').contents().find('#iframe-div')[0]).value <= 0.50) {
    player('pause');
  }
}

function resumeInView() {
  if (viewability.vertical($('#randomid').contents().find('#iframe-div')[0]).value >= 0.50) {
    player('play');
  }
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
    default:
      return url;
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
