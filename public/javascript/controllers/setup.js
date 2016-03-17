$('select').material_select();

$('#top-read-image').hide();
$('#in-read-image').hide();

$('#setup-form').submit(function(e) {
  e.preventDefault();
  var query = createQuery();
  var adType = $('#ad-type').val();
  var url, vertical;
  var parent = document.getElementById('content');
  if (adType === 'sponsored') {
    vertical = $('#vertical').val() + '-post';
    url = '/mediakit/post/' + vertical;
  } else {
    vertical = $('#vertical').val();
    url = '/mediakit/' + vertical;
  }
  if ($('#randomid').contents().find('.iframe-new').length > 0 && adType !== 'native') {
      replaceIframe(query);
  } else {
    addIFrame(parent, url);
    $('#randomid').load(function () {
      replaceIframe(query);
    });
  }
  $('.event-non-fired').removeClass('event-fired');
});

$('#vertical').change(function() {
  var adType = $('#ad-type').val();
  if (adType === 'sponsored') {
    vertical = $('#vertical').val() + '-post';
    url = '/mediakit/post/' + vertical;
  } else {
    vertical = $('#vertical').val();
    url = '/mediakit/' + vertical;
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

$('input:radio[name="playpause"]').change(function() {
  if ($('#playpausetrue').is(':checked')) {
    $('#input-viewability').show();
  } else {
    $('#input-viewability').hide();
    $('#viewabilityPercent').val('');
  }
});

function replaceIframe(source) {
  var type = $( "input[name='readtype']:checked" ).val();
  if ($('#randomid').contents().find('.iframe-new').length > 0 && $('#randomid').contents().find('#' + type).find('img').length >= 1) {
    var vertical;
    var adType = $('#ad-type').val();
    if (adType === 'sponsored') {
      vertical = $('#vertical').val() + '-post';
      url = '/mediakit/post/' + vertical;
    } else {
      vertical = $('#vertical').val();
      url = '/mediakit/' + vertical;
    }
    var url = '/mediakit/post/' + vertical;
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
  var closeBtnOn = $("input[name='close']:checked").val();
  var vertical = $('#vertical').val();

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

    if ($('#randomid').contents().find('#close-iframe').length < 1 && closeBtnOn === 'true') {
      $('#randomid')
        .contents()
        .find('#' + type)
        .parent()
        .css('position', 'relative')
        .append('<button id="close-iframe" style="position: absolute; top: 5px; right: 10px; background-color: transparent; color: white; border: none; font-size: 1.75em; box-shadow: none; padding: 0">x</button>');
    } else {
      $('#randomid')
        .contents()
        .find('#' + type)
        .parent()
        .find('button')
        .remove();
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
  var percent;
  $('#randomid').contents().scroll(function() {
    if ($("input[name='playpause']:checked").val() === 'true') {
      $('#viewabilityPercent').val() === '50' ? percent = 0.50 : percent = 1.00;
      playOrPauseView(type, percent);
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

function playOrPauseView(type, percent) {
  var elementInView = viewability.vertical($('#randomid').contents().find('#' + type)[0]).value;
  if (elementInView < percent) {
    player('pause');
  } else if (elementInView >= percent) {
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

  $('.progress-overlay').show();
  $('#randomid').load(function () {
    $('.progress-overlay').css('display', 'none');
     $('#randomid').contents().find('body').contents().find('.native-ad').click(function(e) {
       e.preventDefault();
       var query = createQuery();
       var href = $(this).closest('a').attr('href');
       var parent = document.getElementById('content');
       href += query;
       addIFrame(parent, href);
       $('#randomid').load(function () {
         replaceIframe(query);
       });
       $('.event-non-fired').removeClass('event-fired');
    });
  });
}

function createQuery() {
  var type = $('#type').val();
  if (validateSrc(type)) {
    $('#src').val(validateSrc(type));
    var query = '/?' + $('#setup-form input').not('[value=""]').serialize();
    query += '&type=' + type;
    return query;
  } else {
    return alert('not a valid url for ' + type);
  }
}

function validateSrc(type) {
  var url = $.trim($('#src').val());
  switch(type) {
    case 'YOUTUBE':
      return validateYouTubeUrl(url);
    case 'TWITCH':
      return validateTwitchUrl(url);
    case 'VINE' :
      return validateVineUrl(url);
    default:
      return url;
  }
}

function validateVineUrl(url) {
  var match = url.match('vine\.co\/v\/([^\/]*)');
  if (match && match[1]) {
    return match[1];
  }
  return url;
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
