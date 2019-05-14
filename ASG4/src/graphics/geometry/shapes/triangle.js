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
  constructor(shader, size, centerX, centerY, color, colorType, image) {
      super(shader);

      this.vertices = this.generateTriangleVertices(centerX, centerY, size, color, colorType);
      this.faces = {0: this.vertices};

      this.image = image;

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateTriangleVertices(x, y, size, color, colorType) {
      var vertices = []

      // Pinnacle of Vertex.
      var vertex1 = new Vertex(x, y + (size/2), -2.0, color, colorType);
      vertex1.texCoord = [0.0,0.0];
      var vertex2 = new Vertex(x + (size/2), y - (size/2), -2.0, color, colorType);
      vertex2.texCoord = [1.0,0.0];
      var vertex3 = new Vertex(x - (size/2), y - (size/2), -2.0, color, colorType);
      vertex3.texCoord = [0.5,1.0];
    
      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);

      return vertices;
  }
}
