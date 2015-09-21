// $(".uptime_values").css("color", "grey"); 
// $("обращение к селектору: class или id").функция(работа над элементами, например изменение стилей, удаление эл-ов, добавление эл-ов)(значение);
// документация по jQuery - http://api.jquery.com/


/* Создаем тег p с классом medium_value */
$(".uptime_block").append("<p class='medium_value'></p>");

/* Создаем блок uptime_values */
$(".uptime_block").append("<div class='uptime_values'></div>")

/* Создаем блок uptime_graph */
$(".uptime_block").append("<div class='uptime_graph'></div>");

/* Генерируем случайное значение от 90 до 100 */

var minNumber = 90;
var maxNumber = 99;

var magic = 7;
var sum = 0;

var defineColor = function(number, elm)
{
  var porog_1 = 93;
  var porog_2 = 96;
  var porog_3 = 99;

    if (number < porog_1) {
    elm.addClass("less_then_94");
  } else if (number < porog_2 && number > porog_1) {
    elm.addClass("less_then_96");
  } else {
    elm.addClass("less_then_100");
  }

}

  var spanContainer = $(".uptime_values");
  var chart_elm = $(".uptime_graph");

for (var i = 0; i < magic; i++) 
{
  var randomNumber = (Math.random()*(maxNumber-minNumber+1)+minNumber);
  /* Вставляем значения случайных чисел в span элементы */
  spanContainer.append("<span>" + randomNumber.toFixed(2) + "</span>"); 

  var span = spanContainer.find("span").last();

  defineColor(randomNumber, span);

  sum += randomNumber;

  chart_elm.append("<div></div>");

  var chartDiv = chart_elm.find("div").last();
  chartDiv.css("height", randomNumber.toFixed(2) + "%");
}

var medium_value_elem = $(".medium_value");

/* Выводим среднее значение полученных данных от 90 до 100 */
var medium_number = sum/magic;
medium_value_elem.append(medium_number.toFixed(2));

defineColor(medium_number, medium_value_elem);







