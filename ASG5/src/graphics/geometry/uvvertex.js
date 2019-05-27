/**
 * Specifies a vertex. Currently only contains the vertex's position.
 *
 * @author Lucas N. Ferreira
 * @this {Vertex}
 */
class UVVertex extends Vertex{
    constructor(x, y, z) {
      this.point  = new Vector3([x, y, z]);
      this.color = [];
      this.texCoord = [0.0, 0.0];
      // This class can be extended to support other attributes such as
      // normals and UV coordinates.
  }
}
