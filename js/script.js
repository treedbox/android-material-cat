console.log('@treedbox');
//call treedbox Random Color
treedboxRandomColor();

//get button to save cat as file
let savecatPNG = document.querySelector('.savecat-png');
let savecatSVG = document.querySelector('.savecat-svg');

let saveMessage = document.querySelector('.save-message');
let svg = document.querySelector('svg');

//function called form listeners
function downloadCat(e) {
  let el = e.target;
  //css url
  let cssCatColors = 'css/catcolors.css';
  //css url
  let cssFill = 'css/colorsfill.css';
  //fetch css cat colors
  let getCssCatColors = fetch(cssCatColors)
    //get response as text
    .then(response => response.text())
    .catch(error => console.log('ERROR:', error.message));
    //fetch css svg fill colors
  let getCssFill = fetch(cssFill)
  //get response as text
  .then(response => response.text())
  .catch(error => console.log('ERROR:', error.message));

  //when all Promise is resolve
  Promise.all([getCssCatColors, getCssFill])
    .then((data) =>{
      //join array to String
      let css = data.join(' ');
      //get svg element
      let getSVG = document.querySelector('svg');
      //get first element child before svg
      let g = document.querySelector('g');
      //create element defs
      let defs = document.createElement('defs');
      //create element style
      let style = document.createElement('style');
      //set css as content of style element
      style.textContent = css;
      //append style as child of defs
      defs.appendChild(style);
      //insert befor g element, the defs element inside SVG
      getSVG.insertBefore(defs, g);
      //get svg inside div.cat
      let cat = document.querySelector('.cat').innerHTML;
      //create a blob based on svg cat
      let file = new Blob([cat], {type: 'image/svg+xml'});
      //create a URL for the blob
      let objectURL = URL.createObjectURL(file);

      //set download attribute to A elemet
      savecatSVG.setAttribute('download', 'android-material-cat.svg');
      //set blob url as href of A element
      savecatSVG.href = objectURL;
      //create a canvas
      let canvas = document.createElement('canvas');
      //set canvas as 2d
      var c = canvas.getContext('2d');
      //set svg height as canvas height
      canvas.height = svg.height.baseVal.value;
      //set svg width as canvas width
      canvas.width = svg.width.baseVal.value;
      //create an image
      var img = new Image();
      //set blob link as image src
      img.src = objectURL;

      //listener image load
      img.addEventListener('load', () =>{
        //clear all canvas
        c.clearRect(0, 0, canvas.width, canvas.height);
        //draw image
        c.drawImage(img, 0, 0);
        //convert canvas to blob
        canvas.toBlob((e) =>{
          //create a URL for the canvas blob
          let downloadURL = URL.createObjectURL(e);
          //set download attribute to A elemet
          savecatPNG.setAttribute('download', 'android-material-cat.png');
          //set blob url as href of A element
          savecatPNG.href = downloadURL;
          //do a click on created A element
          // a.click();
          // window.open(downloadURL);
        });
      });
    //remove defs from svg in html before download
    svg.removeChild(defs);
    savecatPNG.classList.remove('disabled');
    savecatSVG.classList.remove('disabled');
    saveMessage.classList.remove('show');
    saveMessage.classList.add('hide');
    })
    .catch(error => console.log('ERROR:', error.message));
}
//set a click listener to button to save cat as PNG
svg.addEventListener('click', downloadCat);
//set a click listener to button to save cat as SVG
// savecatSVG.addEventListener('mouseenter', downloadCat);
