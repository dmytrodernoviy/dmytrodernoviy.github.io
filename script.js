$(document).ready(function() {
  $.ajax({
    url: 'https://randomuser.me/api/?results=100', // запрос к серверу на 100 человек
    success: function(data){ 
      showItemPerson(data.results) // вызов функции для отрисовки шаблона
    },
    complete: function() {
      setTimeout(function() {
        $("#cube-loader").fadeOut("slow") // скрываем прелоадер по завершению запроса
      }, 500)
    }
  });
// непосредственно функция для отрисовки шаблона LoDash
function showItemPerson(arr) {
  var tmpl = document.getElementById("template-grid").innerHTML.trim();
  tmpl = _.template(tmpl);
  document.getElementById("container").innerHTML = tmpl({
      list: arr
  })
}
// вешаем обработчики после обработки ajax-запроса
$(document).ajaxComplete(function(){
changeItemColor();
// функция, которая отслеживает клики по ".item .main-info" и показывает/скрывает допсодержимое
$(".main-info").click(function() {
  $(".main-info").not(this).removeClass("active")
  $(this).toggleClass("active");

  $(".main-info").each(function() {
    if($(this).hasClass("active")) {
      $(this).next().show()
      $(".vertical", this).hide()
    } else {
      $(this).next().hide()
      $(".vertical", this).show()
    }
  })
});

var chartForDestroy; // глобальная переменная для удаления ранее отрисованной диаграммы
// функция-обработчик для отрисовки диаграммы по клику на кнопку
$("#show-chart").click(function() { 
  $("#diagram").css("display", "block");
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      datasets: [{
          data: [calculatePercent().male, calculatePercent().female],
          backgroundColor: ['#414146', '#7db7ed']
        }],
        labels: [
          'Male ' + calculatePercent().male + "%", 
          'Female ' + calculatePercent().female + "%"
        ]
      },
      options: {
        legend: {
          position: 'top',
          labels: {
            fontSize: 26
          }
        },
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true
        },
        tooltips: {enabled: false}
      }
    });

  chartForDestroy = myChart;
})
// функция подсчета процентов женщин и мужчин для посторения диаграммы
function calculatePercent() {
  var allPerson = $(".item:visible").length;
  var femaleCount = $(".item[data-gender=female]:visible").length;
  var malePercent = ((allPerson - femaleCount)/allPerson * 100).toFixed(1);
  var femalePercent = (100 - malePercent).toFixed(1);

  return {male: malePercent, female: femalePercent}
}
// закрытие диграммы
$(".close").click(function(){
  $("#diagram").fadeOut(600);
  setTimeout(function() {
    chartForDestroy.destroy();
  }, 600)
})
// форматирование даты в нужный формат
$(".date").text(function() {
  return new Date($(this).html()).toLocaleDateString('en-US')
})
// функция-обработчик для реализации поиска по имени first_name
$("#search").click(function() {
  var value = $("#input-search").val().toLowerCase();
  $(".item").show();

  if(!value) alert("Пожалуйста, введите имя пользователя");
  $(".item").each(function(i,item) {
    var firstName = $(".main-info .first-name i", item).html().toLowerCase();
    if(!(firstName.startsWith(value))) {
      $(this).hide()
    }
  });
  // фильтрация ".item" после поиска
  var afterSearch = $(".item").filter(function() { 
    return $(this).css('display') == 'block';
  });

  if(afterSearch.length == 0) {
    alert("Совпадений нет");
    $("#input-search").val("");
    $(".item").show();
  };

  changeItemColor();
})
// отображение соответсвующей иконки пола пользователя
$(function changeGenderIcon() {
  $("img[data-gender]").each(function() {
    if($(this).data("gender") == "male") {
      $(this).attr("src","./img/male.png")
    } else {
      $(this).attr("src","./img/female.png")
    }
  })
});
// чередование цветов для ".item", нужна для правильно окрашивания после поиска
function changeItemColor() {
  $(".item").css("background", "");
  $(".item:visible").each(function(i) {
    if(i % 2 == 0) $(this).css("background", "#c9c9c9")
      })
    }
  })
});


