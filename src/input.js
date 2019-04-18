var _inputHandler = null;

/**
 * Specifies a Input Handler. Used to parse input events from a HTML page.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */
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

      _inputHandler = this;

      // Mouse Events
      this.canvas.onmousedown = function(ev) {
        _inputHandler.position = _inputHandler.getCanvasCoordinates(ev);
        _inputHandler.interval = setInterval(function(){_inputHandler.click()}, 50)
      };
      this.canvas.onmouseup = function(ev) {clearInterval(_inputHandler.interval)};
      this.canvas.onmousemove = function(ev) { _inputHandler.move(ev) };

      // Button Events:
      this.doc.getElementById("clearcanvas").onclick = function(ev){ _inputHandler.clearcanvas(ev)};
      this.doc.getElementById("trianglesbutton").onclick = function(ev){ _inputHandler.scene.shape = 0};
      this.doc.getElementById("sqauresbutton").onclick = function(ev){ _inputHandler.scene.shape = 1};
      this.doc.getElementById("circlesbutton").onclick = function(ev){ _inputHandler.scene.shape = 2};
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

    /**
     * Function called upon mouse click.
     */
    click(ev) {
        // Find the x,y coordinates of the center.
        let [x, y] = _inputHandler.position;
        console.log(`${x} ${y}`);


        // Calculating Size.
        let size = this.doc.getElementById("sizeslider").value;
        size *= .01;

        // Setting Color
        let color = this.getColorStatus();
        
        var shape;
        switch(this.scene.shape){
          case 0:
            shape = new Triangle(shader, size, x, y, color);
            break;
          case 1:
            shape = new Square(shader, size, x, y, color);
            break;
          case 2:
            shape = new Circle(shader, size, x, y, color, this.getCircleSegments());
            break;
          default:
            console.error("Should not be able to get here");
            break;
          }
        this.scene.addGeometry(shape);
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
}
