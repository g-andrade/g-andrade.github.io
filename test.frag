// vim: set noet ts=4 sw=4: -*- mode: glsl; indent-tabs-mode: t; tab-width: 4 -*-
#ifdef GL_ES
precision mediump float;
#endif

//#extension GL_OES_standard_derivatives : enable

#define PI 3.14159265359
#define X_THING 0.002
#define Y_THING 0.3
#define square(x) ((x) * (x))

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

vec2 current_position() {
	vec2 ratios;
	if (resolution.x > resolution.y) {
		ratios.x = resolution.x / resolution.y;
		ratios.y = 1.0;
	}
	else {
		ratios.y = resolution.y / resolution.x;
		ratios.x = 1.0;
	}
	
	vec2 position = ( (gl_FragCoord.xy - (resolution.xy/2.0)) / (resolution.xy) );
	position.x *= ratios.x;
	position.y *= ratios.y;

	return position;
}

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

float magnitude(vec2 v) {
	return sqrt(square(v.x) + square(v.y));
}

vec3 draw2(vec2 position, float target_x, float target_y) {
	float dist = distance(position, vec2(target_x, target_y));

	float r = pow(dist, 30.0);
	float g = 0.0;
	float b = 0.0;

	if (r < 0.1) {
		float f = 0.5;
		float m = 0.8 + (0.1 * sin(f * time * PI));
		r = m * rand(time * position * 0.5);
		g = 0.5 * m * rand(time * position);
	}

	return vec3(r, g, b);
}

void main( void ) {
	vec2 position = current_position();

    vec3 color = vec3(0.0, 0.0, 0.0);
	color += draw2(position, 0.5, 0.5);

    gl_FragColor = vec4(color, 0.0);
}
