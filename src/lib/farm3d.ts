import * as THREE from "three";

export function configureRenderer(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return renderer;
}

export function createStudioLighting(
  scene: THREE.Scene,
  shadowExtent = 8,
): void {
  const hemi = new THREE.HemisphereLight(0xfffdf6, 0x3b6e3c, 1.15);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xfff4d6, 1.85);
  key.position.set(7.5, 11.5, 6.5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 32;
  key.shadow.camera.left = -shadowExtent;
  key.shadow.camera.right = shadowExtent;
  key.shadow.camera.top = shadowExtent;
  key.shadow.camera.bottom = -shadowExtent;
  key.shadow.bias = -0.0005;
  key.shadow.normalBias = 0.02;
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xd8f0e2, 0.48);
  fill.position.set(-7, 6, -5.5);
  scene.add(fill);
}

function setShadow(
  obj: THREE.Object3D,
  cast = true,
  receive = true,
): void {
  obj.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = cast;
      child.receiveShadow = receive;
    }
  });
}

function mat(
  color: number,
  roughness = 0.82,
  metalness = 0.04,
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

/**
 * Layered soil + grass slab whose top surface sits cleanly at y = 0.
 */
export function buildPlotSlab(
  w = 2.0,
  d = 2.0,
  grassColor = 0x4ca64a,
): THREE.Group {
  const group = new THREE.Group();

  const grass = new THREE.Mesh(
    new THREE.BoxGeometry(w, 0.08, d),
    mat(grassColor, 0.86),
  );
  grass.position.y = -0.04;
  group.add(grass);

  const loam = new THREE.Mesh(
    new THREE.BoxGeometry(w * 0.992, 0.08, d * 0.992),
    mat(0x8c6343, 0.92),
  );
  loam.position.y = -0.12;
  group.add(loam);

  const soil = new THREE.Mesh(
    new THREE.BoxGeometry(w * 0.985, 0.18, d * 0.985),
    mat(0x6f4e37, 0.95),
  );
  soil.position.y = -0.25;
  group.add(soil);

  setShadow(group, true, true);
  return group;
}

export function buildTomatoPlot(w = 2.0, d = 2.0): THREE.Group {
  const group = new THREE.Group();
  group.add(buildPlotSlab(w, d, 0x4aa146));

  const bedMat = mat(0x5a3d28, 0.95);
  const stakeMat = mat(0xc9a265, 0.8);
  const leafMat = mat(0x2d8036, 0.78);
  const fruitMat = mat(0xe63926, 0.34, 0.05);

  const rows = [-0.54, 0, 0.54];
  const stakesX = [-0.66, 0, 0.66];

  for (const rz of rows) {
    const bed = new THREE.Mesh(
      new THREE.BoxGeometry(w * 0.78, 0.07, 0.32),
      bedMat,
    );
    bed.position.set(0, 0.035, rz);
    group.add(bed);

    const rail = new THREE.Mesh(
      new THREE.CylinderGeometry(0.016, 0.016, w * 0.72, 6),
      stakeMat,
    );
    rail.rotation.z = Math.PI / 2;
    rail.position.set(0, 0.44, rz);
    group.add(rail);

    for (const sx of stakesX) {
      const stake = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.022, 0.54, 6),
        stakeMat,
      );
      stake.position.set(sx, 0.27, rz);
      group.add(stake);
    }

    for (let k = -2; k <= 2; k++) {
      const x = k * 0.3;
      const bush = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.13, 0),
        leafMat,
      );
      bush.scale.set(1.05, 1.35, 0.95);
      bush.position.set(x, 0.24, rz);
      group.add(bush);

      const tomato1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.036, 8, 8),
        fruitMat,
      );
      tomato1.position.set(x + 0.05, 0.23, rz + 0.1);
      group.add(tomato1);

      const tomato2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.032, 8, 8),
        fruitMat,
      );
      tomato2.position.set(x - 0.05, 0.31, rz - 0.09);
      group.add(tomato2);
    }
  }

  setShadow(group, true, true);
  return group;
}

