window.addEventListener("message", handleEvent, false);

function handleEvent(e){
	switch(e.data) {
		case 'yt::playing':
			console.log("playing video"); 
			break;
		case 'yt::resume':
			console.log("resuming video"); 
			break;
		case 'yt::paused':
			console.log("video paused"); 
			break;
		case 'yt::ended':
			console.log("video ended"); 
			break;
		case 'yt::complete':
			console.log("video complete"); 
			break;
		case 'yt::thirdquartile':
			console.log("third quartile"); 
			break;
		case 'yt::midpoint':
			console.log("midpoint"); 
			break;
		case 'yt::firstquartile':
			console.log("first quartile"); 
			break;
		case 'yt::error':
			console.log("video error"); 
			break;
	}
}
