/**
 * Specifies a vertex. Currently only contains the vertex's position.
 *
 * @author Lucas N. Ferreira
 * @this {Vertex}
 */
class Vertex {
  // constructor(x, y , z) {
  constructor(x, y, z, color, colorSolid) {
      this.point  = new Vector3([x, y, z]);
      if(color == null){
        this.color = [0, 0, 0, 1.0];
        this.textCoord;
      } else {
        this.textCoord;
        if(!colorSolid){
          color[0] = Math.random();
          color[1] = Math.random();
          color[2] = Math.random();
        }
        this.color  = [color[0], color[1], color[2], 1.0];
      }

      // This class can be extended to support other attributes such as
      // normals and UV coordinates.
  }
}
