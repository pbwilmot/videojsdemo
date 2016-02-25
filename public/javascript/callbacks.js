window.addEventListener("message", handleEvent, false);

function handleEvent(e){
  switch(e.data.split('::')[1]) {
		case 'playing':
			console.log("playing video");
			break;
		case 'resume':
			console.log("resuming video");
			break;
		case 'paused':
			console.log("video paused");
			break;
		case 'ended':
			console.log("video ended");
			break;
		case 'complete':
			console.log("video complete");
			break;
    case 'alladscompleted':
      console.log("all ads completed");
      break;
    case 'click':
      console.log("ad clicked");
      break;
		case 'thirdquartile':
			console.log("third quartile");
			break;
		case 'midpoint':
			console.log("midpoint");
			break;
		case 'firstquartile':
			console.log("first quartile");
			break;
		case 'error':
			console.log("video error");
			break;
  }
}
