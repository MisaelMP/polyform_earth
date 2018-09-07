// base on Sam Saccone code

(function() {
  let camera, drawStars, fillLight, mesh, renderer, scene;

  camera = mesh = scene = renderer = fillLight = void 0;

  drawStars = function() {
    let canvas, ctx, i, j, sizeRandom;
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);
    canvas.setAttribute('id', "stars");
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "#ffffff";
    for (let i = j = 0; j <= 2000; i = ++j) {
      ctx.beginPath();
      sizeRandom = Math.random() * 2;
      ctx.arc(Math.random() * window.innerWidth, Math.random() * window.innerHeight, sizeRandom, 0, 2 * Math.PI, 0);
      ctx.fill();
    }
    return document.body.appendChild(canvas);
  };

  window.onload = function() {
    let animate, base, baseMat, e, geometryBase, highTerran, highTerranMat, light, material, terran, terranGeom, terranHighGeom;
    drawStars();
    camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;
    scene = new THREE.Scene;
    geometryBase = new THREE.SphereGeometry(400, 50, 56);
    terranGeom = new THREE.SphereGeometry(398, 30, 30);
    terranHighGeom = new THREE.SphereGeometry(390, 20, 20);
    baseMat = new THREE.MeshPhongMaterial({
      color: 0x4893af,
      shading: THREE.FlatShading
    });
    material = new THREE.MeshPhongMaterial({
      color: 0xd2a157,
      shading: THREE.FlatShading
    });
    highTerranMat = new THREE.MeshPhongMaterial({
      color: 0xbdb997,
      shading: THREE.FlatShading
    });
    geometryBase.vertices.forEach(function(v) {
      return v[["x", "y", "z"][~~(Math.random() * 2)]] += Math.random() * 10;
    });
    [terranHighGeom.vertices, terranGeom.vertices].forEach(function(g) {
      return g.forEach(function(v) {
        return v[["x", "y", "z"][~~(Math.random() * 3)]] += Math.random() * 40;
      });
    });
    base = new THREE.Mesh(geometryBase, baseMat);
    terran = new THREE.Mesh(terranGeom, material);
    highTerran = new THREE.Mesh(terranHighGeom, highTerranMat);
    scene.add(base);
    base.add(terran);
    base.add(highTerran);
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(3, 3, 3);
    scene.add(light);
    fillLight = new THREE.AmbientLight(0x2e1527);
    scene.add(fillLight);
    try {
      renderer = new THREE.WebGLRenderer();
    } catch (error) {
      e = error;
      renderer = new THREE.CanvasRenderer();
      alert("come back in chrome or firefox! or enable webgl");
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    animate = function() {
      base.rotation.y += 0.00125;
      requestAnimationFrame(animate);
      return renderer.render(scene, camera);
    };
    return animate();

  };

}).call(this);
