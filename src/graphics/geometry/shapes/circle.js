class Circle extends Geometry {
  constructor(shader, radius, centerX, centerY, color, segments, colorType){
    super(shader);
    this.vertices = this.generateCircleVertices(centerX, centerY, radius, color, segments, colorType);
    this.faces = {0: this.vertices};

    // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
    this.interleaveVertices();
}
// **CITATION:**
// This code was borrowed from a previous project that I did in CMPS109, when
// I had to draw a circle in OPENGL with C++.

  generateCircleVertices(x, y, radius, color, segments, colorType) {
      var vertices = [];

      radius /= 2;

      // Establishes center for circle.
      vertices.push(new Vertex(x, y, 0.0, color, colorType));

      // Iterates through all possible points of the circle using Triangle_Fan.
      let angleItor = (2*Math.PI)/segments;
      for(let theta = 0; theta < 2*Math.PI; theta += angleItor){
        vertices.push(new Vertex(x + radius*Math.cos(theta), y + radius*Math.sin(theta), 0.0, color, colorType));
      }

      vertices.push(new Vertex(x + radius, y, 0.0, color, colorType));

      return vertices;
  }
}