$(document).ready(function() {
  var mese = 1;
  var year = 2018;
  var baseMonth = moment(
    {
      year: year,
      month: baseMonth
    }
  );
  calcoloMesi(mese);
  feste(mese)
  $('#next').click(function(){
    mese++;
    if (12 < mese) {
      alert('solo per il 2018')
      mese--;
    }
    else {
      calcoloMesi(mese);
      feste(mese);
    }
    // var questoMese = $('h2').attr('data-this-month');
    // var date = moment(questoMese).add(1, 'months');

  });
  $('#prev').click(function () {
    mese--;
    if (1 > mese) {
      alert('solo per il 2018')
      mese++;
    }
    else {
      calcoloMesi(mese);
      feste(mese);
    }
    // var questoMese = $('h2').attr('data-this-month');
    // var date = moment(questoMese).subtract(1, 'months');
  });
});

// funzione generica che vale per tutti i mesi
function calcoloMesi (mese) {
  $('.calendario').html('');
  $('h2').text(moment().month(mese-1).format('MMM'));
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
function feste(mese) {
  $.ajax({
    url : "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month="+(mese-1),
    method : "GET",
    success : function (data) {
      console.log(data.response);
      for (var i = 0; i < data.response.length; i++) {
        $("li.day").each(function () {
          if ($(this).attr("data") == data.response[i].date) {
            $(this).addClass("red");
            // var source = $("#entry-template").html();
            // var template = Handlebars.compile(source);
            // var context = {
            //   name : data.response[i].name,
            // }
            // var html = template(context);
            $(this).append(data.response[i].name)
          };
        })
      }
      },
      erorr : function (richiesta,stato,errore) {
        alert("errore"+errore)
      }
    });
  }

function addZero (num) {
  if ( num < 10) {
    return '0' + num
  }
  else {
    return num
  }
}
