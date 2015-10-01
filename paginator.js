$(document).ready(function() {

  var myBody = $('body');
  myBody.append("<div class='content'></div>");
  myBody.append("<div class='pagination'></div>");

  var pagination = $(".pagination");
  pagination.append("<div class='tostart'></div>");
  $(".tostart").text("в начало");

  pagination.append("<div class='previous'></div>");
  $(".previous").text("предыдущая");

  pagination.append("<div class='pagi'></div>");

  var resultsAmount = 1000000;
  var maxOnPage = 10;
  var pagesQty = resultsAmount/maxOnPage

  /* определяем переменную - количество ссылок отображаемых в pagination */
  var linksQty = 10;

  var pagi = $(".pagi");
  

  for (var i = 0; i < linksQty; i++) {
    var pageIndex = i+1;
    pagi.append("<span>" + pageIndex + "</span>");
    var elems = pagi.children();
    var lastSpan = elems.last();

    lastSpan.click(function() {

      $(pagi.children(".active")).removeAttr("class");
      $(this).addClass("active");

    });
  }

  $(pagi.children()[0]).addClass("active");
  
 
  /* добавляем действие для кнопки "предыдущая" */

  $(".previous").click(function() {

    $(".pagi span").each(function(index) {

        var curr = $(".pagi span").hasClass("active");
  
        /* препятствие 24.09.2015 */
        
        curr = curr.prev();

        console.log(curr);
        
      });

  });

  pagination.append("<div class='toend'></div>");
  $(".toend").text("в конец");

  pagination.append("<div class='next'></div>");
  $(".next").text("следующая");

});

