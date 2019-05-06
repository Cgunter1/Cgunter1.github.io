class Cube extends Geometry {
    constructor(shader, size, x, y, color, colorType, image){
        super(shader);
        this.image = image;
        this.vertices = this.generateCubeVertices(x, y, size, color, colorType);

        // ************************************
        // Fix so this.faces equals the separate faces. 
        this.faces = {0: this.vertices};
        this.center = [x, y];
        this.angle = 0;
        this.u_RotationMatrix = new Matrix4();

        // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
        this.interleaveVertices();
    }

    generateCubeVertices(x, y, size, color, colorType) {
        var vertices = [];


        // Faces:

        // Front
        var vertexFront1 = new Vertex(x - (size/2), y - (size/2),(size/2), color, colorType);
        var vertexFront2 = new Vertex(x + (size/2), y - (size/2),(size/2), color, colorType);
        var vertexFront3 = new Vertex(x + (size/2), y + (size/2), (size/2), color, colorType);
        var vertexFront4 = new Vertex(x - (size/2), y + (size/2), (size/2), color, colorType);
        vertices.push(vertexFront1);
        vertices.push(vertexFront2);
        vertices.push(vertexFront3);
        vertices.push(vertexFront1);
        vertices.push(vertexFront3);
        vertices.push(vertexFront4);
        // Back
        var vertexBack1 = new Vertex(x - (size/2), y - (size/2), -(size/2), color, colorType);
        var vertexBack2 = new Vertex(x - (size/2), y + (size/2), -(size/2), color, colorType);
        var vertexBack3 = new Vertex(x + (size/2), y + (size/2), -(size/2), color, colorType);
        var vertexBack4 = new Vertex(x + (size/2), y - (size/2), -(size/2), color, colorType);
        vertices.push(vertexBack1);
        vertices.push(vertexBack2);
        vertices.push(vertexBack3);
        vertices.push(vertexBack1);
        vertices.push(vertexBack3);
        vertices.push(vertexBack4);
        

        //Top
        var vertexTop1 = new Vertex(x - (size/2), y + (size/2), -(size/2), color, colorType);
        var vertexTop2 = new Vertex(x - (size/2), y + (size/2), (size/2), color, colorType);
        var vertexTop3 = new Vertex(x + (size/2), y + (size/2), (size/2), color, colorType);
        var vertexTop4 = new Vertex(x + (size/2), y + (size/2), -(size/2), color, colorType);
        vertices.push(vertexTop1);
        vertices.push(vertexTop2);
        vertices.push(vertexTop3);
        vertices.push(vertexTop1);
        vertices.push(vertexTop3);
        vertices.push(vertexTop4);

        // Bottom
        var vertexBottom1 = new Vertex(x - (size/2), y - (size/2), -(size/2), color, colorType);
        var vertexBottom2 = new Vertex(x + (size/2), y - (size/2), -(size/2), color, colorType);
        var vertexBottom3 = new Vertex(x + (size/2), y - (size/2), (size/2), color, colorType);
        var vertexBottom4 = new Vertex(x - (size/2), y - (size/2), (size/2), color, colorType);
        vertices.push(vertexBottom1);
        vertices.push(vertexBottom2);
        vertices.push(vertexBottom3);
        vertices.push(vertexBottom1);
        vertices.push(vertexBottom3);
        vertices.push(vertexBottom4);

        // Left
        var vertexLeft1 = new Vertex(x - (size/2), y - (size/2), -(size/2), color, colorType);
        var vertexLeft2 = new Vertex(x - (size/2), y - (size/2), (size/2), color, colorType);
        var vertexLeft3 = new Vertex(x - (size/2), y + (size/2), (size/2), color, colorType);
        var vertexLeft4 = new Vertex(x - (size/2), y + (size/2), -(size/2), color, colorType);
        vertices.push(vertexLeft1);
        vertices.push(vertexLeft2);
        vertices.push(vertexLeft3);
        vertices.push(vertexLeft1);
        vertices.push(vertexLeft3);
        vertices.push(vertexLeft4);

        // Right
        var vertexRight1 = new Vertex(x + (size/2), y - (size/2), -(size/2), color, colorType);
        var vertexRight2 = new Vertex(x + (size/2), y + (size/2), -(size/2), color, colorType);
        var vertexRight3 = new Vertex(x + (size/2), y + (size/2), (size/2), color, colorType);
        var vertexRight4 = new Vertex(x + (size/2), y - (size/2), (size/2), color, colorType);
        vertices.push(vertexRight1);
        vertices.push(vertexRight2);
        vertices.push(vertexRight3);
        vertices.push(vertexRight1);
        vertices.push(vertexRight3);
        vertices.push(vertexRight4);

        return vertices;
    }

    render(){
        this.angle += 3;
        this.angle %= 360;
        // You have to do the translation to the origin, turn angle, and translation back to the 
        // original center backwards.
        this.u_RotationMatrix.setTranslate(this.center[0], this.center[1], 0);
        this.u_RotationMatrix.rotate(this.angle, 0, 1, 0);
        this.u_RotationMatrix.rotate(15, 0, 0, 1);
        this.u_RotationMatrix.translate(-this.center[0], -this.center[1], 0);
        this.shader.changeUniform("uxformMatrix", this.u_RotationMatrix.elements);
        this.interleaveVertices();
    }

}