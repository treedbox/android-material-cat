/*! Treedbox Random Color
https://github.com/treedbox/treedbox-random-color
*/
function coloring() {
  //get css color file
  //for text color
  // fetch('css/colors.css')
  //for background-color
  // fetch('css/colorsbg.css')
  //for SVG background-color:
  fetch('css/colorsfill.css')
  .then(function(response){
    //get response as text
    return response.text();
  })
  .then(function(data){
    //split each line break in an array
    let colorSeparator = data.split('\n');
    //create an empty array to receive material colors class
    let material = [];
    //get each key from colorSeparator
    colorSeparator.map((el) =>{
      //if array element has . dot at first caracter
      if (el.charAt(0) == '.' ) {
        //remove dot from the first char
        //remove { for the last char
        //push element in the new array
        //css must be ".classname{" without space before line break \n
        material.push(el.slice(1, -2));
      }
    });
    //function to set material as class for each element
    function randomColor(e) {
      //get random number based on the length of array
      let random = Math.floor(Math.random() * material.length);
      //verify if element has .randomcolor class
      if (e.classList.contains('randomcolor')) {
        //for each material class
        material.map((el) =>{
          //remove material class without remove other classes
          e.classList.remove(el);
        });
        //set new random material class
        e.classList.add(material[random]);
      };
    }
    //get all elements with .randomcolor class
    let randomcolor = document.querySelectorAll('.randomcolor');
    //started by setTimeout
    function removeRandomColor(e) {
      let el = e.target;
      setTimeout(() =>{
        //for each material class
        material.map((ele) =>{
          //remove material class without remove other classes
          el.classList.remove(ele);
        });
        //after 5 seconds
      }, 5000);
    }
    //for each element call randomColor function
    [].map.call(randomcolor, (el) =>{
        //add mouseleave/not hover listener on each element
        // el.addEventListener('mouseleave', removeRandomColor);
        //add focusout/not focus listener on each element
        // el.addEventListener('focusout', removeRandomColor);
        // el.addEventListener('blur', removeRandomColor);
      //add mouseover/hover listener on each element
      el.addEventListener('click', (e) =>{
        //send e.target as parameter to randomColor function
        randomColor(e.target);
      });
      // // add focusin/focus listener on each element
      // el.addEventListener('focusin', (e) =>{
      //   // send e.target as parameter to randomColor function
      //   randomColor(e.target);
      // });
    });
  })
  .catch(function(error){
    console.log('ERROR: ', error.message);
  });
}
coloring();
