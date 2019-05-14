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
    constructor(canvas, scene, doc, camera) {
      this.canvas = canvas;
      this.scene = scene;
      this.camera = camera;
      this.doc = doc;
      this.interval;
      this.position = [0, 0];
      this.solidcolor = true;
      this.image = null;
      _inputHandler = this;
      this.default_image = new Image();
      this.wall_image = new Image();
      this.sky_image = new Image();
      this.ground_image = new Image();

      // this.map = [[numberofblocks, X, Z]]
      this.mapLayout = [
        // Front Side
        [4, 15.5, -15.5],
        [4, 14.5, -15.5], 
        [4, 13.5, -15.5],
        [4, 12.5, -15.5], 
        [4, 11.5, -15.5],
        [4, 10.5, -15.5], 
        [4, 9.5, -15.5], 
        [4, 8.5, -15.5], 
        [4, 7.5, -15.5], 
        [4, 6.5, -15.5], 
        [4, 5.5, -15.5], 
        [4, 4.5, -15.5], 
        [4, 3.5, -15.5], 
        [4, 2.5, -15.5], 
        [4, 1.5, -15.5], 
        [4, 0.5, -15.5], 
        [4, -0.5, -15.5], 
        [4, -1.5, -15.5], 
        [4, -2.5, -15.5], 
        [4, -3.5, -15.5], 
        [4, -4.5, -15.5], 
        [4, -5.5, -15.5], 
        [4, -6.5, -15.5], 
        [4, -7.5, -15.5], 
        [4, -8.5, -15.5], 
        [4, -9.5, -15.5], 
        [4, -10.5, -15.5], 
        [4, -11.5, -15.5], 
        [4, -12.5, -15.5], 
        [4, -13.5, -15.5], 
        [4, -14.5, -15.5], 
        [4, -15.5, -15.5],
        // Back Side:
        [4, 15.5, +15.5],
        [4, 14.5, +15.5], 
        [4, 13.5, +15.5],
        [4, 12.5, +15.5], 
        [4, 11.5, +15.5],
        [4, 10.5, +15.5], 
        [4, 9.5, +15.5], 
        [4, 8.5, +15.5], 
        [4, 7.5, +15.5], 
        [4, 6.5, +15.5], 
        [4, 5.5, +15.5], 
        [4, 4.5, +15.5], 
        [4, 3.5, +15.5], 
        [4, 2.5, +15.5], 
        [4, 1.5, +15.5], 
        [4, 0.5, +15.5], 
        [4, -0.5, +15.5], 
        [4, -1.5, +15.5], 
        [4, -2.5, +15.5], 
        [4, -3.5, +15.5], 
        [4, -4.5, +15.5], 
        [4, -5.5, +15.5], 
        [4, -6.5, +15.5], 
        [4, -7.5, +15.5], 
        [4, -8.5, +15.5], 
        [4, -9.5, +15.5], 
        [4, -10.5, +15.5], 
        [4, -11.5, +15.5], 
        [4, -12.5, +15.5], 
        [4, -13.5, +15.5], 
        [4, -14.5, +15.5], 
        [4, -15.5, +15.5],
        // Right Side
        [4, -15.5, +15.5],
        [4, -15.5, +14.5], 
        [4, -15.5, +13.5],
        [4, -15.5, +12.5], 
        [4, -15.5, +11.5],
        [4, -15.5, +10.5], 
        [4, -15.5, +9.5], 
        [4, -15.5, +8.5], 
        [4, -15.5, +7.5], 
        [4, -15.5, +6.5], 
        [4, -15.5, +5.5], 
        [4, -15.5, +4.5], 
        [4, -15.5, +3.5], 
        [4, -15.5, +2.5], 
        [4, -15.5, +1.5], 
        [4, -15.5, +0.5], 
        [4, -15.5, -0.5],
        [4, -15.5, -1.5], 
        [4, -15.5, -2.5], 
        [4, -15.5, -3.5], 
        [4, -15.5, -4.5], 
        [4, -15.5, -5.5], 
        [4, -15.5, -6.5], 
        [4, -15.5, -7.5], 
        [4, -15.5, -8.5], 
        [4, -15.5, -9.5], 
        [4, -15.5, -10.5], 
        [4, -15.5, -11.5], 
        [4, -15.5, -12.5], 
        [4, -15.5, -13.5], 
        [4, -15.5, -14.5], 
        [4, -15.5, -15.5],
        // Left Side
        [4, 15.5, +15.5],
        [4, 15.5, +14.5], 
        [4, 15.5, +13.5],
        [4, 15.5, +12.5], 
        [4, 15.5, +11.5],
        [4, 15.5, +10.5], 
        [4, 15.5, +9.5], 
        [4, 15.5, +8.5], 
        [4, 15.5, +7.5], 
        [4, 15.5, +6.5], 
        [4, 15.5, +5.5], 
        [4, 15.5, +4.5], 
        [4, 15.5, +3.5], 
        [4, 15.5, +2.5], 
        [4, 15.5, +1.5], 
        [4, 15.5, +0.5], 
        [4, 15.5, -0.5],
        [4, 15.5, -1.5], 
        [4, 15.5, -2.5], 
        [4, 15.5, -3.5], 
        [4, 15.5, -4.5], 
        [4, 15.5, -5.5], 
        [4, 15.5, -6.5], 
        [4, 15.5, -7.5], 
        [4, 15.5, -8.5], 
        [4, 15.5, -9.5], 
        [4, 15.5, -10.5], 
        [4, 15.5, -11.5], 
        [4, 15.5, -12.5], 
        [4, 15.5, -13.5], 
        [4, 15.5, -14.5], 
        [4, 15.5, -15.5],



        //1st Row
        [3, 0.5, -12.5],
        [2, -0.5, -12.5],
        [1, 1.5, -12.5],
        [3, -1.5, -12.5],
        [2, -2.5, -12.5],
        [1, 5.5, -12.5],
        [4, -4.5, -12.5],
        [0, -5.5, -12.5],
        [3, 0.5, -12.5],
        [2, -0.5, -12.5],
        [1, 1.5, -12.5],
        [3, -1.5, -12.5],
        [2, -2.5, -12.5],
        [1, 5.5, -12.5],
        [4, -4.5, -12.5],
        [0, -5.5, -12.5],
        [3, 0.5, -12.5],
        [2, -0.5, -12.5],
        [1, 1.5, -12.5],
        [3, -1.5, -12.5],
        [2, -2.5, -12.5],
        [1, 5.5, -12.5],
        [4, -4.5, -12.5],
        [0, -5.5, -12.5],

        // 2nd Row:
        [3, 12.5, -10.5],
        [2, 13.5, -10.5],
        [1, 14.5, -10.5],
        [3, -12.5, -10.5],
        [2, -13.5, -10.5],
        [1, 10.5, -10.5],
        [4, -9.5, -10.5],
        [0, -5.5, -10.5],
        [3, 1.5, -10.5],
        [2, 8.5, -10.5],
        [1, -7.5, -10.5],
        [3, -6.5, -10.5],
        [2, 6.5, -10.5],
        [1, 3.5, -10.5],
        [4, -3.5, -10.5],
        [0, -2.5, -10.5],
        [3, 1.5, -10.5],
        [2, -1.5, -10.5],
        [1, 5.5, -10.5],
        [3, -8.5, -10.5],
        [2, 2.5, -10.5],

        // // 3rd Row:
        // [3, 0.5, 12.5],
        // [2, -0.5, -12.5],
        // [1, 1.5, -12.5],
        // [3, -1.5, -12.5],
        // [2, -2.5, -12.5],
        // [1, 5.5, -12.5],
        // [4, -4.5, -12.5],
        // [0, -5.5, -12.5],
        // [3, 0.5, -12.5],
        // [2, -0.5, -12.5],
        // [1, 1.5, -12.5],
        // [3, -1.5, -12.5],
        // [2, -2.5, -12.5],
        // [1, 5.5, -12.5],
        // [4, -4.5, -12.5],
        // [0, -5.5, -12.5],
        // [3, 0.5, -12.5],
        // [2, -0.5, -12.5],
        // [1, 1.5, -12.5],
        // [3, -1.5, -12.5],
        // [2, -2.5, -12.5],
        // [1, 5.5, -12.5],
        // [4, -4.5, -12.5],
        // [0, -5.5, -12.5],

        // // 4th Row:
        // [3, 0.5, 10.5],
        // [2, -0.5, -12.5],
        // [1, 1.5, -12.5],
        // [3, -1.5, -12.5],
        // [2, -2.5, -12.5],
        // [1, 5.5, -12.5],
        // [4, -4.5, -12.5],
        // [0, -5.5, -12.5],
        // [3, 0.5, -12.5],
        // [2, -0.5, -12.5],
        // [1, 1.5, -12.5],
        // [3, -1.5, -12.5],
        // [2, -2.5, -12.5],
        // [1, 5.5, -12.5],
        // [4, -4.5, -12.5],
        // [0, -5.5, -12.5],
        // [3, 0.5, -12.5],
        // [2, -0.5, -12.5],
        // [1, 1.5, -12.5],
        // [3, -1.5, -12.5],
        // [2, -2.5, -12.5],
        // [1, 5.5, -12.5],
        // [4, -4.5, -12.5],
        // [0, -5.5, -12.5],
        

      ];

      // this.rows = [-12.5, -10.5, -8.5, -6.5, -4.5, -2.5, 2.5, 4.5, 6.5, 8.5, 10.5, 12.5];

      this.ground_image.onload = function() {
          // _inputHandler.sky_image.onload = function(){
        console.log("asddsa");
        _inputHandler.scene.addGeometry(new Square(shaderNotMoving, 36, 0, 0, [0, 0, 0], false, _inputHandler.ground_image));
        // _inputHandler.scene.addGeometry(new Triangle(shader, .75, .25, 0, [0, 0, 0], false, _inputHandler.default_image));
        // _inputHandler.scene.addGeometry(new TexCubeWithZ(shader, 1, -12, .3, -16, [0, 0, 0], false, _inputHandler.default_image));
        // _inputHandler.scene.addGeometry(new TexCubeWithZ(shader, 1, 15, 0, -16, [0, 0, 0], false, _inputHandler.default_image));
        // _inputHandler.scene.addGeometry(new TexCubeWithZ(shader, 1, 0.5, 1, -15.5, [0, 0, 0], false, _inputHandler.default_image));
        // _inputHandler.scene.addGeometry(new TexCubeWithZ(shader, 1, 0, .3, -16, [0, 0, 0], false, _inputHandler.default_image));
        // _inputHandler.scene.addGeometry(new TexCubeWithZ(shaderNotMoving, 1, 1, 0, -16, [0, 0, 0], false, _inputHandler.default_image));
        // _inputHandler.scene.addGeometry(new TexCubeWithZ(shader, 1, 7.5, 0, -15.5, [0, 0, 0], false, _inputHandler.default_image));
        
        // };
        };
        // for(let i = 0; i < _inputHandler.rows.length; ++i){
        //   for(let j = 0; )
        // }

      
      _inputHandler.sky_image.onload = function(){
        _inputHandler.scene.addGeometry(new TexCube(shader, 32, 0, 0, [0, 0, 0], false, _inputHandler.sky_image));
      }


      this.wall_image.onload = function(){
        for(let i = 0; i < _inputHandler.mapLayout.length; ++i){
          
          let x = _inputHandler.mapLayout[i][1];
          let z = _inputHandler.mapLayout[i][2];
          _inputHandler.scene.addGeometry(new TexCubeWithZ(shaderNotMoving, 1, x, 0, z, [0, 0, 0], false, _inputHandler.wall_image));
          for(let j = 1; j < _inputHandler.mapLayout[i][0]; ++j){
            _inputHandler.scene.addGeometry(new TexCubeWithZ(shaderNotMoving, 1, x, j, z, [0, 0, 0], false, _inputHandler.wall_image));
            
          }
          }
      }

      
      this.ground_image.src = "objs/ground.jpg";
      this.sky_image.src = "objs/sky.jpg";  
      this.wall_image.src = "objs/wall2.jpg";
      this.default_image.src = "objs/cat_.jpg";

      // _inputHandler.scene.addGeometry(new TexCube(shaderTexture, size, x, y, color, false, _inputHandler.image));

      // Mouse Events
      // this.canvas.onmousedown = function(ev) {
      //   _inputHandler.position = _inputHandler.getCanvasCoordinates(ev);
      //   _inputHandler.interval = setInterval(function(){_inputHandler.click()}, 50)
      // };
      this.canvas.onmouseup = function(ev) {clearInterval(_inputHandler.interval)};
      this.canvas.onmousemove = function(ev) { _inputHandler.move(ev) };
      this.canvas.onmouseover = function(ev) {_inputHandler.position = [];};

      // Button Events:
      // this.doc.getElementById("clearcanvas").onclick = function(ev){ _inputHandler.clearcanvas(ev)};
      // this.doc.getElementById("addobject").onclick = function(){_inputHandler.readSelectedFile(0, 0,  _inputHandler.getColorStatus());};
      // this.doc.getElementById("changecolortype").onclick = function(){ _inputHandler.changecolor()};
      // document.getElementById('texInput').onchange = function() { _inputHandler.readTexture() };
      
      this.doc.addEventListener('keydown', function(ev) { _inputHandler.keyDown(ev); }, false);
      this.doc.addEventListener('keyup',   function(ev) { _inputHandler.keyUp(ev);   }, false);

      // // Pick Shape Events:
      // this.doc.getElementById("spinningsquares").onclick = function(ev){ _inputHandler.scene.shape = 3;};
      // this.doc.getElementById("fluctuatingtriangles").onclick = function(ev){ _inputHandler.scene.shape = 4;};
      // this.doc.getElementById("movingcircle").onclick = function(ev){ _inputHandler.scene.shape = 5;};
      // this.doc.getElementById("tiltedcube").onclick = function(ev){ _inputHandler.scene.shape = 6;};

    }

    /*
     * Function called to retrieve RGB color from sliders.
    */
    // getColorStatus(){
    //   let color = [];
    //   color.push((this.doc.getElementById("redslider").value) * .01);
    //   color.push((this.doc.getElementById("greenslider").value) * .01);
    //   color.push((this.doc.getElementById("blueslider").value) * .01);
    //   console.log(color);
    //   return color;
    // }

    /*
     * Function called to retrieve x and y coordiantes of mouse
     * in canvas.
    */

    keyUp(ev){
      let keyname = event.key;
      console.log(keyname);
    }

    keyDown(ev){
      var keyName = event.key;
      console.log("key down", keyName);

      if(keyName == "a") {
          this.camera.truck(-1);
      }
      else if(keyName == "d") {
          this.camera.truck(1);
      } else if(keyName == "s"){
        this.camera.dolly(1);
      } else if(keyName == "w"){
        this.camera.dolly(-1);
      } else if(keyName == "u"){
        this.camera.tilt(1);
      } else if(keyName == "n"){
        this.camera.tilt(-1);
      } else if(keyName == "l"){
        this.camera.pan(1);
      } else if(keyName == "r"){
        this.camera.pan(-1);
      } else if(keyName == "ArrowUp"){
        this.camera.zoom(-1);
      } else if(keyName == "ArrowDown"){
        this.camera.zoom(1);
      } else if (keyName == "z"){
        this.camera.changeView()
      }
      console.log(keyName);
    }

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
  //  changecolor(){
  //     if(_inputHandler.solidcolor){
  //       this.doc.getElementById("changecolortype").innerHTML = "🌈RAINBOW🌈";
  //       _inputHandler.solidcolor = !_inputHandler.solidcolor;
  //     } else {
  //       this.doc.getElementById("changecolortype").innerHTML = "Solid Color ☹️";
  //       _inputHandler.solidcolor = !_inputHandler.solidcolor;
  //     }
  //  }

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
      let newPosition = _inputHandler.getCanvasCoordinates(ev);

      if(_inputHandler.position.length == 0){
        _inputHandler.position[0] = newPosition[0];
        _inputHandler.position[1] = newPosition[1];
        return;
      }
      let angleX = newPosition[0] - _inputHandler.position[0];
      _inputHandler.position[0] = newPosition[0];
      let angleY = newPosition[1] - _inputHandler.position[1];
      _inputHandler.position[1] = newPosition[1];

      _inputHandler.camera.pan(angleX*-10);
      _inputHandler.camera.tilt(angleY*10);
      console.log(angleX);
      // this.doc.getElementById("xCoordinate").innerHTML = _inputHandler.position[0];
      // this.doc.getElementById("yCoordinate").innerHTML = _inputHandler.position[1];
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
