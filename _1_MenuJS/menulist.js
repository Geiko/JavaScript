window.onload = function() {

var menuData = [{name: "item1", content: "tab1"}, {name: "item2", content: "tab2"}, {name: "item3", content: "tab3"}];

var ul = document.createElement("ul");

for (var i=0; i < menuData.length; i++) {
  
  var li = document.createElement("li");
  var textNode = document.createTextNode(menuData[i].name);
  li.appendChild(textNode);

  var tab = document.createElement("div");
  var tabText = document.createTextNode(menuData[i].content);
  tab.appendChild(tabText);

  li.appendChild(tab);

  ul.appendChild(li);
}

var menu = document.getElementsByClassName("menu");
menu[0].appendChild(ul);

var activeItem = null;

for (i = 0; i < menuData.length; i++) 
{

  var tmpLi = ul.childNodes[i];

    tmpLi.onclick = function()
    {

      if (activeItem != null) 
      {
        
        activeItem.classList.remove("active");
        activeItem.childNodes[1].setAttribute("style", "display: none");

      }

      activeItem = this;
      this.setAttribute("class", "active");
      this.childNodes[1].setAttribute("style", "display: block");
      
    }

}

}