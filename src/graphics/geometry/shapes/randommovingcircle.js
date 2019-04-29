class RandomCircle extends Circle {
    constructor(shader, radius, centerX, centerY, color, segments){
        super(shader, radius, centerX, centerY, color, segments);
        this.center = [centerX, centerY];


        this.vertices = this.generateCircleVertices(centerX, centerY, radius, color, segments);
        
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

    generateCircleVertices(x, y, radius, color, segments) {
        var vertices = [];

        radius /= 2;

        // Establishes center for circle.
        vertices.push(new Vertex(x, y, 0.0, color));

        // Iterates through all possible points of the circle using Triangle_Fan.
        let angleItor = (2*Math.PI)/segments;
        for(let theta = 0; theta < 2*Math.PI; theta += angleItor){
            console.log(`${x + radius*Math.cos(theta)} ${y + radius*Math.sin(theta)}`);
            if(x + radius*Math.cos(theta) >= .99 || x + radius*Math.cos(theta) <= -.99){
                this.moveDown = !this.moveDown;
            }
            if(y + radius*Math.sin(theta) >= .99 || y + radius*Math.sin(theta) <= -.99){
                this.moveLeft = !this.moveLeft;
            }
            vertices.push(new Vertex(x + radius*Math.cos(theta), y + radius*Math.sin(theta), 0.0, color));
        }

        vertices.push(new Vertex(x + radius, y, 0.0, color));

        return vertices;
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