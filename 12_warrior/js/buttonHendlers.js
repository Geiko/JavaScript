;$(function(){

	var warrior = new Warrior();



	$("#born").click(function(){
		warrior.born();
	});
	$("#takeSword").click(function(){
		warrior.takeSword();
	});
	$("#back").click(function(){
		warrior.back();
	});
	$("#go").click(function(){
		warrior.go();
	});
	$("#shield").click(function(){
		warrior.shield();
	});
	$("#hit").click(function(){
		warrior.hit();
	});
	$("#upHit").click(function(){
		warrior.upHit();
	});			
	
	// document.getElementById("hit").addEventListener("click", warrior.hit);
	// document.getElementById("upHit").addEventListener("click", warrior.upHit);


	warrior.born();
	warrior.born();
	warrior.born();
})