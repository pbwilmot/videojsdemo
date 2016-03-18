$('select').material_select();

$('#top-read-image').hide();
$('#in-read-image').hide();

$('#setup-form').submit(function(e) {
  e.preventDefault();
  var query = createQuery();
  var adType = $('#ad-type').val();
  var parent = document.getElementById('content');
  var url = createUrl();
  if ($('#randomid').contents().find('.iframe-new').length > 0 && adType !== 'native') {
      replaceIframe(query);
  } else {
    addIFrame(parent, url);
    $('#randomid').load(function () {
      replaceIframe(query);
    });
  }
  $('#share-link').val('');
  $('#share-input').hide();
  if (adType !== 'native') {
    $('#share-btn').show();
  } else {
    $('#share-btn').hide();
  }
  $('.event-non-fired').removeClass('event-fired');
});

$('#share-btn').click(function() {
  var adType = $('#ad-type').val();
  var vertical = $('#vertical').val() + '-post';
  var url = '/mediakit/post/' + vertical;
  var shareableLink = window.location.origin + url + createQuery() + '&shared=true';
  $('#share-link').val(shareableLink);
  $('#share-input').show();
});

$('#vertical').change(function() {
  var url = createUrl();
  var adType = $('#ad-type').val();
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

  $('#share-link').val('');
  $('#share-input').hide();
  if (adType !== 'native') {
    $('#share-btn').show();
  } else {
    $('#share-btn').hide();
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
    var url = createUrl();
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

function loadExternalIframe(source, query) {
  var type = '#' + query.readtype;
  var closeBtnOn = query.close;
  var height = $(type).height();
  var width = $(type).width();
  var percent;
  $(type).replaceWith("<iframe class='iframe-new' id='" + type + "' src=/" + source + " width='" + width + "' height='" + height + "'></iframe>");
  $('.iframe-new').load(function() {
    $('.iframe-new')
      .contents()
      .find('#BuzzAdDiv')
      .attr("style","position: absolute;top: 0;left: 0;width: 100%;height: 100%;");

    if (closeBtnOn === 'true') {
      $('.iframe-new')
        .parent()
        .css('position', 'relative')
        .append('<button id="close-iframe" style="position: absolute; top: 5px; right: 10px; background-color: transparent; color: white; border: none; font-size: 1.75em; box-shadow: none; padding: 0">x</button>');
    }

    $(window).scroll(function() {
      if (query.playpause === 'true') {
        query.viewpercent === '50' ? percent = 0.50 : percent = 1.00;
        playOrPauseView(document.getElementsByClassName('iframe-new')[0], percent);
      }
    });
  });
}

function queryToJSON() {
 var pairs = location.search.slice(1).split('&');
 var result = {};
 pairs.forEach(function(pair) {
   pair = pair.split('=');
   result[pair[0]] = decodeURIComponent(pair[1] || '');
 });

 return JSON.parse(JSON.stringify(result));
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

  if ($('#randomid').contents().find('#close-iframe').length > 0) {
    $('#randomid')
      .contents()
      .find('#' + type)
      .parent()
      .find('button')
      .remove();
  }

  $('#randomid')
    .contents()
    .find('#' + type).load(function () {
      $(this)
        .contents()
        .find('#BuzzAdDiv')
        .attr("style","position: absolute;top: 0;left: 0;width: 100%;height: 100%;");
      if (closeBtnOn === 'true') {
        $('#randomid')
          .contents()
          .find('#' + type)
          .parent()
          .css('position', 'relative')
          .append('<button id="close-iframe" style="position: absolute; top: 5px; right: 10px; background-color: transparent; color: white; border: none; font-size: 1.75em; box-shadow: none; padding: 0">x</button>');
      }
    });

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
  var elementInView;
  if ($('#randomid').length > 0) {
    elementInView = viewability.vertical($('#randomid').contents().find('#' + type)[0]).value;
  } else {
    elementInView = viewability.vertical(type).value;
  }
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
         $('#share-btn').show();
       });
       $('.event-non-fired').removeClass('event-fired');
    });
  });
}

function createQuery() {
  var type = $('#type').val();
  var view = $('#viewabilityPercent').val();
  if (validateSrc(type)) {
    $('#src').val(validateSrc(type));
    var query = '/?' + $('#setup-form input').not('[value=""]').serialize();
    query += '&type=' + type + '&viewpercent=' + view;
    return query;
  } else {
    return alert('not a valid url for ' + type);
  }
}

function createUrl() {
  var url;
  var adType = $('#ad-type').val();
  if (adType === 'sponsored') {
    vertical = $('#vertical').val() + '-post';
    url = '/mediakit/post/' + vertical;
    return url;
  } else {
    vertical = $('#vertical').val();
    url = '/mediakit/' + vertical;
    return url;
  }
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
