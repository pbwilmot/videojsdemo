$('select').material_select();

$('#top-read-image').hide();
$('#in-read-image').hide();

$('#setup-form').submit(function(e) {
  e.preventDefault();
  var type = $('#type').val();
  var adType = $('#ad-type').val();
  var url, verticle;
  if (validateSrc(type)) {
    $('#src').val(validateSrc(type));
    var query = '/?' + $('#setup-form input').not('[value=""]').serialize();
    query += '&type=' + type;
    var parent = document.getElementById('content');
    if (adType === 'sponsored') {
      verticle = $('#verticle').val() + '-post';
      url = '/mediakit/post/' + verticle;
    } else {
      verticle = $('#verticle').val();
      url = '/mediakit/' + verticle;
    }
    if ($('#randomid').contents().find('.iframe-new').length > 0 && adType !== 'native' && url.indexOf('-post') > -1 ) {
        replaceIframe(query);
    } else {
      addIFrame(parent, url);
      $('#randomid').load(function () {
        replaceIframe(query);
      });
    }
  } else {
    alert('not a valid url for ' + type);
  }
  $('.event-non-fired').removeClass('event-fired');
});


$('#verticle').change(function() {
  var adType = $('#ad-type').val();
  if (adType === 'sponsored') {
    verticle = $('#verticle').val() + '-post';
    url = '/mediakit/post/' + verticle;
  } else {
    verticle = $('#verticle').val();
    url = '/mediakit/' + verticle;
  }
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
  $('.event-non-fired').removeClass('event-fired');
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
  var type = $( "input[name='readtype']:checked" ).val();
  if ($('#randomid').contents().find('.iframe-new').length > 0 && $('#randomid').contents().find('#' + type).find('img').length >= 1) {
    var verticle;
    var adType = $('#ad-type').val();
    if (adType === 'sponsored') {
      verticle = $('#verticle').val() + '-post';
      url = '/mediakit/post/' + verticle;
    } else {
      verticle = $('#verticle').val();
      url = '/mediakit/' + verticle;
    }
    var url = '/mediakit/post/' + verticle;
    var parent = document.getElementById('content');
    var innerSrc = $('#randomid').contents().find('.iframe-new').attr('src');
    addIFrame(parent, url);

    $('#randomid').load(function () {
      loadIframe(source, type);
    });

  } else {
    loadIframe(source, type);
  }
}

function loadIframe(source, type) {
  var height, width;
  height = $('#randomid').contents().find('#' + type).height();
  width = $('#randomid').contents().find('#' + type).width();

  var verticle = $('#verticle').val();

  $('#randomid')
    .contents()
    .find('#' + type)
    .replaceWith("<iframe class='iframe-new' id='" + type + "' src='" + source + "' width='" + width + "' height='" + height + "'></iframe>");

  $('#randomid')
    .contents()
    .find('#' + type).load(function () {
      $(this)
        .contents()
        .find('#BuzzAdDiv')
        .attr("style","position: absolute;top: 0;left: 0;width: 100%;height: 100%;");
    });

    if ($('#randomid').contents().find('#close-iframe').length < 1) {
      $('#randomid')
        .contents()
        .find('#' + type)
        .parent()
        .css('position', 'relative')
        .append('<button id="close-iframe" style="position: absolute; top: 10px; right: 10px; background-color: transparent; color: white; border: none; font-size: 20px; box-shadow: none; padding: 0">x</button>');
    }

  $('#randomid')
    .contents()
    .find('#' + type)
    .load(function() {
      $('#randomid')
        .contents()
        .find('#' + type)
        .parent()
        .css('position', 'relative')
        .find('#close-iframe')
        .on('click', function() {
          $('#randomid').contents().find('#' + type).slideUp(1000);
          player('pause');
          $(this).remove();
      });
  });
  var closeIframe = $('#randomid').contents().find('#' + type).parent().find('#close-iframe');
  $('#randomid').contents().scroll(function() {
    if ($("input[name='playpause']:checked").val() === 'true' && closeIframe.is(':visible')) {
      pauseOutOfView(type);
    }
  });
  $('#randomid').contents().scroll(function() {
    if ($("input[name='playpause']:checked").val() === 'true' && closeIframe.is(':visible')) {
      resumeInView(type);
    }
  });
}

function startInView() {
  if (viewability.vertical($('#randomid').contents().find('#overhere')[0]).value >= 0.75) {
    $('#randomid')
      .contents()
      .find('#' + type)
      .slideDown();
  }
}

function pauseOutOfView(type) {
  if (viewability.vertical($('#randomid').contents().find('#' + type)[0]).value <= 0.50) {
    player('pause');
  }
}

function resumeInView(type) {
  if (viewability.vertical($('#randomid').contents().find('#' + type)[0]).value >= 0.50) {
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
     $('#randomid').contents().find('body').contents().find('.native-ad').click(function() {
      var verticle = $('#verticle').val() + '-post';
      var url = '/mediakit/post/' + verticle;
      var parent = document.getElementById('content');
      if ($('#randomid').contents().find('.iframe-new').length > 0) {
        var innerSrc = $('#randomid').contents().find('.iframe-new').attr('src');
        addIFrame(parent, url);
        $('#randomid').load(function () {
          replaceIframe(innerSrc);
        });
        $('.event-non-fired').removeClass('event-fired');
      } else {
        var type = $('#type').val();
        if (validateSrc(type)) {
          $('#src').val(validateSrc(type));
          var query = '/?' + $('#setup-form input').not('[value=""]').serialize();
          query += '&type=' + type;
          addIFrame(parent, url);
          $('#randomid').load(function () {
            replaceIframe(query);
          });
        } else {
          alert('not a valid url for ' + type);
        }
      }
      $('.event-non-fired').removeClass('event-fired');
    });
  });
}

function validateSrc(type) {
  var url = $.trim($('#src').val());
  switch(type) {
    case 'YOUTUBE':
      return validateYouTubeUrl(url);
    case 'TWITCH':
      return validateTwitchUrl(url);
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
  var regEXP = /^.*(twitch\.tv)\/?([^#\&\?]*).*/;
  var match = url.match(regEXP);

  if (match && match[1] === 'twitch.tv') {
    return match[2];
  } else {
    return url;
  }
}
