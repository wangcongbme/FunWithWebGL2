import gl 			from "../gl.js";
import Vao 			from "../Vao.js";
import Renderable	from "../rendering/Renderable.js";

function Cone(mat, cnt = 3, radius=1, height = 1, isUp = true){
	var data	= Cone.vertData(cnt, radius, height, isUp),
		vao		= Vao.standardRenderable("Cone", 3, data.vertices, null, data.uv, data.index),
		model 	= new Renderable("Cone", vao, mat);

	//model.drawMode	= gl.ctx.TRIANGLES;
	return model;
}

Cone.vertData = function(cnt = 3, radius=1, height = 1, isUp = true){
	var vertices	= [ 0, 0, 0 ],
		uv			= [ 0.5, 1, 0.5, 1 ],
		index		= [],
		PI2			= Math.PI * 2,
		PIH			= Math.PI * 0.5,
		a, b, d, ia, ib;

	if(isUp){	vertices.push(0, height, 0); PIH *= -1; } // Point Upward
	else		vertices.push(0, 0, height); // Point Forward

	for(var i=0; i <= cnt; i++){
		d = (i % cnt) / cnt * PI2 + PIH;
		a = radius * Math.cos( d );
		b = radius * Math.sin( d );

		if(isUp)	vertices.push(a, 0 , b);
		else 		vertices.push(a, b , 0);

		uv.push(i / cnt, 0);
	
		if(i < cnt){
			ia = i + 2;
			ib = (i+1) % (cnt+1) + 2;
			if(isUp)	index.push( ib, ia, 1,  ia, ib, 0 );
			else		index.push( ia, ib, 1,  ib, ia, 0 );
		}
	}

	return { vertices, index, uv };
}

export default Cone;