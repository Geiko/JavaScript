

		$("#born").click(function(){
			warrior1.born();
		});
		$("#takeSword").click(function(){
			warrior1.takeSword();
		});
		$("#go").click(function(){
			warrior1.go();
		});
		$("#back").click(function(){
			warrior1.back();
		});
		$("#shield").click(function(){
			warrior1.shield();
		});
		$("#hit").click(function(){
			warrior1.hit();
		});
		$("#upHit").click(function(){
			warrior1.upHit();
		});			
		
		// document.getElementById("hit").addEventListener("click", warrior.hit);
		// document.getElementById("upHit").addEventListener("click", warrior.upHit);




		var warrior1 = new Warrior();
		//var warrior2 = new Warrior();

		warrior1.born();
		warrior2.born();