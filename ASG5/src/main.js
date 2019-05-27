var shader = null;
var shaderNotMoving;
var normalShader;
var textureShader;
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
  // shader = new Shader(gl, ASG1_VSHADER, ASG1_FSHADER);
  // shaderRotation = new Shader(gl, ROTATE_VSHADER, ASG1_FSHADER);
  normalShader = new Shader(gl, ASG5_VSHADER_NOT_MOVING, ASG5_FSHADER_COMPLETE_COLOR);
  shaderNotMoving = new Shader(gl, ASG4_VSHADER_NOT_MOVING, TEX_FSHADER);
  shader = new Shader(gl, ASG4_VSHADER, ASG4_FSHADER);
  textureShader = new Shader(gl, ASG5_TEX_VSHADER, ASG5_TEX_FSHADER);


  // Initialize the scene
  var scene = new Scene();
  var camera = new Camera(canvas);
  var light = new Light(0, 15, -10);
  scene.setLight(light);

  var inputHandler = new InputHandler(canvas, scene, doc, camera);

  // // Add attibutes to shaders.
  // shader.addAttribute("a_Position");
  // shader.addAttribute("a_Color");

  // shaderRotation.addAttribute("a_Position");
  // shaderRotation.addAttribute("a_Color");

  shaderNotMoving.addAttribute("a_Position");
  shaderNotMoving.addAttribute("a_Color");
  shaderNotMoving.addAttribute("a_TexCoord");

  // // Add uniforms
  // shader.addUniform("u_Sampler", "sampler2D", 0);

  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");
  shader.addAttribute("a_TexCoord");

  normalShader.addAttribute("a_Position");
  normalShader.addAttribute("a_Color");
  normalShader.addAttribute("a_Normal");

  textureShader.addAttribute("a_Position");
  textureShader.addAttribute("a_Color");
  // textureShader.addAttribute("a_Normal");
  textureShader.addAttribute("a_TexCoord");

  shader.addUniform("u_Sampler", "sampler2D", new Matrix4().elements);
  shader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);

  // Textured Block Shaders.
  textureShader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  textureShader.addUniform("u_xformMatrix", "mat4", new Matrix4().elements);
  textureShader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);
  textureShader.addUniform("u_NormalMatrix", "mat4", new Matrix4().elements);
  textureShader.addUniform("u_Sampler", "sampler2D", new Matrix4().elements);
  textureShader.addUniform("u_AmbientColor", "vec3", new Vector3().elements);

  textureShader.addUniform("u_LightPos", "vec3", new Vector3().elements);
  textureShader.addUniform("u_DiffuseColor", "vec3", new Vector3().elements);
  textureShader.addUniform("u_SpecularColor", "vec3", new Vector3().elements);
  textureShader.addUniform("u_EyePosition", "vec3", new Vector3().elements);



  // Sphere and Ground Shaders.
  normalShader.addUniform("u_Sampler", "sampler2D", new Matrix4().elements);
  normalShader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  normalShader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);
  normalShader.addUniform("u_xformMatrix", "mat4", new Matrix4().elements);
  normalShader.addUniform("u_NormalMatrix", "mat4", new Matrix4().elements);
  normalShader.addUniform("u_AmbientColor", "vec3", new Vector3().elements);
  normalShader.addUniform("u_LightPos", "vec3", new Vector3().elements);
  normalShader.addUniform("u_DiffuseColor", "vec3", new Vector3().elements);
  normalShader.addUniform("u_SpecularColor", "vec3", new Vector3().elements);
  normalShader.addUniform("u_EyePosition", "vec3", new Vector3().elements);


  shaderNotMoving.addUniform("u_Sampler", "sampler2D", new Matrix4().elements);
  shaderNotMoving.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  shaderNotMoving.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);

  // // // Add Matrices.
  // let u_RotationMatrix = new Matrix4();
  // u_RotationMatrix.setRotate(ANGLE, 0, 0, 1);

  // // // Add uniforms to shaders.
  shader.addUniform("uxformMatrix", "mat4", new Matrix4().elements);

  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, camera);
  renderer.start();
}