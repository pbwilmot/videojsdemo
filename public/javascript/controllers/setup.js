$('.choose-type').on('click', function() {
	$('.li-type').hide();
	id = $(this).val();
	$('#' + id).toggle();
});

$('#setup-form').submit(function(e) {
	e.preventDefault();
	query = $('#setup-form input').not('[value=""]').serialize();
	console.log(query);
});