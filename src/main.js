var shader = null;
var shaderTexture;
const ANGLE = 45;


function main() {
  // Retrieve the canvas from the HTML document
  canvas = document.getElementById("webgl");
  let doc = document;

  // Retrieve WebGL rendering context
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }

  // Initialize shader
  shader = new Shader(gl, ASG1_VSHADER, ASG1_FSHADER);
  shaderRotation = new Shader(gl, ROTATE_VSHADER, ASG1_FSHADER);
  shaderTexture = new Shader(gl, TEX_VSHADER, TEX_FSHADER);

  // Initialize the scene
  var scene = new Scene();
  var inputHandler = new InputHandler(canvas, scene, doc);

  // Add attibutes to shaders.
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");

  shaderRotation.addAttribute("a_Position");
  shaderRotation.addAttribute("a_Color");

  shaderTexture.addAttribute("a_Position");
  shaderTexture.addAttribute("a_Color");
  shaderTexture.addAttribute("a_TexCoord");

  // Add uniforms
  shader.addUniform("u_Sampler", "sampler2D", 0);


  // // Add Matrices.
  let u_RotationMatrix = new Matrix4();
  u_RotationMatrix.setRotate(ANGLE, 0, 0, 1);

  // Add uniforms to shaders.
  shaderRotation.addUniform("uxformMatrix", "mat4", u_RotationMatrix.elements);
  shaderTexture.addUniform("uxformMatrix", "mat4", u_RotationMatrix.elements);

  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, null);
  renderer.start();
}