export function buildPaddyPlot(w = 2.0, d = 2.0): THREE.Group {
  const group = new THREE.Group();
  group.add(buildPlotSlab(w, d, 0x5eb24b));

  const bundMat = mat(0x7d6542, 0.92);
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x67c27c,
    roughness: 0.14,
    metalness: 0.12,
  });
  const riceMat = mat(0x7be04a, 0.72);

  // Outer raised bund borders
  const borderN = new THREE.Mesh(new THREE.BoxGeometry(w * 0.92, 0.09, 0.1), bundMat);
  borderN.position.set(0, 0.045, -d * 0.41);
  const borderS = borderN.clone();
  borderS.position.z = d * 0.41;
  const borderW = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.09, d * 0.92), bundMat);
  borderW.position.set(-w * 0.41, 0.045, 0);
  const borderE = borderW.clone();
  borderE.position.x = w * 0.41;
  const divider = new THREE.Mesh(new THREE.BoxGeometry(w * 0.84, 0.09, 0.08), bundMat);
  divider.position.set(0, 0.045, 0);
  group.add(borderN, borderS, borderW, borderE, divider);

  // Two sunlit flooded paddy basins
  for (const pz of [-d * 0.21, d * 0.21]) {
    const water = new THREE.Mesh(
      new THREE.BoxGeometry(w * 0.76, 0.03, d * 0.34),
      waterMat,
    );
    water.position.set(0, 0.02, pz);
    group.add(water);

    for (let ix = -3; ix <= 3; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const tuft = new THREE.Mesh(
          new THREE.ConeGeometry(0.032, 0.14, 5),
          riceMat,
        );
        tuft.position.set(ix * 0.21, 0.09, pz + iz * 0.17);
        group.add(tuft);
      }
    }
  }

  setShadow(group, true, true);
  return group;
}

export function buildEggplantPlot(w = 2.0, d = 2.0): THREE.Group {
  const group = new THREE.Group();
  group.add(buildPlotSlab(w, d, 0x429342));

  const bedMat = mat(0x573b27, 0.95);
  const leafMat = mat(0x2d7b38, 0.78);
  const fruitMat = new THREE.MeshStandardMaterial({
    color: 0x622b7a,
    roughness: 0.24,
    metalness: 0.08,
  });

  for (const rz of [-0.52, 0, 0.52]) {
    const bed = new THREE.Mesh(
      new THREE.BoxGeometry(w * 0.78, 0.075, 0.32),
      bedMat,
    );
    bed.position.set(0, 0.037, rz);
    group.add(bed);

    for (let k = -2; k <= 2; k++) {
      const x = k * 0.32;
      const crown = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.125, 0),
        leafMat,
      );
      crown.scale.set(1.1, 0.85, 1.05);
      crown.position.set(x, 0.18, rz);
      group.add(crown);

      const pod = new THREE.Mesh(
        new THREE.SphereGeometry(0.036, 8, 8),
        fruitMat,
      );
      pod.scale.set(0.75, 1.45, 0.75);
      pod.position.set(x + 0.04, 0.13, rz + 0.08);
      group.add(pod);
    }
  }

  setShadow(group, true, true);
  return group;
}

export function buildSeedlingPlot(w = 2.0, d = 2.0): THREE.Group {
  const group = new THREE.Group();
  group.add(buildPlotSlab(w, d, 0x63ad4c));

  const frameMat = mat(0xa27446, 0.82);
  const soilMat = mat(0x412c1d, 0.96);
  const sproutMat = mat(0x78cf46, 0.7);

  const offsets: [number, number][] = [
    [-0.44, -0.44],
    [0.44, -0.44],
    [-0.44, 0.44],
    [0.44, 0.44],
  ];

  for (const [ox, oz] of offsets) {
    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(0.72, 0.11, 0.72),
      frameMat,
    );
    frame.position.set(ox, 0.055, oz);
    group.add(frame);

    const dirt = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.02, 0.6),
      soilMat,
    );
    dirt.position.set(ox, 0.11, oz);
    group.add(dirt);

    for (let sx = -1; sx <= 1; sx++) {
      for (let sz = -1; sz <= 1; sz++) {
        const sprout = new THREE.Mesh(
          new THREE.DodecahedronGeometry(0.048, 0),
          sproutMat,
        );
        sprout.position.set(ox + sx * 0.17, 0.15, oz + sz * 0.17);
        group.add(sprout);
      }
    }
  }

  setShadow(group, true, true);
  return group;
}

export function buildLeafyPlot(w = 2.0, d = 2.0): THREE.Group {
  const group = new THREE.Group();
  group.add(buildPlotSlab(w, d, 0x4da249));

  const bedMat = mat(0x593d28, 0.94);
  const headMat = mat(0x6bd44c, 0.74);
  const outerMat = mat(0x3a8f3d, 0.8);

  for (const rz of [-0.46, 0.04, 0.54]) {
    const bed = new THREE.Mesh(
      new THREE.BoxGeometry(w * 0.76, 0.06, 0.3),
      bedMat,
    );
    bed.position.set(0, 0.03, rz);
    group.add(bed);

    for (let k = -2; k <= 2; k++) {
      const x = k * 0.3;
      const head = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.095, 0),
        k % 2 === 0 ? headMat : outerMat,
      );
      head.scale.set(1.05, 0.72, 1.05);
      head.position.set(x, 0.11, rz);
      group.add(head);
    }
  }

  setShadow(group, true, true);
  return group;
}

