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

			this.picWidth = 100;
			this.picHeight = 100;

			this.step = 50;
			this.timeInterval = 300;



			this.act = function (url, isBorn){
				// if(isBorn){
				// 	$(".Warrior:first-child").html("<img src=\"" + url + "\" alt=\"Warrior\" width=\"150\" height=\"150\">" );
				// }
				// else{
				// 	$(".Warrior:last-child").html("<img src=\"" + url + "\" alt=\"Warrior\" width=\"150\" height=\"150\">" );
				// }

				if(isBorn){
				var temp = document.getElementsByClassName("Warrior")[0];
				temp.innerHTML = "<img src=\"" + url + 
					"\" alt=\"Warrior\" width=\""+ this.picWidth +"\" height=\""+ this.picHeight +"\">";
				}
				else{
					var temp = document.getElementsByClassName("Warrior");
					temp = temp[temp.length-1];
					temp.innerHTML = "<img src=\"" + url + 
						"\" alt=\"Warrior\" width=\""+ this.picWidth +"\" height=\""+ this.picHeight +"\">";
				}
			};



			this.born = function (){

				var newDiv = document.createElement('div');
				newDiv.className = 'Warrior';

				var fieldDiv = document.getElementsByClassName('field')[0];
				fieldDiv.insertBefore(newDiv, fieldDiv.firstChild);

				this.act("img/warrior.png", true);
			};



			this.go = function(){

				var set = $("div.Warrior:last-child").offset();
				set.left += this.step;
				$("div.Warrior:last-child").offset(set);
			};



			this.back = function(){

				var set = $("div.Warrior:last-child").offset();
				set.left -= this.step;				
				$("div.Warrior:last-child").offset(set);
			};



			this.takeSword = function(){
				this.act("img/takeSword.png");
			};



			this.shield = function(){

				this.act("img/shield.png");				
				var WarriorThis = this;					//	 this;	

				setTimeout(function (){ 
					WarriorThis.act("img/shield2.png"); 
				}, this.timeInterval);

				setTimeout(function(){
					WarriorThis.act("img/shield.png");
				}, this.timeInterval * 2);

				setTimeout(function(){
					WarriorThis.act("img/takeSword.png");
				}, this.timeInterval * 3);
			};



			this.hit = function(){

				this.go();
				this.act("img/hit.png");
				var WarriorThis = this;					//	 this;	

				setTimeout(function(){
					WarriorThis.act("img/takeSword.png");
				}, this.timeInterval);

				setTimeout(function(){
					WarriorThis.back();
					WarriorThis.shield();
				}, this.timeInterval * 2);
			};



			this.upHit = function(){

				this.act("img/upHit1.png");
				var WarriorThis = this;					//	 this;	

				setTimeout(function(){
					WarriorThis.act("img/upHit2.png");
				}, this.timeInterval/3*2);

				setTimeout(function(){
					WarriorThis.go();
					WarriorThis.act("img/upHit3.png");
				}, this.timeInterval/3*2 * 2);

				setTimeout(function(){
					WarriorThis.go();
					WarriorThis.act("img/upHit4.png");
				}, this.timeInterval/3*2 * 3);			

				setTimeout(function(){
					WarriorThis.back();
					WarriorThis.act("img/takeSword.png");
				}, this.timeInterval/3*2 * 4);			

				setTimeout(function(){
					WarriorThis.back();
					WarriorThis.shield();
				}, this.timeInterval/3*2 * 5);
			}
		}
