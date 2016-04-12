$('#keyword-form').submit(function(e) {
  e.preventDefault();
  var positive = $('#keyword-positive').val().split(',');
  var negative = $('#keyword-negative').val().split(',');

  for (var i = 0; i < positive.length; i++) {
    $('#randomid').contents().find('body').highlight(positive[i], 'keyword-positive');
  }

  for (var x = 0; x < negative.length; x++) {
    $('#randomid').contents().find('body').highlight(negative[x], 'keyword-negative');
  }
});
