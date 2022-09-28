/* The basic interface that allows us to interact with the animation (options), as well as some
 aspects of the 3D animation, like the lighting, were designed by Nik Lever. I modified his original
 project draw my own shapes (in this case, the letters that constitute the word 'grudar' and the word
 itself).

 The original project can be accessed on CodePen here:
 https://codepen.io/collection/npWkgY
 Or in his GitHub repository:
 https://github.com/PacktPublishing/THREE.js-Tips-Tricks-Techniques/tree/master/ttt-1.2

 I had to modify some logic of the program as well so it could work properly, since I had to
 assemble different shapes together to form a word and in the original project each shape was
 displayed alone in the scene.
  */


var scene, camera, renderer, controls, material, mesh, lastOption;

init();

function init(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(0, 0, 150);

    const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set( 1, 10, 6);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    material = new THREE.MeshStandardMaterial();

    const options = {
        name: 'grudar',
        type: 'extrude'
    };
    const gui = new dat.GUI();
    gui.add(options, 'name', ['letterG','letterR','letterU','letterD','letterA', 'grudar']).onChange(value=>createMesh(value, options.type));
    gui.add(options, 'type', ['shape', 'extrude', 'points', 'lines']).onChange( value => createMesh(options.name, value ));

    lastOption = 'grudar';

    createMesh(options.name, options.type);

    window.addEventListener( 'resize', resize, false);

    update();
}

