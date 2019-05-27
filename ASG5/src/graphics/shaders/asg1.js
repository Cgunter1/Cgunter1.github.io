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

// Vertex Shader
var ASG5_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  varying vec3 v_Position;

  attribute vec4 a_Color;
  varying vec4 v_Color;

  attribute vec4 a_Normal;
  varying vec3 v_Normal;

  uniform mat4 u_NormalMatrix;
  uniform mat4 u_ModelMatrix;

  void main() {
    v_Color = a_Color;
    v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));
    gl_Position = u_ModelMatrix * a_Position;
  }`;

// Fragment Shader
var ASG5_FSHADER =
  `precision mediump float;
  varying vec4 v_Color;
  varying vec3 v_Normal;

  uniform vec3 u_LightPos;
  uniform vec3 u_AmbientColor;
  uniform vec3 u_DiffuseColor;

  void main() {
    gl_FragColor = vec4(v_Normal, 1.0);
  }`;

  var ASG5_VSHADER_NOT_MOVING =
  `precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  attribute vec4 a_Normal;
  varying vec3 v_Normal;
  varying vec4 v_Color;
  varying vec3 v_Position;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_xformMatrix;
  uniform mat4 u_ProjectionMatrix;
  uniform mat4 u_NormalMatrix;

  void main() {

    v_Normal = vec3(u_NormalMatrix * a_Normal);
    v_Color = a_Color;
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_xformMatrix * a_Position;
    v_Position = vec3(u_xformMatrix * a_Position);
  }`;

// Fragment Shader
var ASG5_FSHADER_COMPLETE_COLOR =
  `precision mediump float;
  varying vec4 v_Color;
  varying vec3 v_Normal;
  varying vec3 v_Position;

  uniform vec3 u_AmbientColor;
  uniform vec3 u_DiffuseColor;
  uniform vec3 u_SpecularColor;
  uniform sampler2D u_Sampler;
  uniform vec3 u_LightPos;
  uniform vec3 u_EyePosition;

  void main() {
    
    vec3 lightDirection = normalize(u_LightPos - v_Position);
    vec3 viewDirection = normalize(u_EyePosition - v_Position);

    vec3 reflection = 2.0 * (dot(normalize(v_Normal), lightDirection)) * normalize(v_Normal) - lightDirection;

    float specAngle = max(dot(normalize(reflection), viewDirection), 0.0);

    float specularAngle = 0.0;

    specularAngle = pow(specAngle, 4.0); 

    float nDotL = max(dot(lightDirection, normalize(v_Normal)), 0.0);

    vec3 ambient = u_AmbientColor * v_Color.rgb;

    vec3 diffuse = u_DiffuseColor * v_Color.rgb * nDotL; 

    vec3 specular = u_SpecularColor  * specularAngle;


    gl_FragColor = vec4(ambient + diffuse + specular, v_Color.a);
  }`;


  var ASG5_TEX_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  attribute vec2 a_TexCoord;
  attribute vec4 a_Normal;
  varying vec3 v_Normal;
  varying vec2 v_TexCoord;
  varying vec4 v_Color;
  varying vec3 v_Position;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_xformMatrix;
  uniform mat4 u_ProjectionMatrix;
  uniform mat4 u_NormalMatrix;

  void main() {

    v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));
    v_Color = a_Color;
    v_TexCoord = a_TexCoord;
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_xformMatrix * a_Position;
    v_Position = vec3(u_xformMatrix * a_Position);
  }`;

  var ASG5_TEX_FSHADER =
  `precision mediump float;
  varying vec4 v_Color;
  varying vec3 v_Normal;
  varying vec3 v_Position;
  varying vec2 v_TexCoord;
  
  uniform vec3 u_AmbientColor;
  uniform vec3 u_DiffuseColor;
  uniform vec3 u_SpecularColor;
  uniform sampler2D u_Sampler;
  uniform vec3 u_LightPos;
  uniform vec3 u_EyePosition;

  void main() {
    vec4 textColor = texture2D(u_Sampler, v_TexCoord);

    vec3 ambient = u_AmbientColor * textColor.rgb;

    gl_FragColor = vec4(ambient, textColor.a);
  }`;