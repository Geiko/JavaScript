function addEventListener(object, methodName, newEventHandler){

	var oldEvent = object[methodName];
	if(oldEvent == null)
	{
	   oldEvent = function(){};
	}
	
	object[methodName] = function(){ oldEvent.apply(object); newEventHandler.apply(object) }; 
}