export function buildPalmTree(scale = 1): THREE.Group {
  const group = new THREE.Group();
  const trunkMat = mat(0x846040, 0.9);
  const frondMat = mat(0x3f9642, 0.75);

  const trunk1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.08, 0.55, 7),
    trunkMat,
  );
  trunk1.position.set(0, 0.27, 0);
  trunk1.rotation.z = 0.08;
  group.add(trunk1);

  const trunk2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.042, 0.056, 0.45, 7),
    trunkMat,
  );
  trunk2.position.set(-0.04, 0.72, 0);
  trunk2.rotation.z = 0.14;
  group.add(trunk2);

  const crown = new THREE.Group();
  crown.position.set(-0.07, 0.95, 0);
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const frond = new THREE.Mesh(
      new THREE.ConeGeometry(0.11, 0.56, 4),
      frondMat,
    );
    frond.scale.set(1.2, 1, 0.25);
    frond.rotation.order = "YXZ";
    frond.rotation.y = angle;
    frond.rotation.x = 1.15;
    frond.position.set(Math.sin(angle) * 0.24, -0.02, Math.cos(angle) * 0.24);
    crown.add(frond);
  }
  group.add(crown);

  group.scale.setScalar(scale);
  setShadow(group, true, true);
  return group;
}

export function buildBananaCluster(scale = 1): THREE.Group {
  const group = new THREE.Group();
  const stemMat = mat(0x528f3d, 0.84);
  const leafMat = mat(0x57b848, 0.72);

  const stems: [number, number, number][] = [
    [0, 0, 1],
    [-0.18, 0.12, 0.82],
    [0.16, -0.1, 0.74],
  ];
  for (const [sx, sz, h] of stems) {
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.032, 0.045, 0.36 * h, 6),
      stemMat,
    );
    stem.position.set(sx, 0.18 * h, sz);
    group.add(stem);

    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + sx * 3;
      const leaf = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.018, 0.36 * h),
        leafMat,
      );
      leaf.rotation.order = "YXZ";
      leaf.rotation.y = a;
      leaf.rotation.x = 0.45;
      leaf.position.set(
        sx + Math.sin(a) * 0.16 * h,
        0.34 * h,
        sz + Math.cos(a) * 0.16 * h,
      );
      group.add(leaf);
    }
  }

  group.scale.setScalar(scale);
  setShadow(group, true, true);
  return group;
}

export function buildCoopShed(): THREE.Group {
  const group = new THREE.Group();
  const woodDark = mat(0x6e492a, 0.88);
  const bambooMat = mat(0xd8b478, 0.82);
  const thatchMat = mat(0xc79854, 0.9);
  const basketMat = mat(0xb5884e, 0.88);
  const tomatoMat = mat(0xe63926, 0.35);
  const greenProduceMat = mat(0x47a343, 0.72);

  // Raised wooden deck
  const deck = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.12, 1.1), woodDark);
  deck.position.set(0, 0.06, 0);
  group.add(deck);

  // Bamboo cabin walls
  const walls = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.62, 0.86), bambooMat);
  walls.position.set(0, 0.43, -0.04);
  group.add(walls);

  // Four corner posts
  for (const px of [-0.58, 0.58]) {
    for (const pz of [-0.46, 0.42]) {
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.032, 0.034, 0.72, 6),
        woodDark,
      );
      post.position.set(px, 0.42, pz);
      group.add(post);
    }
  }

  // Pitched gabled thatch roof
  const roofLeft = new THREE.Mesh(
    new THREE.BoxGeometry(1.48, 0.07, 0.74),
    thatchMat,
  );
  roofLeft.position.set(0, 0.88, -0.28);
  roofLeft.rotation.x = -0.46;
  group.add(roofLeft);

  const roofRight = new THREE.Mesh(
    new THREE.BoxGeometry(1.48, 0.07, 0.74),
    thatchMat,
  );
  roofRight.position.set(0, 0.88, 0.24);
  roofRight.rotation.x = 0.46;
  group.add(roofRight);

  const ridge = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 1.5, 6),
    woodDark,
  );
  ridge.rotation.z = Math.PI / 2;
  ridge.position.set(0, 1.03, -0.02);
  group.add(ridge);

  // Woven kaing harvest crates out front
  const cratePositions: [number, number, boolean][] = [
    [-0.44, 0.68, true],
    [-0.14, 0.72, true],
    [0.18, 0.7, false],
  ];
  for (const [cx, cz, isTomato] of cratePositions) {
    const basket = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11, 0.08, 0.14, 9),
      basketMat,
    );
    basket.position.set(cx, 0.07, cz);
    group.add(basket);

    const produceMat = isTomato ? tomatoMat : greenProduceMat;
    for (let k = 0; k < 4; k++) {
      const a = (k / 4) * Math.PI * 2;
      const item = new THREE.Mesh(
        new THREE.SphereGeometry(0.038, 7, 7),
        produceMat,
      );
      item.position.set(
        cx + Math.cos(a) * 0.035,
        0.15,
        cz + Math.sin(a) * 0.035,
      );
      group.add(item);
    }
  }

  setShadow(group, true, true);
  return group;
}

