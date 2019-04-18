/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Triangle}
 */
class Triangle extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Triangle} Triangle created
   */
  constructor(shader, size, centerX, centerY, color) {
      super(shader);

      this.vertices = this.generateTriangleVertices(centerX, centerY, size, color);
      this.faces = {0: this.vertices};

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateTriangleVertices(x, y, size, color) {
      var vertices = []

      // Pinnacle of Vertex.
      var vertex1 = new Vertex(x, y + (size/2), 0.0, color);
      var vertex2 = new Vertex(x + (size/2), y - (size/2), 0.0, color);
      var vertex3 = new Vertex(x - (size/2), y - (size/2), 0.0, color);
    
      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);

      return vertices;
  }
}
