class Square extends Geometry {
  constructor(shader, size, x, y, color, colorType){
    super(shader);
    this.vertices = this.generateSquareVertices(x, y, size, color, colorType);
    this.faces = {0: this.vertices};

    // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
    this.interleaveVertices();
}

generateSquareVertices(x, y, size, color, colorType){
    var vertices = []

    // Pinnacle of Vertex.
    var vertex1 = new Vertex(x - (size/2), y - (size/2), 0.0, color, colorType);
    var vertex2 = new Vertex(x + (size/2), y - (size/2), 0.0, color, colorType);
    var vertex3 = new Vertex(x + (size/2), y + (size/2), 0.0, color, colorType);
    var vertex4 = new Vertex(x - (size/2), y + (size/2), 0.0, color, colorType);

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
}