/**
 * CooPERA pickup truck facing +Z so Object3D.lookAt() aligns naturally.
 */
export function buildPickupTruck(scale = 1): THREE.Group {
  const group = new THREE.Group();
  const bodyMat = mat(0xfffdf6, 0.42, 0.08);
  const accentMat = mat(0xf06a24, 0.45, 0.06);
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x24332a,
    roughness: 0.2,
    metalness: 0.3,
  });
  const tireMat = mat(0x1b201d, 0.9);
  const hubMat = mat(0xd8d2c2, 0.5, 0.25);
  const crateRed = mat(0xe63926, 0.55);
  const crateGreen = mat(0x4ba846, 0.65);

  // Chassis
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.08, 0.92), tireMat);
  chassis.position.set(0, 0.1, 0);
  group.add(chassis);

  // Orange lower body stripe
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.09, 0.9), accentMat);
  stripe.position.set(0, 0.17, 0);
  group.add(stripe);

  // Front cab (+Z)
  const hood = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.14, 0.34), bodyMat);
  hood.position.set(0, 0.27, 0.27);
  group.add(hood);

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.2, 0.26), bodyMat);
  cabin.position.set(0, 0.38, 0.14);
  group.add(cabin);

  const windshield = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.13, 0.04),
    glassMat,
  );
  windshield.position.set(0, 0.38, 0.27);
  windshield.rotation.x = -0.22;
  group.add(windshield);

  // Rear cargo bed (-Z)
  const bedFloor = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.05, 0.46), bodyMat);
  bedFloor.position.set(0, 0.21, -0.2);
  group.add(bedFloor);

  const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.14, 0.46), bodyMat);
  sideL.position.set(-0.21, 0.28, -0.2);
  const sideR = sideL.clone();
  sideR.position.x = 0.21;
  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.14, 0.04), accentMat);
  tail.position.set(0, 0.28, -0.43);
  group.add(sideL, sideR, tail);

  // Harvest crates in bed
  const c1 = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.13, 0.18), crateRed);
  c1.position.set(-0.09, 0.29, -0.15);
  const c2 = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.13, 0.18), crateGreen);
  c2.position.set(0.09, 0.29, -0.26);
  const c3 = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.13, 0.18), crateRed);
  c3.position.set(0.09, 0.29, -0.07);
  group.add(c1, c2, c3);

  // 4 wheels
  const wheelCoords: [number, number][] = [
    [-0.24, 0.26],
    [0.24, 0.26],
    [-0.24, -0.26],
    [0.24, -0.26],
  ];
  for (const [wx, wz] of wheelCoords) {
    const tire = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.09, 0.06, 12),
      tireMat,
    );
    tire.rotation.z = Math.PI / 2;
    tire.position.set(wx, 0.09, wz);
    group.add(tire);

    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.042, 0.042, 0.066, 10),
      hubMat,
    );
    hub.rotation.z = Math.PI / 2;
    hub.position.set(wx, 0.09, wz);
    group.add(hub);
  }

  group.scale.setScalar(scale);
  setShadow(group, true, true);
  return group;
}

export function disposeScene(
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
): void {
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) {
      mesh.geometry.dispose();
    }
    const material = mesh.material;
    if (Array.isArray(material)) {
      material.forEach((m) => m.dispose());
    } else if (material) {
      material.dispose();
    }
  });
  renderer.dispose();
}
