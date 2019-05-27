class RandomCircle extends Circle {
    constructor(shader, radius, centerX, centerY, color, segments, colorType){
        super(shader, radius, centerX, centerY, color, segments, colorType);
        this.center = [centerX, centerY];
        
        this.radius = radius;

        // X and Y starter movements.
        this.moveX = .01;
        this.moveY = .01;

        // Starter directions of X and Y axis.
        this.moveDown = true;
        this.moveLeft = true;
        this.u_TranslateMatrix = new Matrix4();

        // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
        this.interleaveVertices();
    }

    render(){
        // Randomly changes directions in either the X and Y coordinates.
        if(Math.random() < .02){
            this.moveLeft = !this.moveLeft;
        }
        if(Math.random() < .02){
            this.moveDown = !this.moveDown;
        }


        if(this.moveLeft){
            this.moveX += -.01;
        } else {
            this.moveX += .01;
        }
        if(this.moveDown){
            this.moveY += -.01;
        } else {
            this.moveY += .01;
        }
        let [x, y] = this.center;
        let radius = this.radius;
        console.log(this.moveY);

        console.log(x + radius*Math.cos(0) + this.moveX);

        if((x + radius*Math.cos(0) + this.moveX) >= 1.3){
            console.log("dsa");
            this.moveLeft = true;
        } else if((x + radius*Math.cos(180) + this.moveX) <= -1.1){
            this.moveLeft = false;
        }
        if((y + radius*Math.sin(90) + this.moveY) > 1.3){
            console.log("asdfff");
            this.moveDown = true;
        } else if((y + radius*Math.sin(270) + this.moveY) <= -.9){
            this.moveDown = false;
        }

        this.u_TranslateMatrix.setTranslate(this.moveX, this.moveY, 0);
        this.shader.changeUniform("uxformMatrix", this.u_TranslateMatrix.elements);
        this.interleaveVertices();

    }
}