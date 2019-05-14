/**
 * Specifies a Scene full of Geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */
class Scene {
  /**
   * Constructor for Scene.
   *
   * @constructor
   * @returns {Scene} Scene object created
   */
  constructor() {
    this.geometries = []; // Geometries being drawn on canvas
    this._shape = 0; // 0: Triangle, 1: Square, 2: Circle
  }

  /**
   * Adds the given geometry to the the scene.
   *
   * @param {Geometry} geometry Geometry being added to scene
   */
  addGeometry(geometry) {
    this.geometries.push(geometry);
  }

  get shape() {
    return this._shape;
  }

  set shape(val) {
    this._shape = val;
  }

  /**
   * Clears all the geometry within the scene.
   */
  clearGeometries() {
    this.geometries = [];
  }
}
