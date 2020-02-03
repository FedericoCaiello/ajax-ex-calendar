$(document).ready(function() {
  var mese = 1;
  var url = 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month='+ (mese-1);
  calcoloMesi(mese);
  $()
  $.ajax (
    {
      url: url,
      method: 'Get',
      success: function (data) {
        for (var i = 0; i < data.response.length; i++) {
          $('li').each(function () {
            if (data.response[i].date == $(this).attr('data')) {
              $(this).addClass('red');
            }

          });
        }
      },
      error: function (richiesta, stato, errori) {
        alert('errori' + errori);
      }
    }
  )

});


function calcoloMesi (mese) {
  var giorniDelMese = moment("2018-" + mese).daysInMonth();
  for (var i = 0; i < giorniDelMese; i++) {
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var context = {
      data: i + 1,
      mese: moment().month(mese-1).format('MMM'),
      attr: '2018-'+ addZero(mese)+ '-' + addZero(i+1)
    };
    var html = template(context);
    $('.calendario').append(html);

  }
}
function addZero (num) {
  if ( num < 10) {
    return '0' + num
  }
  else {
    return num
  }
}
