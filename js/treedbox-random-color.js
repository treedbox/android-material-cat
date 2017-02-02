/*! Treedbox Random Color
https://github.com/treedbox/treedbox-random-color
*/
function treedboxRandomColor() {
  //set constants
  //css file names
  const colorsCss = ['colors.css', 'colorsbg.css','colorsfill.css'];

  //get all links tag declared in head
  const links = document.querySelectorAll('link');
  //prepare to receive valid url
  const validLinks = [];

  //extract SheetStyles from links
  links.forEach(e =>{
    if (e.rel == 'stylesheet') {
      colorsCss.map(el =>{
        if (e.href.includes(el)) {
          validLinks.push(e.href);
        }
      });
    }
  });

  validLinks.map(url =>{
    //set source file
    fetch(url)
    //get response as text
    .then(response => response.text())
    .then(data =>{
      //identify source
      let getClass;
      if (url.includes('colors.css')) {
        getClass = 'randomcolor';
      }else if (url.includes('colorsbg.css')) {
        getClass = 'randomcolorbg';
      }else{
        getClass = 'randomcolorfill';
      }

      //split each line break in an array
      let colorSeparator = data.split('\n');
      //create an empty array to receive material colors class
      let material = [];
      //get each key from colorSeparator
      colorSeparator.map(el =>{
        //if array element has . dot at first caracter
        if (el.charAt(0) == '.' ) {
          //remove dot from the first char
          //remove { for the last char
          //push element in the new array
          //css must be ".classname{" without space before line break \n
          material.push(el.slice(1, -2));
        }
      });

      //set material color name as class for each element
      function randomColor(e) {
        //get random number based on the length of array
        let random = Math.floor(Math.random() * material.length);
        //verify if element has .randomcolor class
        if (e.classList.contains(getClass)) {
          //for each material class
          material.map(el =>{
            //remove material class without remove other classes
            e.classList.remove(el);
          });
          //set new random material class
          e.classList.add(material[random]);
        };
      }

      //get all elements with .randomcolor class
      let randomcolor = document.querySelectorAll(`.${getClass}`);

      //start setTimeout
      function removeRandomColor(e) {
        let el = e.target;
        //for each material class
        //remove material class without remove other classes
        //after 5 seconds
        setTimeout(() => material.map(ele => el.classList.remove(ele)), 5000);
      }

      //for each element call randomColor function
      [].map.call(randomcolor, el =>{
        //add mouseleave/not hover listener on each element
        // el.addEventListener('mouseleave', removeRandomColor);
        //add focusout/not focus listener on each element
        // el.addEventListener('focusout', removeRandomColor);
        // el.addEventListener('blur', removeRandomColor);

        //add mouseover/hover listener on each element
        //send e.target as parameter to randomColor function
        // el.addEventListener('mouseover', e => randomColor(e.target));
        //add click listener on each element
        //send e.target as parameter to randomColor function
        el.addEventListener('click', e => randomColor(e.target));
        //add focusin/focus listener on each element
        //send e.target as parameter to randomColor function
        // el.addEventListener('focusin', e => randomColor(e.target));
      });
    })
    .catch(error => console.log('ERROR:', error.message));
  });
}
