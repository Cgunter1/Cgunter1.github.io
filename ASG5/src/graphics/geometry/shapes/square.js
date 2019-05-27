class Square extends Geometry {
  constructor(shader, size, x, y, color, colorType, image){
    super(shader);
    this.vertices = this.generateSquareVertices(x, y, size, color, colorType);
    this.faces = {0: this.vertices};
    this.image = image;
    this.u_RotationMatrix = new Matrix4();
    // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
    this.interleaveVertices();
}

generateSquareVertices(x, y, size, color, colorType){
    var vertices = [];

    // Pinnacle of Vertex.
    var vertex1 = new Vertex(x - (size/2),  -.5, y - (size/2), color, colorType);
    vertex1.textCoord = [0.0, 0.0];
    var vertex2 = new Vertex(x + (size/2), -.5, y - (size/2),  color, colorType);
    vertex2.textCoord = [1.0, 0.0];
    var vertex3 = new Vertex(x + (size/2),-.5, y + (size/2), color, colorType);
    vertex3.textCoord = [1.0, 1.0];
    var vertex4 = new Vertex(x - (size/2), -.5,  y + (size/2), color, colorType);
    vertex4.textCoord = [0.0, 1.0];

    vertex1.normal.elements = vertex2.normal.elements = vertex3.normal.elements = vertex4.normal.elements = [0, 1, 0];

    // Triangle 1: v1, v2, v3.
    // Triangle 2: v1, v4, v3.

    vertices.push(vertex1);
    vertices.push(vertex2);
    vertices.push(vertex3);
    vertices.push(vertex1);
    vertices.push(vertex4);
    vertices.push(vertex3);
    

    return vertices;
}
render(){
  // this.u_RotationMatrix.setTranslate(0, 0, 0);
  //   this.u_RotationMatrix.rotate(this.angle, 0, 1, 0);
    // this.u_RotationMatrix.rotate(15, 0, 0, 1);
  //   this.u_RotationMatrix.translate(-this.center[0], -this.center[1], -20);
  console.log(this.u_RotationMatrix);
  this.shader.changeUniform("u_xformMatrix", this.u_RotationMatrix.elements);
    // this.interleaveVertices();
}

}