function createMesh(name, type){

    if(lastOption==="grudar"){
        for(let i = 7;i>1;i--){
            scene.remove(scene.children[i]);
        }
    }
    else {
        if (mesh !== undefined) scene.remove(mesh);
    }
    let shape = new THREE.Shape();
    const pos = new THREE.Vector3();
    let rot = 0;
    let g = new THREE.Shape();
    let firstR = new THREE.Shape();
    let u = new THREE.Shape();
    let d = new THREE.Shape();
    let a = new THREE.Shape();
    let lastR = new THREE.Shape();
    var gx = -200;
    var gy = 4;
    var frx = -135;
    var fry = -9;
    var ux = -67;
    var uy = -8;
    var dx = 30;
    var dy = 17;
    var ax = 160;
    var ay = -5;
    var lrx = 220;
    var lry = 0;

    switch(name){
        case 'letterG':
            shape.moveTo(30,-10);
            shape.quadraticCurveTo(18,-35,0,-20);
            shape.quadraticCurveTo(-26,10,0,40);
            shape.quadraticCurveTo(12,48,26,36);
            shape.quadraticCurveTo(42,10,30,-10);
            const hole_Path = new THREE.Path();
            hole_Path.moveTo(4, 35);
            hole_Path.quadraticCurveTo(-22,6,5,-18);
            hole_Path.quadraticCurveTo(15, -26, 27, -8);
            hole_Path.quadraticCurveTo(39, 19, 18, 36);
            hole_Path.quadraticCurveTo(8, 40, 4, 35);
            shape.holes.push( hole_Path );
            shape.moveTo(35,0);
            shape.quadraticCurveTo(32,-40,28,-60);
            shape.quadraticCurveTo(12,-80,-18,-58);
            shape.quadraticCurveTo(12,-76,26,-56);
            break;
        case 'letterR':
            shape.moveTo(-28,60);
            shape.lineTo(-26,-47);
            shape.quadraticCurveTo(-23, -50, -20, -47);
            shape.lineTo(-20,32);
            shape.quadraticCurveTo(0,60,28,43);
            shape.quadraticCurveTo(34, 48, 28, 51);
            shape.quadraticCurveTo(0,63,-20,40);
            shape.lineTo(-22,60);
            shape.quadraticCurveTo(-24,63,-28,60);

            break;

        case 'letterU':
            shape.moveTo(-28,60);
            shape.quadraticCurveTo(-45,-30, -6,-48);
            shape.quadraticCurveTo(25, -60, 36, -20);
            shape.quadraticCurveTo(45,-60, 50,-48);
            shape.lineTo(38,-4);
            shape.quadraticCurveTo(40,20,28,60);
            shape.quadraticCurveTo(25,63,22,60);
            shape.quadraticCurveTo(36,-10,20,-32);
            shape.quadraticCurveTo(8,-56, -12,-32)
            shape.quadraticCurveTo(-26,-18, -22,60);
            shape.quadraticCurveTo(-25,63,-28,60);


            break;

        case 'letterD':
            shape.moveTo(36,10);
            shape.quadraticCurveTo(7,36,-18,18);
            shape.quadraticCurveTo(-42,-14, -20,-50);
            shape.quadraticCurveTo(10,-70,36,-42);
            shape.lineTo(38,-58);
            shape.quadraticCurveTo(41,-61, 44,-58);
            shape.lineTo(44,68);
            shape.quadraticCurveTo(41,71,38,68);
            const hole = new THREE.Path();
            hole.moveTo(36,0);
            hole.quadraticCurveTo(7,30,-15,11);
            hole.quadraticCurveTo(-36,-18,-14,-44);
            hole.quadraticCurveTo(10,-62, 36,-34);
            shape.holes.push(hole);

            break;

        case 'letterA':
            shape.moveTo(-22,48);
            shape.quadraticCurveTo(-68,-30, -6,-48);
            shape.quadraticCurveTo(25, -54, 36, -20);
            shape.quadraticCurveTo(45,-60, 50,-48);
            shape.lineTo(38,-4);
            shape.quadraticCurveTo(40,20,28,48);
            shape.quadraticCurveTo(6,76,-22,48);
            const holeA = new THREE.Path();
            holeA.moveTo(-18,42);
            holeA.quadraticCurveTo(-62,-30,0,-44);
            holeA.quadraticCurveTo(28,-44,29,-16);
            holeA.quadraticCurveTo(34,16,20,48);
            holeA.quadraticCurveTo(2, 62,-18,42);
            shape.holes.push(holeA);
            break;

        case 'grudar':
            g.moveTo(gx + 30,gy - 10);
            g.quadraticCurveTo(gx + 18,gy - 35, gx,gy - 20);
            g.quadraticCurveTo(gx - 26,gy + 10, gx,gy + 40);
            g.quadraticCurveTo(gx + 12,gy + 48,gx + 26,gy +36);
            g.quadraticCurveTo(gx + 42,gy + 10,gx + 30,gy -10);
            const hole_g = new THREE.Path();
            hole_g.moveTo(gx + 4, gy + 35);
            hole_g.quadraticCurveTo(gx - 22,gy + 6,gx + 5,gy - 18);
            hole_g.quadraticCurveTo(gx + 15,gy - 26,gx + 27,gy - 8);
            hole_g.quadraticCurveTo(gx + 39,gy + 19, gx + 18,gy + 36);
            hole_g.quadraticCurveTo(gx + 8, gy + 40, gx + 4, gy + 35);
            g.holes.push( hole_g);
            g.moveTo(gx + 35, gy);
            g.quadraticCurveTo(gx + 32,gy - 40,gx + 28,gy - 60);
            g.quadraticCurveTo(gx + 12,gy - 80,gx - 18,gy - 58);
            g.quadraticCurveTo(gx + 12,gy - 76,gx + 26,gy - 56);

            firstR.moveTo(frx-28,fry+60);
            firstR.lineTo(frx-26,fry-47);
            firstR.quadraticCurveTo(frx-23, fry-50, frx-20, fry-47);
            firstR.lineTo(frx-20,fry+32);
            firstR.quadraticCurveTo(frx,fry+60,frx+28,fry+43);
            firstR.quadraticCurveTo(frx+34,fry+48,frx+28,fry+51);
            firstR.quadraticCurveTo(frx,fry+63,frx-20,fry+40);
            firstR.lineTo(frx-22,fry+60);
            firstR.quadraticCurveTo(frx-24,fry+63,frx-28,fry+60);

            u.moveTo(ux-28,uy+60);
            u.quadraticCurveTo(ux-45,uy-30, ux-6,uy-48);
            u.quadraticCurveTo(ux+25, uy-60, ux+36, uy-20);
            u.quadraticCurveTo(ux+45,uy-60, ux+50,uy-48);
            u.lineTo(ux+38,uy-4);
            u.quadraticCurveTo(ux+40,uy+20,ux+28,uy+60);
            u.quadraticCurveTo(ux+25,uy+63,ux+22,uy+60);
            u.quadraticCurveTo(ux+36,uy-10,ux+20,uy-32);
            u.quadraticCurveTo(ux+8,uy-56, ux-12,uy-32)
            u.quadraticCurveTo(ux-26,uy-18, ux-22,uy+60);
            u.quadraticCurveTo(ux-25,uy+63,ux-28,uy+60);


            d.moveTo(dx+36,dy+10);
            d.quadraticCurveTo(dx+7,dy+36,dx-18,dy+18);
            d.quadraticCurveTo(dx-42,dy-14,dx-20,dy-50);
            d.quadraticCurveTo(dx+10,dy-70,dx+36,dy-42);
            d.lineTo(dx+38,dy-58);
            d.quadraticCurveTo(dx+41,dy-61, dx+44,dy-58);
            d.lineTo(dx+44,dy+68);
            d.quadraticCurveTo(dx+41,dy+71,dx+38,dy+68);
            const hole_d = new THREE.Path();
            hole_d.moveTo(dx+36,dy);
            hole_d.quadraticCurveTo(dx+7,dy+30,dx-15,dy+11);
            hole_d.quadraticCurveTo(dx-36,dy-18,dx-14,dy-44);
            hole_d.quadraticCurveTo(dx+10,dy-62, dx+36,dy-34);
            d.holes.push(hole_d);

            a.moveTo(ax-22,ay+48);
            a.quadraticCurveTo(ax-68,ay-30, ax-6,ay-48);
            a.quadraticCurveTo(ax+25, ay-54, ax+36, ay-20);
            a.quadraticCurveTo(ax+45,ay-60, ax+50,ay-48);
            a.lineTo(ax+38,ay-4);
            a.quadraticCurveTo(ax+40,ay+20,ax+28,ay+48);
            a.quadraticCurveTo(ax+6,ay+76,ax-22,ay+48);
            const hole_A = new THREE.Path();
            hole_A.moveTo(ax-18,ay+42);
            hole_A.quadraticCurveTo(ax-62,ay-30, ax,ay-44);
            hole_A.quadraticCurveTo(ax+28,ay-44,ax+29,ay-16);
            hole_A.quadraticCurveTo(ax+34,ay+16,ax+20,ay+48);
            hole_A.quadraticCurveTo(ax+2, ay+62,ax-18,ay+42);
            a.holes.push(hole_A);

            lastR.moveTo(lrx-28,lry+60);
            lastR.lineTo(lrx-26,lry-47);
            lastR.quadraticCurveTo(lrx-23, lry-50, lrx-20, lry-47);
            lastR.lineTo(lrx-20,lry+32);
            lastR.quadraticCurveTo(lrx,lry+60,lrx+28,lry+43);
            lastR.quadraticCurveTo(lrx+34,lry+48,lrx+28,lry+51);
            lastR.quadraticCurveTo(lrx,lry+63,lrx-20,lry+40);
            lastR.lineTo(lrx-22,lry+60);
            lastR.quadraticCurveTo(lrx-24,lry+63,lrx-28,lry+60);

            break;

    }

    const extrudeSettings = {
        depth: 8,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 1,
        bevelThickness: 1
    };

    let geometry;
    material.side = THREE.FrontSide;

    switch(type){
        case 'extrude':
            if(name==='grudar'){
                //adding g to the scene
                geometry = new THREE.ExtrudeBufferGeometry(g, extrudeSettings);
                mesh = new THREE.Mesh(geometry, material);
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.5,0.5,0.5);
                scene.add(mesh);
                //adding first r to the scene
                geometry = new THREE.ExtrudeBufferGeometry(firstR, extrudeSettings);
                mesh = new THREE.Mesh(geometry, material);
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.45,0.45,0.45);
                scene.add(mesh);
                //adding u to the scene
                geometry = new THREE.ExtrudeBufferGeometry(u, extrudeSettings);
                mesh = new THREE.Mesh(geometry, material);
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.40,0.40,0.40);
                scene.add(mesh);
                //adding d to the scene
                geometry = new THREE.ExtrudeBufferGeometry(d, extrudeSettings);
                mesh = new THREE.Mesh(geometry, material);
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.49,0.49,0.49);
                scene.add(mesh);
                //adding a to the scene
                geometry = new THREE.ExtrudeBufferGeometry(a, extrudeSettings);
                mesh = new THREE.Mesh(geometry, material);
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.37,0.37,0.37);
                scene.add(mesh);
                //adding last r to the scene
                geometry = new THREE.ExtrudeBufferGeometry(lastR, extrudeSettings);
                mesh = new THREE.Mesh(geometry, material);
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.45,0.45,0.45);
                scene.add(mesh);
            }
            else {
                geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
                mesh = new THREE.Mesh(geometry, material);
            }
            break;
        case 'shape':
            if(name==='grudar'){
                //ŋ
                geometry = new THREE.ShapeBufferGeometry(g);
                material.side = THREE.DoubleSide;
                mesh = new THREE.Mesh(geometry, material);
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.5,0.5,0.5);
                scene.add(mesh);
                //r
                geometry = new THREE.ShapeBufferGeometry(firstR);
                material.side = THREE.DoubleSide;
                mesh = new THREE.Mesh(geometry, material);
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.45,0.45,0.45);
                scene.add(mesh);
                //u
                geometry = new THREE.ShapeBufferGeometry(u);
                material.side = THREE.DoubleSide;
                mesh = new THREE.Mesh(geometry, material);
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.40,0.40,0.40);
                scene.add(mesh);
                //d
                geometry = new THREE.ShapeBufferGeometry(d);
                material.side = THREE.DoubleSide;
                mesh = new THREE.Mesh(geometry, material);
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.45,0.45,0.45);
                scene.add(mesh);
                //a
                geometry = new THREE.ShapeBufferGeometry(a);
                material.side = THREE.DoubleSide;
                mesh = new THREE.Mesh(geometry, material);
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.37,0.37,0.37);
                scene.add(mesh);
                //r
                geometry = new THREE.ShapeBufferGeometry(lastR);
                material.side = THREE.DoubleSide;
                mesh = new THREE.Mesh(geometry, material);
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.45,0.45,0.45);
                scene.add(mesh);

            }
            else {
                geometry = new THREE.ShapeBufferGeometry(shape);
                material.side = THREE.DoubleSide;
                mesh = new THREE.Mesh(geometry, material);
            }
            break;
        case 'lines':
            if(name==='grudar'){
                //g
                geometry = new THREE.BufferGeometry().setFromPoints(g.getPoints());
                mesh = new THREE.Line(geometry, new THREE.LineBasicMaterial());
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.5,0.5,0.5);
                scene.add(mesh);
                //r
                geometry = new THREE.BufferGeometry().setFromPoints(firstR.getPoints());
                mesh = new THREE.Line(geometry, new THREE.LineBasicMaterial());
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.45,0.45,0.45);
                scene.add(mesh);
                //u
                geometry = new THREE.BufferGeometry().setFromPoints(u.getPoints());
                mesh = new THREE.Line(geometry, new THREE.LineBasicMaterial());
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.4,0.4,0.4);
                scene.add(mesh);
                //d
                geometry = new THREE.BufferGeometry().setFromPoints(d.getPoints());
                mesh = new THREE.Line(geometry, new THREE.LineBasicMaterial());
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.45,0.45,0.45);
                scene.add(mesh);
                //a
                geometry = new THREE.BufferGeometry().setFromPoints(a.getPoints());
                mesh = new THREE.Line(geometry, new THREE.LineBasicMaterial());
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.37,0.37,0.37);
                scene.add(mesh);
                //r
                geometry = new THREE.BufferGeometry().setFromPoints(lastR.getPoints());
                mesh = new THREE.Line(geometry, new THREE.LineBasicMaterial());
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.45,0.45,0.45);
                scene.add(mesh);
            }
            else {
                geometry = new THREE.BufferGeometry().setFromPoints(shape.getPoints());
                mesh = new THREE.Line(geometry, new THREE.LineBasicMaterial());
            }
            break;
        case 'points':
            if(name==='grudar'){
                //g
                geometry = new THREE.BufferGeometry().setFromPoints(g.getPoints());
                mesh = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xFFFFFF, size: 2}));
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.5,0.5,0.5);
                scene.add(mesh);
                //r
                geometry = new THREE.BufferGeometry().setFromPoints(firstR.getPoints());
                mesh = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xFFFFFF, size: 2}));
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.45,0.45,0.45);
                scene.add(mesh);
                //u
                geometry = new THREE.BufferGeometry().setFromPoints(u.getPoints());
                mesh = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xFFFFFF, size: 2}));
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.4,0.4,0.4);
                scene.add(mesh);
                //d
                geometry = new THREE.BufferGeometry().setFromPoints(d.getPoints());
                mesh = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xFFFFFF, size: 2}));
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.45,0.45,0.45);
                scene.add(mesh);
                //a
                geometry = new THREE.BufferGeometry().setFromPoints(a.getPoints());
                mesh = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xFFFFFF, size: 2}));
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.37,0.37,0.37);
                scene.add(mesh);
                //r
                geometry = new THREE.BufferGeometry().setFromPoints(lastR.getPoints());
                mesh = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xFFFFFF, size: 2}));
                mesh.position.copy(pos);
                mesh.rotation.z = rot;
                mesh.scale.set(0.45,0.45,0.45);
                scene.add(mesh);
            }
            else {
                geometry = new THREE.BufferGeometry().setFromPoints(shape.getPoints());
                mesh = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xFFFFFF, size: 2}));
                break;
            }
    }

  if(name!=='grudar') {
      mesh.position.copy(pos);
      mesh.rotation.z = rot;
      scene.add(mesh);
  }

lastOption = name;
}

function update(){
    requestAnimationFrame( update );
    renderer.render( scene, camera );
}

function resize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}