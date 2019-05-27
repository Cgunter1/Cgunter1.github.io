class Light {
    constructor(x, y, z) {
        this.pos = new Vector3([x, y, z]);
        this.angle = 1;
        this.matrixRotation = new Matrix4();

        // light colors
        this.ambient = [0.45,0.45,0.45];
        this.diffuse = [0.85,0.85,0.85];
        this.specular = [1.0, 1.0, 1.0];

        // Later you will add specular here too.
    }
    newLightPosition(){
        this.angle += 5;
        this.angle %= 360;
        this.matrixRotation.setRotate(this.angle, 0, 0, 1);
        return this.matrixRotation.multiplyVector3(this.pos);
    }
}
