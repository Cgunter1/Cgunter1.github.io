// Vertex Shader
var ASG1_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  varying vec4 v_Color;

  void main() {
    v_Color = a_Color;
    gl_Position = a_Position;
  }`;

var ROTATE_VSHADER = 
  `
  precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  varying vec4 v_Color;
  uniform mat4 uxformMatrix;
  void main(){
    v_Color = a_Color;
    gl_Position = uxformMatrix * a_Position;
  }`;

  // Put back in uxformMatrix later.

  var TEX_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  attribute vec2 a_TexCoord;
  varying vec2 v_TexCoord;
  varying vec4 v_Color;
  uniform mat4 uxformMatrix;

  void main() {
    v_Color = a_Color;
    v_TexCoord = a_TexCoord;
    gl_Position = uxformMatrix * a_Position;
  }`;

// Fragment Shader
var TEX_FSHADER =
  `precision mediump float;
  varying vec4 v_Color;
  varying vec2 v_TexCoord;

  uniform sampler2D u_Sampler;

  void main() {
    gl_FragColor = texture2D(u_Sampler, v_TexCoord);
  }`;

  var ASG4_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  varying vec4 v_Color;
  attribute vec2 a_TexCoord;
  varying vec2 v_TexCoord;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  uniform mat4 uxformMatrix;

  void main() {
    v_Color = a_Color;
    v_TexCoord = a_TexCoord;
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * uxformMatrix * a_Position;
  }`;

  var ASG4_VSHADER_NOT_MOVING =
  `precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  varying vec4 v_Color;
  attribute vec2 a_TexCoord;
  varying vec2 v_TexCoord;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;

  void main() {
    v_Color = a_Color;
    v_TexCoord = a_TexCoord;
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * a_Position;
  }`;

// Fragment Shader
var ASG4_FSHADER =
  `precision mediump float;
  varying vec4 v_Color;
  varying vec2 v_TexCoord;

  uniform sampler2D u_Sampler;

  void main() {
    gl_FragColor = texture2D(u_Sampler, v_TexCoord);
  }`;

// Fragment Shader
var ASG1_FSHADER =
  `precision mediump float;
  varying vec4 v_Color;

  void main() {
    gl_FragColor = v_Color;
  }`;

