class MultiTexCube extends TexCube {
  constructor(shader, size, x, y, color, colorType, image){
    super(shader, size, x, y, color, colorType, image);

  
    // Create correct dimensions for the first cube.
    // Faces
    // Front:
    // Same
    // Back:
    this.vertices[6].textCoord = [1.0, 0.5];
    this.vertices[7].textCoord = [1.0, 1.0];
    this.vertices[8].textCoord = [0.0, 1.0];
    this.vertices[9].textCoord = [1.0, 0.5];
    this.vertices[10].textCoord = [0.0, 1.0];
    this.vertices[11].textCoord = [0.0, 0.5]; 
    
    // Top:
    // Same
    // Bottom:
    this.vertices[18].textCoord = [0.0, 0.0];
    this.vertices[19].textCoord = [3.0, 0.0];
    this.vertices[20].textCoord = [3.0, 3.0];
    this.vertices[21].textCoord = [0.0, 0.0];
    this.vertices[22].textCoord = [3.0, 3.0];
    this.vertices[23].textCoord = [0.0, 3.0]; 
    

     // Left:
     this.vertices[24].textCoord = [0.0, 0.0];
     this.vertices[25].textCoord = [2.0, 0.0];
     this.vertices[26].textCoord = [2.0, 1.0];
     this.vertices[27].textCoord = [0.0, 0.0];
     this.vertices[28].textCoord = [2.0, 1.0];
     this.vertices[29].textCoord = [0.0, 1.0]; 

    // Right
    this.vertices[30].textCoord = [1.0, 0.0];
    this.vertices[31].textCoord = [1.0, 0.5];
    this.vertices[32].textCoord = [0.0, 0.5];
    this.vertices[33].textCoord = [1.0, 0.0];
    this.vertices[34].textCoord = [0.0, 0.5];
    this.vertices[35].textCoord = [0.0, 0.0];
  }
}