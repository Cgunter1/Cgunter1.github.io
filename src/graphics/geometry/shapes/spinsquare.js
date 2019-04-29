class SpinSquare extends Square {
    constructor(shader, size, x, y, color){
        super(shader, size, x, y, color);
        this.center = [x, y];
        this.angle = 0;
        this.u_RotationMatrix = new Matrix4();
        this.interleaveVertices();
    }

    render(){
        this.angle += 3;
        this.angle %= 360;
        // You have to do the translation to the origin, turn angle, and translation back to the 
        // original center backwards.
        this.u_RotationMatrix.setTranslate(this.center[0], this.center[1], 0);
        this.u_RotationMatrix.rotate(this.angle, 0, 0, 1);
        this.u_RotationMatrix.translate(-this.center[0], -this.center[1], 0);
        this.shader.changeUniform("uxformMatrix", this.u_RotationMatrix.elements);
        this.interleaveVertices();
    }
}