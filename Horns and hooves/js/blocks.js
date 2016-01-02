var items = [ 
    { name : "backets", 
      category: 0, 
      details: { 
        Url:"http://lopata.com", 
        ShortDescription: "Very simple text about LOPATAS", 
        picture: "http://icons.iconarchive.com/icons/icons8/windows-8/128/Diy-Spade-icon.png" 
      }
    },
    { name : "brick",  
      category: 1,
      details: { 
        Url:"http://lopata.com", 
        ShortDescription: "Very simple text about LOPATAS", 
        picture: "http://icons.iconarchive.com/icons/icons8/windows-8/128/Diy-Spade-icon.png" 
      }
    }, 
    { name : "crockery",  
      category: 2,
      details: { 
        Url:"http://lopata.com", 
        ShortDescription: "Very simple text about LOPATAS", 
        picture: "http://icons.iconarchive.com/icons/icons8/windows-8/128/Diy-Spade-icon.png" 
      }
    },
    { name : "textiles",  
      category: 3,
      details: { 
        Url:"http://lopata.com", 
        ShortDescription: "Very simple text about LOPATAS", 
        picture: "http://icons.iconarchive.com/icons/icons8/windows-8/128/Diy-Spade-icon.png" 
      }
    },
    { name : "pillows", 
      category: 4,  
      details: { 
        Url:"http://lopata.com", 
        ShortDescription: "Very simple text about LOPATAS", 
        picture: "http://icons.iconarchive.com/icons/icons8/windows-8/128/Diy-Spade-icon.png" 
      }
    },
    ];

var sort = function(arrayItems)
{
    var categories = [];

    for(var i=0; i < arrayItems.length; i++)
    {
        var item = arrayItems[i];
        var key = item.category;
        if(!categories[key])
        {
            categories[key] = [];
        }

        categories[key].push(item)
    }
    var internlItemIndex = 0;
    
    while(Object.keys(categories).length == 0)
    {
        for(var keyCategory in categories)
        {
            var item = categories[keyCategory].pop();
    
            if(categories[keyCategory].length == 0)
            {
                delete categories[keyCategory]
            }
    
            arrayItems[internlItemIndex] = item;
            internlItemIndex++;
        }
    }
}

sort(items);


var defaultRenderer =  function(container, item) {
                           
                  var category = document.createElement("div");
                  container.appendChild(category);
                  
                  var text = document.createTextNode(item.details.ShortDescription);
                  var p = document.createElement("p");
                  p.appendChild(text);
                  category.appendChild(p);
                  
                  category.setAttribute("class", "categoryBase category" + item.category);
                  container.appendChild(category);
                  
                  var img = document.createElement("img");
                  img.setAttribute("src", item.details.picture);
                  category.insertBefore(img, category.firstChild);
                  }
                 
 var category3Renderer =  function(container, item) {
                           
                  var category = document.createElement("div");
                  container.appendChild(category);
                  
                  var text = document.createTextNode(item.details.ShortDescription);
                  var p = document.createElement("p");
                  p.appendChild(text);
                  category.appendChild(p);
                  
                  category.setAttribute("class", "specificCategory categoryBase category" + item.category);
                  container.appendChild(category);
                  
                  var img = document.createElement("img");
                  img.setAttribute("src", item.details.picture);
                  category.insertBefore(img, category.firstChild);
                  }
                    
   var renderController = function(item){        
            switch(item.category)
            {
                case 3:
                    return category3Renderer;
                    break;
                default:
                    return defaultRenderer;
                    break;      
            }               
        }
            
 var baseRenderer = function(container, item, renderer){
            // action1
             var link = document.createElement("a");
             link.setAttribute("href", item.details.Url);
             link.setAttribute("target", "_blank");
                         
            //custom      
            renderer(link, item);
            
            //action3
            container.appendChild(link);
        }

	var renderItems  = function(items){
		var container = document.getElementById("colorblock");
			container.classList.add("container");

			for (var j = 0; j < 6; j++)
			{
				for (var i = 0; i < items.length; i++) 
				{
					var item = items[i];
					
					baseRenderer(container, item, renderController(item));
				}
			} 
	}
	
	
	addEventListener(window, "onload", function () { renderItems(items) });

	


	
	
	
        