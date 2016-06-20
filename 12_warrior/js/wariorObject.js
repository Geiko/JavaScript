		// var warrior = {

		// 	go: function(){

		// 		var set = $("div.warrior").offset();
		// 		set.left += 50;
		// 		$("div.warrior").offset(set);
		// 	},

		// 	back: function(){

		// 		var set = $("div.warrior").offset();
		// 		set.left -= 50;
		// 		$("div.warrior").offset(set);
		// 	},

		// 	act: function (url){
		// 		//$(".warrior").html("<img src=\"" + url + "\" alt=\"warrior\" width=\"150\" height=\"150\">" );
		// 		var temp = document.getElementsByClassName("warrior")[0];
		// 		temp.innerHTML = "<img src=\"" + url + "\" alt=\"warrior\" width=\"200\" height=\"200\">";
		// 	},

		// 	born: function (){
		// 		warrior.act("img/warrior.png");
		// 	},

		// 	takeSword: function(){
		// 		warrior.act("img/takeSword.png");
		// 	},

		// 	shield: function(){

		// 		warrior.act("img/shield.png");

		// 		setTimeout(function(){
		// 			warrior.act("img/shield2.png");
		// 		}, 300);

		// 		setTimeout(function(){
		// 			warrior.act("img/shield.png");
		// 		}, 600);

		// 		setTimeout(function(){
		// 			warrior.act("img/takeSword.png");
		// 		}, 900);
		// 	},

		// 	hit: function(){

		// 		warrior.go();
		// 		warrior.act("img/hit.png");

		// 		setTimeout(function(){
		// 			warrior.act("img/takeSword.png");
		// 		}, 300);

		// 		setTimeout(function(){
		// 			warrior.back();
		// 			warrior.shield();
		// 		}, 600);
		// 	},

		// 	upHit: function(){

		// 		warrior.act("img/upHit1.png");

		// 		setTimeout(function(){
		// 			warrior.act("img/upHit2.png");
		// 		}, 200);

		// 		setTimeout(function(){
		// 			warrior.go();
		// 			warrior.act("img/upHit3.png");
		// 		}, 400);

		// 		setTimeout(function(){
		// 			warrior.go();
		// 			warrior.act("img/upHit4.png");
		// 		}, 600);			

		// 		setTimeout(function(){
		// 			warrior.back();
		// 			warrior.act("img/takeSword.png");
		// 		}, 800);			

		// 		setTimeout(function(){
		// 			warrior.back();
		// 			warrior.shield();
		// 		}, 1000);
		// 	}
		// };



		var Warrior = function( ){

			this.go = function(){

				var set = $("div.Warrior").offset();
				set.left += 50;
				$("div.Warrior").offset(set);
			};



			this.back = function(){

				var set = $("div.Warrior").offset();
				set.left -= 50;
				$("div.Warrior").offset(set);
			};



			this.act = function (url){
				//$(".Warrior").html("<img src=\"" + url + "\" alt=\"Warrior\" width=\"150\" height=\"150\">" );
				var temp = document.getElementsByClassName("Warrior")[0];
				temp.innerHTML = "<img src=\"" + url + "\" alt=\"Warrior\" width=\"200\" height=\"200\">";
			};



			this.born = function (){

				// var newDiv = document.createElement('div');
				// newDiv.className = 'Warrior';
				// document.body.insertBefore(newDiv, document.body.firstChild);
				this.act("img/warrior.png");
			};



			this.takeSword = function(){
				this.act("img/takeSword.png");
			};



			this.shield = function(){

				this.act("img/shield.png");				
				var context = this;					//	var context = this;	

				setTimeout(function (){ 
					context.act("img/shield2.png"); 
				}, 300);

				setTimeout(function(){
					context.act("img/shield.png");
				}, 600);

				setTimeout(function(){
					context.act("img/takeSword.png");
				}, 900);
			};



			this.hit = function(){

				this.go();
				this.act("img/hit.png");
				var context = this;					//	var context = this;	

				setTimeout(function(){
					context.act("img/takeSword.png");
				}, 300);

				setTimeout(function(){
					context.back();
					context.shield();
				}, 600);
			};



			this.upHit = function(){

				this.act("img/upHit1.png");
				var context = this;					//	var context = this;	

				setTimeout(function(){
					context.act("img/upHit2.png");
				}, 200);

				setTimeout(function(){
					context.go();
					context.act("img/upHit3.png");
				}, 400);

				setTimeout(function(){
					context.go();
					context.act("img/upHit4.png");
				}, 600);			

				setTimeout(function(){
					context.back();
					context.act("img/takeSword.png");
				}, 800);			

				setTimeout(function(){
					context.back();
					context.shield();
				}, 1000);
			}
		}
