// Forms Validation
var filterEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/;
$('.form-validate').submit(function () {
  var errors = 0;
  $(this).find('[data-required="text"]').each(function () {
    if ($(this).attr('data-required-email') === 'email') {
      if (!filterEmail.test($(this).val())) {
        $(this).addClass("redborder");
        errors++;
      }
      else {
        $(this).removeClass("redborder");
      }
      return;
    }
    if ($(this).val() === '') {
      $(this).addClass('redborder');
      errors++;
    } else {
      $(this).removeClass('redborder');
    }
  });
  if (errors === 0) {
    var form1 = $(this);
    $.ajax({
      type: "POST",
      url: 'form.php',
      data: $(this).serialize(),
      success: function (data) {
        form1.append('<p class="form-result">message has been sent successfully!</p>');
        $("form").trigger('reset');
      }
    });
  }
  return false;
});
$('.form-validate').find('[data-required="text"]').blur(function () {
  if ($(this).attr('data-required-email') === 'email' && ($(this).hasClass("redborder"))) {
    if (filterEmail.test($(this).val()))
      $(this).removeClass("redborder");
    return;
  }
  if ($(this).val() != "" && ($(this).hasClass("redborder")))
    $(this).removeClass("redborder");
});
