var _inputHandler = null;

/**
 * Specifies a Input Handler. Used to parse input events from a HTML page.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */

// ********************************************************************
// PERHAPS MAKE IT SO THAT YOU DON'T REPEATEDLY CALL GET ELEMENT BY ID.
// Also change attributes and uniform variables into dictionaries instead
// of arrays.
// ********************************************************************
class InputHandler {
    /**
     * Initializes the event handeling functions within the program.
     */
    constructor(canvas, scene, doc) {
      this.canvas = canvas;
      this.scene = scene;
      this.doc = doc;
      this.interval;
      this.position;
      this.solidcolor = true;
      this.image = null;
      _inputHandler = this;
      this.default_image = new Image();

      this.default_image.onload = function() {
        _inputHandler.scene.addGeometry(new MultiTexCube(shaderTexture, .75, .25, 0, _inputHandler.getColorStatus(), false, _inputHandler.default_image));
      };

      this.default_image.src = "objs/cat_.jpg";

      // _inputHandler.scene.addGeometry(new TexCube(shaderTexture, size, x, y, color, false, _inputHandler.image));

      // Mouse Events
      this.canvas.onmousedown = function(ev) {
        _inputHandler.position = _inputHandler.getCanvasCoordinates(ev);
        _inputHandler.interval = setInterval(function(){_inputHandler.click()}, 50)
      };
      this.canvas.onmouseup = function(ev) {clearInterval(_inputHandler.interval)};
      this.canvas.onmousemove = function(ev) { _inputHandler.move(ev) };

      // Button Events:
      this.doc.getElementById("clearcanvas").onclick = function(ev){ _inputHandler.clearcanvas(ev)};
      this.doc.getElementById("addobject").onclick = function(){_inputHandler.readSelectedFile(0, 0,  _inputHandler.getColorStatus());};
      this.doc.getElementById("changecolortype").onclick = function(){ _inputHandler.changecolor()};
      document.getElementById('texInput').onchange = function() { _inputHandler.readTexture() };
      
      // Pick Shape Events:
      this.doc.getElementById("spinningsquares").onclick = function(ev){ _inputHandler.scene.shape = 3;};
      this.doc.getElementById("fluctuatingtriangles").onclick = function(ev){ _inputHandler.scene.shape = 4;};
      this.doc.getElementById("movingcircle").onclick = function(ev){ _inputHandler.scene.shape = 5;};
      this.doc.getElementById("tiltedcube").onclick = function(ev){ _inputHandler.scene.shape = 6;};

    }

    /*
     * Function called to retrieve RGB color from sliders.
    */
    getColorStatus(){
      let color = [];
      color.push((this.doc.getElementById("redslider").value) * .01);
      color.push((this.doc.getElementById("greenslider").value) * .01);
      color.push((this.doc.getElementById("blueslider").value) * .01);
      console.log(color);
      return color;
    }

    /*
     * Function called to retrieve x and y coordiantes of mouse
     * in canvas.
    */

    getCanvasCoordinates(ev){
      let x = ev.clientX;
      let y = ev.clientY;
      let rect = ev.target.getBoundingClientRect();
      x = ((x-rect.left) - canvas.width/2)/(canvas.width/2);
      y = (canvas.height/2 - (y-rect.top))/(canvas.height/2);
      return [x, y];
    }

    /*
     * Function called to retrieve the number of segments in circle.
    */
    
    getCircleSegments(){
      return this.doc.getElementById("segmentslider").value;
    }

    /*
    * Function called to change the color from solid to rainbow and
    * vice-versa.
    */
   changecolor(){
      if(_inputHandler.solidcolor){
        this.doc.getElementById("changecolortype").innerHTML = "🌈RAINBOW🌈";
        _inputHandler.solidcolor = !_inputHandler.solidcolor;
      } else {
        this.doc.getElementById("changecolortype").innerHTML = "Solid Color ☹️";
        _inputHandler.solidcolor = !_inputHandler.solidcolor;
      }
   }

    /**
     * Function called upon mouse click.
     */
    click(ev) {
        // Find the x,y coordinates of the center.
        let [x, y] = _inputHandler.position;

        // Calculating Size.
        let size = this.doc.getElementById("sizeslider").value;
        size *= .01;

        // Setting Color
        let color = this.getColorStatus();
        
        var shape;
        switch(this.scene.shape){
          case 0:
            shape = new Triangle(shader, size, x, y, color, _inputHandler.solidcolor);
            break;
          case 1:
            shape = new Square(shader, size, x, y, color, _inputHandler.solidcolor);
            break;
          case 2:
            shape = new Circle(shader, size, x, y, color, this.getCircleSegments(), _inputHandler.solidcolor);
            break;
          case 3:
            shape = new SpinSquare(shaderRotation, size, x, y, color, _inputHandler.solidcolor);
            break;
          case 4:
            shape = new ScalingTriangle(shaderRotation, size, x, y, color, _inputHandler.solidcolor);
            break;
          case 5:
            shape = new RandomCircle(shaderRotation, size, x, y, color, this.getCircleSegments(), _inputHandler.solidcolor);
            break;
          case 6:
            console.log(this.image);
            if(this.image == null){
              shape = new Cube(shaderRotation, size, x, y, color, _inputHandler.solidcolor);
            } else {
              shape = new TexCube(shaderTexture, size, x, y, color, false, _inputHandler.image);
            }
            break;
          case 7:
            _inputHandler.readSelectedFile(x, y, color);
            break; 
          default:
            console.error("Should not be able to get here");
            break;
        }
        // ***************************************
        // Fix this later with Promises...
        // ***************************************
        if(this.scene.shape != 7){
          this.scene.addGeometry(shape);
        }
      }

    clearcanvas(ev){
      this.scene.clearGeometries();
    }

    /*
     * Function called upon mouse move in canvas.
     * Also resets the correct x and y coordinates to
     * the variable position.
    */
    move(ev){
      _inputHandler.position = this.getCanvasCoordinates(ev);
      this.doc.getElementById("xCoordinate").innerHTML = _inputHandler.position[0];
      this.doc.getElementById("yCoordinate").innerHTML = _inputHandler.position[1];
    }

    /*
     * Function called when it needs to read a OBJ file that is uploaded to the webpage.
    */
  readSelectedFile(x, y, color){
    var fileReader = new FileReader();
    var objFile = _inputHandler.doc.getElementById("fileinput").files[0];

    if(!objFile){
      alert("OBJ file not set!");
      return;
    }

    fileReader.readAsText(objFile);
    fileReader.onloadend = function(){
      if(_inputHandler.image != null){
        _inputHandler.scene.addGeometry(new CustomOBJ(shaderTexture, fileReader.result, _inputHandler.image, color, 0, 0, _inputHandler.solidcolor));
      } else {
        _inputHandler.scene.addGeometry(new CustomOBJ(shaderRotation, fileReader.result, null, color, 0, 0, _inputHandler.solidcolor));

      }
    }

  }

  readTexture() {
    // Create the image object
    var image = new Image();
    if (!image) {
      console.log('Failed to create the image object');
      return false;
    }

    // Register the event handler to be called on loading an image
    image.onload = function() {
        _inputHandler.image = image;
    };

    var imgPath = document.getElementById("texInput").value;
    var imgPathSplit = imgPath.split("\\");

    // Tell the browser to load an image
    image.src = 'objs/' + imgPathSplit[imgPathSplit.length - 1];
    return true;
  }
}
