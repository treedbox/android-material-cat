  //check if SW is in navigator
  if ('serviceWorker' in navigator) {
    //register sw.js
    navigator.serviceWorker
    //register Service Workers file
    	//scope: the directore where the sw.js file is in
    .register('./sw.js', {scope: './'})
    //before register
    .then(function(sw){
    //show register successful
      console.log('SW Registred');
    })
    //if happens some error
    .catch(function(error){
      //catch errors
      console.log('SW Register Fails', error);
    });
  }
