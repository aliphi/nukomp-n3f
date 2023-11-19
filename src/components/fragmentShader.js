const fragmentShader = `
uniform float u_intensity;
uniform float u_time;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vDisplacement;

void main() {
  float distort = 2.0 * vDisplacement * u_intensity;

  vec3 color = vec3(abs(vUv - 0.5) * 2.0  * (1.0 - distort), 1.0);

  vec3 texture = texture2D(uTexture, vUv + distort).rgb;

  
  gl_FragColor = vec4(texture ,1.0);
}


`

export default fragmentShader
