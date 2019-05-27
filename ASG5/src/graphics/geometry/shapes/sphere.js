class Sphere extends Geometry {
  /**
   * Constructor for Sphere.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Sphere} Sphere created
   */
  constructor(shader, segments, color, z, x) {
      super(shader);

      this.x = x;
      this.z = z;
      this.vertices = this.generateSphereVertices(segments, color);
      this.u_Translate_Matrix = new Matrix4();
      this.u_Normal_Matrix = new Matrix4();

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateSphereVertices(segments, color) {
      var outerVerts = [];

      // Generate coordinates
      for (var j = 0; j <= segments; j++) {
          var aj = j * Math.PI / segments;
          var sj = Math.sin(aj);
          var cj = Math.cos(aj);
          for (var i = 0; i <= segments; i++) {
              var ai = i * 2 * Math.PI / segments;
              var si = Math.sin(ai);
              var ci = Math.cos(ai);

              outerVerts.push({"x": si * sj, "y": cj, "z": ci * sj});
              console.log(outerVerts);
          }
      }

      var vertices = [];

      // Generate vertices
      for (var j = 0; j < segments; j++) {
        for (var i = 0; i < segments; i++) {
          var p1 = j * (segments+1) + i;
          var p2 = p1 + (segments+1);

          var vertex0 = new Vertex(outerVerts[p1].x, outerVerts[p1].y, outerVerts[p1].z, color, true);
          vertex0.normal.elements[0] = outerVerts[p1].x;
          vertex0.normal.elements[1] = outerVerts[p1].y;
          vertex0.normal.elements[2] = outerVerts[p1].z;

          var vertex1 = new Vertex(outerVerts[p2].x, outerVerts[p2].y, outerVerts[p2].z, color, true);
          vertex1.normal.elements[0] = outerVerts[p2].x;
          vertex1.normal.elements[1] = outerVerts[p2].y;
          vertex1.normal.elements[2] = outerVerts[p2].z;

          var vertex2 = new Vertex(outerVerts[p1 + 1].x, outerVerts[p1 + 1].y, outerVerts[p1 + 1].z, color, true);
          vertex2.normal.elements[0] = outerVerts[p1 + 1].x;
          vertex2.normal.elements[1] = outerVerts[p1 + 1].y;
          vertex2.normal.elements[2] = outerVerts[p1 + 1].z;

          vertices.push(vertex0, vertex1, vertex2);

          var vertex3 = new Vertex(outerVerts[p1 + 1].x, outerVerts[p1 + 1].y, outerVerts[p1 + 1].z, color, true);
          vertex3.normal.elements[0] = outerVerts[p1 + 1].x;
          vertex3.normal.elements[1] = outerVerts[p1 + 1].y;
          vertex3.normal.elements[2] = outerVerts[p1 + 1].z;

          var vertex4 = new Vertex(outerVerts[p2].x, outerVerts[p2].y, outerVerts[p2].z, color, true);
          vertex4.normal.elements[0] = outerVerts[p2].x;
          vertex4.normal.elements[1] = outerVerts[p2].y;
          vertex4.normal.elements[2] = outerVerts[p2].z;

          var vertex5 = new Vertex(outerVerts[p2 + 1].x, outerVerts[p2 + 1].y, outerVerts[p2 + 1].z, color, true);
          vertex5.normal.elements[0] = outerVerts[p2 + 1].x;
          vertex5.normal.elements[1] = outerVerts[p2 + 1].y;
          vertex5.normal.elements[2] = outerVerts[p2 + 1].z;

          vertices.push(vertex3, vertex4, vertex5);
        }
      }
      return vertices;
   }

   render() {
       // Transform geometry here!
       // Rotations!
       this.u_Translate_Matrix.setTranslate(this.x, 0, this.z);
       this.u_Translate_Matrix.scale(.5, .5, .5);

       this.u_Normal_Matrix.setInverseOf(this.u_Translate_Matrix);
       this.u_Normal_Matrix.transpose();

       this.shader.changeUniform("u_xformMatrix", this.u_Translate_Matrix.elements);
       this.shader.changeUniform("u_NormalMatrix", this.u_Normal_Matrix.elements);

       super.render();
   }
}
