/*
 A lightweight Carousal control using plain Js
 It takes a config object as an argument
  - outer - selector for outer container
  - inner - selector for inner/content container
  - increment - increment for position on tick
  - timeout - interval between ticks
  */
function carousal(config){
	var
		defaultview=document.defaultView,
		wrap=document.querySelector(config.outer ),         // outer container
		wrapinner= document.querySelector(config.inner ),   //inner container
		dir=1,                          // direction in which the carousal is moving
		timeout=config.timeout||50,     // time it waits before updating the position
		increment=config.increment||5,  //  position offset to the position
		timer = 0;                      // timer handle
	function slide(){
		var max=wrapinner.scrollWidth-wrap.offsetWidth, // position offset to the position
			curr=Math.abs(parseFloat((defaultview.getComputedStyle(wrapinner).left).replace(/[^\d\.\-]/g,""))||0);		//get current position

		if((curr+1)>max && dir== 1){        //toggle the direction if needed
			dir=-1
		} else if(curr<1 && dir==-1){
			dir=1
		}
		curr=curr+(dir*increment);          //add(or sub) increment
		wrapinner.style.left=(0-curr)+"px"; //update style(position)
	}
	function pause(){
		if(timer){clearInterval(timer);timer=0}
	}
	function resume(){
		if(wrapinner.scrollWidth<wrap.offsetWidth){	//it content width is less than container - nothing to do - return
			return
		}
		if(!timer){timer=setInterval(slide,timeout)}
	}
	wrap.addEventListener("mouseover",pause);
	wrap.addEventListener("mouseout",resume);
    var api={start:resume, pause:pause, resume:resume}
	return api
}
function setupEvents(){
	//setup events for hamburger menu
 	function setupMenu(link,menulink){
		document.querySelector(link).addEventListener("click",function(){
			var menu=this.parentNode.querySelector(menulink)
			menu.style.display="block"
			//hide the menu on next click
			setTimeout(function(){
 				document.addEventListener("click",function docclick(){
					menu.style.display="none"
					document.removeEventListener("click",docclick)
				})
			},100)
		})
	}
	setupMenu(".hamburger1",".links")
	setupMenu(".hamburger2",".menu-items")

}
function init(){
	setupEvents()
	var api=carousal({outer:".carousal",inner:".carousal-inner",increment:5,timeout:5})
	api.start();
}