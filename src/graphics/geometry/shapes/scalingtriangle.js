class ScalingTriangle extends Triangle {
    constructor(shader, size, centerX, centerY, color) {
        super(shader, size, centerX, centerY, color);

        this.center = [centerX, centerY];
        this.scaleFactor = .1;
        this.factorUp = true;
        this.u_ScaleMatrix = new Matrix4();

        // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
        this.interleaveVertices();
    }

    render(){
        
        
        if(this.factorUp && this.scaleFactor < 2.0 ){
            this.scaleFactor += .01;
        } else if(this.factorUp){
            this.factorUp = false;
            this.scaleFactor -= .01;
        } else if(!this.factorUp && this.scaleFactor > .01){
            this.scaleFactor -= .01;
        } else {
            this.factorUp = true;
            this.scaleFactor += .01;
        }

        this.u_ScaleMatrix.setTranslate(this.center[0], this.center[1], 0);
        this.u_ScaleMatrix.scale(this.scaleFactor, this.scaleFactor, 1);
        this.u_ScaleMatrix.translate(-this.center[0], -this.center[1], 0);
        this.shader.changeUniform("uxformMatrix", this.u_ScaleMatrix.elements);
        this.interleaveVertices();
    }
}