		var warrior = {

			go: function(){

				var set = $("div.warrior").offset();
				set.left += 50;
				$("div.warrior").offset(set);
			},

			back: function(){

				var set = $("div.warrior").offset();
				set.left -= 50;
				$("div.warrior").offset(set);
			},

			act: function (url){
				$(".warrior").html("<img src=\"" + url + "\" alt=\"warrior\" width=\"150\" height=\"150\">" );
			},

			born: function (){
				this.act("img/warrior.png");
			},

			takeSword: function(){
				this.act("img/takeSword.png");
			},

			shield: function(){

				this.act("img/shield.png");

				setTimeout(function(){
					warrior.act("img/shield2.png");
				}, 300);

				setTimeout(function(){
					warrior.act("img/shield.png");
				}, 600);

				setTimeout(function(){
					warrior.act("img/takeSword.png");
				}, 900);
			},

			hit: function(){

				this.go();
				this.act("img/hit.png");

				setTimeout(function(){
					warrior.act("img/takeSword.png");
				}, 300);

				setTimeout(function(){
					warrior.back();
					warrior.shield();
				}, 600);
			},

			upHit: function(){

				this.act("img/upHit1.png");

				setTimeout(function(){
					warrior.act("img/upHit2.png");
				}, 200);

				setTimeout(function(){
					warrior.go();
					warrior.act("img/upHit3.png");
				}, 400);

				setTimeout(function(){
					warrior.go();
					warrior.act("img/upHit4.png");
				}, 600);			

				setTimeout(function(){
					warrior.back();
					warrior.act("img/takeSword.png");
				}, 800);			

				setTimeout(function(){
					warrior.back();
					warrior.shield();
				}, 1000);
			}
		};