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
  
  for (var i = 0; i < linksQty; i++) 
  {
    var pageIndex = i+1;
    pagi.append("<span>" + pageIndex + "</span>");
	
    $(pagi.children().last()).click(function() 
	{
		$(currentActElem).removeAttr("class");
		$(this).addClass("active");
		currentActElem = this;
    });
  }

  var currentActElem =  pagi.children()[0];
  $(currentActElem).addClass("active");  
 
  /* добавляем действие для кнопки "предыдущая" */
  $(".previous").click(function() 
  {
		$(currentActElem).removeAttr("class");
		prevElem = $(currentActElem).prev();
		$(prevElem).addClass("active");
		currentActElem = prevElem;	
  });

  pagination.append("<div class='toend'></div>");
  $(".toend").text("в конец");

  pagination.append("<div class='next'></div>");
  $(".next").text("следующая");

});

