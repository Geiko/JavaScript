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

			//var allWarriors = document.getElementsByClassName('Warrior');
			var penultWarriorIndex = document.getElementsByClassName('Warrior').length - 2;
			var penultSet = $("div.Warrior").eq(penultWarriorIndex).offset();

			if( set.left >= penultSet.left + this.picWidth){
				set.left -= this.step;				
				$("div.Warrior:last-child").offset(set);
			}
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
	};