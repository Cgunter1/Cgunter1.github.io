/**
 * Specifies a Camera that can Dolly/Truck and Tilt/Pan.
 *
 * @author Lucas N. Ferreira
 * @this {Renderer}
 */
class Camera {
  /**
   * Constructor for Camera.
   *
   * @constructor
   * @returns {Camera} Camera object created
   */
   constructor(canvas) {
       this.speed = 0.1;
       this.canvas = canvas;

       // Camera view attributes
       this.eye     = new Vector3([0, 0, 0]);
       this.center  = new Vector3([0, 0,-1]);
       this.up      = new Vector3([0, 1, 0]);

       this.transformMatrix = new Matrix4();
       this.tilt_rotate = new Matrix4();

       this.viewMatrix = new Matrix4();
       this.updateView();
       this.angle = 30;
       this.isProjection = true;
       this.projectionMatrix = new Matrix4();
      //  this.projectionMatrix.setOrtho(-1, 1, -1, 1, 1, 100);
        this.projectionMatrix.setPerspective(this.angle, canvas.width/canvas.height, 1, 150);
   }

   truck(dir) {
       // Calculate the n camera axis
       var n = this.eye.sub(this.center);
       n = n.normalize()

       // Calculate the u camera axis
       var u = this.up.cross(n);
       u = u.normalize();

       // Scale the u axis to the desired distance to move
       u = u.mul(dir * this.speed);

       // Add the direction vector to both the eye and center positions
       this.eye = this.eye.add(u);
       this.center = this.center.add(u);

       this.updateView();
   }

   dolly(dir) {
       // Calculate the n camera axis
       var n = this.eye.sub(this.center);
       n = n.normalize()

       n = n.mul(dir * this.speed);
       this.eye = this.eye.add(n);
       this.center = this.center.add(n);

       this.updateView();
   }

   tilt(angle){
    // Calculate the n camera axis
    console.log(this.center);
    var n = this.eye.sub(this.center);
    n = n.normalize()

    // Calculate the u camera axis
    var u = this.up.cross(n);
    u = u.normalize();

    var new_center = this.center.sub(this.eye);

    console.log('ads');
    console.log(u.elements);

    this.tilt_rotate.setRotate(angle, u.elements[0], u.elements[1], u.elements[2]);
    console.log(this.tilt_rotate);


    new_center = this.tilt_rotate.multiplyVector3(new_center);

    this.center = new_center.add(this.eye);

    console.log(this.center);

    // if(Math.abs(n.dot(n, this.up)) >= 0.985){
    //   this.up = tilt_rotate.multiplyVector3(this.up);
    // }

    this.updateView();
   }

  pan(angle){

    var new_center = this.center.sub(this.eye);

    this.tilt_rotate.setRotate(angle, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
    console.log(this.tilt_rotate);


    new_center = this.tilt_rotate.multiplyVector3(new_center);

    this.center = new_center.add(this.eye);

    console.log(this.center);

    this.updateView();
  }
  zoom(amount){
    this.angle += amount;
    this.projectionMatrix.setPerspective(this.angle, canvas.width/canvas.height, 1, 150);
  }

   updateView() {
       this.viewMatrix.setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
                                 this.center.elements[0], this.center.elements[1], this.center.elements[2],
                                 this.up.elements[0], this.up.elements[1], this.up.elements[2]);
   }

   changeView(){
    if(this.isProjection){
      this.projectionMatrix.setOrtho(-1, 1, -1, 1, 1, 100); 
    } else {
      this.projectionMatrix.setPerspective(this.angle, this.canvas.width/this.canvas.height, 1, 150);
    }
    this.isProjection = !this.isProjection;
   }
}
