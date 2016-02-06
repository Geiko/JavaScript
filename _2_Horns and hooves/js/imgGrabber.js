
addEventListener(window, "onload",
 function () {

     var imgs = document.getElementsByTagName('img');
            
            for(var i = 0; i < imgs.length; i++) {

		    var wrapper = document.createElement('div');
		    wrapper.setAttribute("class", "downloadWrapper");

		    imgs[i].parentNode.insertBefore(wrapper, imgs[i]);
		    wrapper.appendChild(imgs[i]);

		    var button = document.createElement('a');
		    button.setAttribute("class", "downloadMe");
		    button.setAttribute("href", imgs[i].getAttribute("src"));
		    button.setAttribute("download", "");

		    var text = document.createTextNode("download");
		    button.appendChild(text);
		    wrapper.appendChild(button);
		};

 });
