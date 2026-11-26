"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  buildBananaCluster,
  buildEggplantPlot,
  buildLeafyPlot,
  buildPaddyPlot,
  buildPalmTree,
  buildPickupTruck,
  buildTomatoPlot,
  configureRenderer,
  createStudioLighting,
  disposeScene,
} from "@/lib/farm3d";
import { IconTruck } from "./Icons";

export type FarmStop = {
  readonly n: number;
  readonly farmer: string;
  readonly kg: number;
  readonly loan: number;
  readonly freight: number;
};

type Props = {
  farms: readonly FarmStop[];
  selectedFarm: number;
  onSelectFarm: (n: number) => void;
  approved: boolean;
};

type FarmLayout = {
  x: number;
  z: number;
  w: number;
  d: number;
  side: -1 | 1; // -1 = north (negative z) of road, +1 = south (positive z)
};

const FARM_LAYOUT: Record<number, FarmLayout> = {
  1: { x: -5.5, z: -0.65, w: 2.1, d: 1.75, side: -1 },
  2: { x: -2.6, z: 2.85, w: 2.1, d: 1.75, side: 1 },
  3: { x: 0.3, z: -2.15, w: 2.2, d: 1.8, side: -1 },
  4: { x: 3.1, z: 1.6, w: 2.1, d: 1.75, side: 1 },
  5: { x: 5.9, z: -3.05, w: 2.2, d: 1.8, side: -1 },
};

type PinPos = { n: number; leftPct: number; topPct: number };

function buildRibbonGeometry(
  curve: THREE.CatmullRomCurve3,
  halfWidth: number,
  segments: number,
  y: number,
): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const pt = curve.getPointAt(t);
    const tan = curve.getTangentAt(t);
    const len = Math.hypot(tan.x, tan.z) || 1;
    const nx = -tan.z / len;
    const nz = tan.x / len;

    positions.push(pt.x + nx * halfWidth, y, pt.z + nz * halfWidth);
    positions.push(pt.x - nx * halfWidth, y, pt.z - nz * halfWidth);
    uvs.push(0, t, 1, t);

    if (i < segments) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function closestTOnCurve(curve: THREE.CatmullRomCurve3, targetX: number): number {
  let bestT = 0.5;
  let bestDist = Infinity;
  const samples = 1600;
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const pt = curve.getPointAt(t);
    const dist = Math.abs(pt.x - targetX);
    if (dist < bestDist) {
      bestDist = dist;
      bestT = t;
    }
  }
  return bestT;
}

export function PickupMap({ farms, selectedFarm, onSelectFarm, approved }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectedRef = useRef(selectedFarm);
  const approvedRef = useRef(approved);
  const onSelectRef = useRef(onSelectFarm);
  const lastLoadingRef = useRef<number | null>(null);

  const [webglFailed, setWebglFailed] = useState(false);
  const [loadingFarm, setLoadingFarm] = useState<number | null>(null);
  const [pinPositions, setPinPositions] = useState<PinPos[]>([
    { n: 1, leftPct: 20, topPct: 40 },
    { n: 2, leftPct: 36, topPct: 72 },
    { n: 3, leftPct: 52, topPct: 28 },
    { n: 4, leftPct: 68, topPct: 64 },
    { n: 5, leftPct: 83, topPct: 22 },
  ]);

  const renderOnceRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    selectedRef.current = selectedFarm;
    renderOnceRef.current?.();
  }, [selectedFarm]);

  useEffect(() => {
    approvedRef.current = approved;
    renderOnceRef.current?.();
  }, [approved]);

  useEffect(() => {
    onSelectRef.current = onSelectFarm;
  }, [onSelectFarm]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = Math.max(container.clientWidth, 300);
    const height = Math.max(container.clientHeight, 260);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = configureRenderer(canvas, width, height);
    } catch {
      queueMicrotask(() => setWebglFailed(true));
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x286f38);
    scene.fog = new THREE.Fog(0x286f38, 26, 48);
    createStudioLighting(scene, 13);

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    const updateCameraForAspect = (w: number, h: number) => {
      const aspect = w / h;
      camera.aspect = aspect;
      const scale = aspect < 1.65 ? Math.min(2.05, 1.8 / aspect) : 1;
      camera.position.set(0.15, 10.8 * scale, 8.9 * scale);
      camera.lookAt(0.15, 0.05, 0);
      camera.updateProjectionMatrix();
    };
    updateCameraForAspect(width, height);

    const root = new THREE.Group();
    scene.add(root);

    // Sculpted green valley terrain with smooth hillside framing clear of the main road corridor
    const terrainGeo = new THREE.PlaneGeometry(120, 70, 120, 70);
    terrainGeo.rotateX(-Math.PI / 2);
    const posAttr = terrainGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const roadZ = 0.8 - 0.135 * x;
      const dzRoad = Math.max(0, Math.abs(z - roadZ) - 5.2);
      const hill =
        dzRoad * dzRoad * 0.03 +
        Math.sin(x * 0.32) * Math.cos(z * 0.42) * 0.06;
      posAttr.setY(i, hill - 0.12);
    }
    terrainGeo.computeVertexNormals();
    const terrain = new THREE.Mesh(
      terrainGeo,
      new THREE.MeshStandardMaterial({ color: 0x3b8a42, roughness: 0.92 }),
    );
    terrain.receiveShadow = true;
    root.add(terrain);

    // Subtle adjacent field patches safely clear of the main road and the 5 farms
    const patchSpecs: [number, number, number, number, number][] = [
      [-8.4, -1.6, 2.2, 2.2, 0x327c3a],
      [-6.0, 3.3, 2.4, 1.5, 0x469848],
      [-2.7, -2.2, 2.1, 1.6, 0x35823d],
      [0.3, 2.6, 2.2, 1.6, 0x469848],
      [3.1, -2.5, 2.0, 1.5, 0x327c3a],
      [6.8, 1.8, 2.4, 2.0, 0x35823d],
    ];
    for (const [px, pz, pw, pd, pcol] of patchSpecs) {
      const patch = new THREE.Mesh(
        new THREE.BoxGeometry(pw, 0.04, pd),
        new THREE.MeshStandardMaterial({ color: pcol, roughness: 0.94 }),
      );
      patch.position.set(px, -0.04, pz);
      patch.receiveShadow = true;
      root.add(patch);
    }

    // Unified curved main farm-to-market road running seamlessly beyond both sides of the frame
    const mainRoadCurve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-45, 0, 6.1),
        new THREE.Vector3(-30, 0, 4.4),
        new THREE.Vector3(-15.5, 0, 2.7),
        new THREE.Vector3(-6.0, 0, 1.6),
        new THREE.Vector3(-2.5, 0, 0.7),
        new THREE.Vector3(0.5, 0, -0.1),
        new THREE.Vector3(3.5, 0, -0.6),
        new THREE.Vector3(7.0, 0, -1.2),
        new THREE.Vector3(16.5, 0, -2.5),
        new THREE.Vector3(30, 0, -4.35),
        new THREE.Vector3(45, 0, -6.4),
      ],
      false,
      "catmullrom",
      0.4,
    );

    const shoulderMesh = new THREE.Mesh(
      buildRibbonGeometry(mainRoadCurve, 0.72, 480, 0.005),
      new THREE.MeshStandardMaterial({ color: 0x9b7a52, roughness: 0.95 }),
    );
    shoulderMesh.receiveShadow = true;
    root.add(shoulderMesh);

    const roadSurfaceMesh = new THREE.Mesh(
      buildRibbonGeometry(mainRoadCurve, 0.52, 480, 0.02),
      new THREE.MeshStandardMaterial({ color: 0xded7c6, roughness: 0.85 }),
    );
    roadSurfaceMesh.receiveShadow = true;
    root.add(roadSurfaceMesh);

    const routeMat = new THREE.MeshStandardMaterial({
      color: 0xfffdf6,
      emissive: 0xf06a24,
      emissiveIntensity: 0.15,
      roughness: 0.35,
    });
    const centerLineMesh = new THREE.Mesh(
      buildRibbonGeometry(mainRoadCurve, 0.055, 480, 0.032),
      routeMat,
    );
    root.add(centerLineMesh);

    // Tropical trees framing the valley clear of road and farms
    const treeSpecs: [number, number, number, "palm" | "banana"][] = [
      [-8.2, 0.2, 0.95, "palm"],
      [-7.5, 3.6, 0.9, "banana"],
      [-3.2, -3.5, 1.0, "palm"],
      [-0.2, 3.8, 0.92, "banana"],
      [3.0, -3.7, 1.0, "palm"],
      [5.8, 2.9, 0.95, "palm"],
      [8.3, -2.8, 0.92, "banana"],
      [8.4, 0.6, 1.05, "palm"],
    ];
    for (const [tx, tz, ts, kind] of treeSpecs) {
      const tree = kind === "palm" ? buildPalmTree(ts) : buildBananaCluster(ts);
      tree.position.set(tx, -0.04, tz);
      root.add(tree);
    }

    // 5 interactive 3D farm plots fronting the main road with roadside loading pads
    const farmEntries: {
      n: number;
      stopT: number;
      group: THREE.Group;
      ringMat: THREE.MeshBasicMaterial;
      stopMat: THREE.MeshStandardMaterial;
      pin: THREE.Group;
      basePos: THREE.Vector3;
    }[] = [];

    const builders: Record<number, (w: number, d: number) => THREE.Group> = {
      1: (w, d) => buildTomatoPlot(w, d),
      2: (w, d) => buildEggplantPlot(w, d),
      3: (w, d) => buildTomatoPlot(w, d),
      4: (w, d) => buildLeafyPlot(w, d),
      5: (w, d) => buildPaddyPlot(w, d),
    };

    const padMat = new THREE.MeshStandardMaterial({ color: 0xa6855c, roughness: 0.94 });
    const crateMat = new THREE.MeshStandardMaterial({ color: 0xb5884e, roughness: 0.88 });
    const tomatoMat = new THREE.MeshStandardMaterial({ color: 0xe63926, roughness: 0.35 });

    for (const f of farms) {
      const c = FARM_LAYOUT[f.n];
      const stopT = closestTOnCurve(mainRoadCurve, c.x);
      const stopPoint = mainRoadCurve.getPointAt(stopT);

      const group = builders[f.n](c.w, c.d);
      group.position.set(c.x, 0.06, c.z);
      root.add(group);

      // Gravel loading pad connecting farm gate edge to main road shoulder
      const farmEdgeZ = c.z - c.side * (c.d / 2);
      const roadEdgeZ = stopPoint.z + c.side * 0.5;
      const padZ = (farmEdgeZ + roadEdgeZ) / 2;
      const padDepth = Math.max(0.35, Math.abs(farmEdgeZ - roadEdgeZ) + 0.14);

      const pad = new THREE.Mesh(
        new THREE.BoxGeometry(0.95, 0.03, padDepth),
        padMat,
      );
      pad.position.set(c.x, 0.015, padZ);
      pad.receiveShadow = true;
      pad.castShadow = true;
      root.add(pad);

      // Two harvest kaing crates staged beside the road on the loading bay
      const crateZ = roadEdgeZ + c.side * 0.24;
      for (const offset of [-0.2, 0.18]) {
        const basket = new THREE.Mesh(
          new THREE.CylinderGeometry(0.095, 0.075, 0.12, 8),
          crateMat,
        );
        basket.position.set(c.x + offset, 0.09, crateZ);
        basket.castShadow = true;
        basket.receiveShadow = true;
        root.add(basket);

        for (let k = 0; k < 3; k++) {
          const angle = (k / 3) * Math.PI * 2;
          const tomato = new THREE.Mesh(
            new THREE.SphereGeometry(0.032, 6, 6),
            tomatoMat,
          );
          tomato.position.set(
            c.x + offset + Math.cos(angle) * 0.03,
            0.155,
            crateZ + Math.sin(angle) * 0.03,
          );
          root.add(tomato);
        }
      }

      // Glowing roadside pickup stop marker along the road edge
      const stopMat = new THREE.MeshStandardMaterial({
        color: 0xf06a24,
        emissive: 0xf06a24,
        emissiveIntensity: 0.4,
        roughness: 0.4,
      });
      const stopMarker = new THREE.Mesh(
        new THREE.CylinderGeometry(0.16, 0.16, 0.025, 16),
        stopMat,
      );
      stopMarker.position.set(stopPoint.x, 0.036, stopPoint.z + c.side * 0.4);
      root.add(stopMarker);

      // Selection ring around farm plot
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xf06a24,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.25,
      });
      const ring = new THREE.Mesh(new THREE.RingGeometry(1.12, 1.26, 4), ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.rotation.z = Math.PI / 4;
      ring.position.set(c.x, 0.08, c.z);
      root.add(ring);

      // 3D floating marker pin above the farm
      const pin = new THREE.Group();
      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0xfffdf6, roughness: 0.35 }),
      );
      head.position.y = 0.25;
      const tip = new THREE.Mesh(
        new THREE.ConeGeometry(0.11, 0.26, 10),
        new THREE.MeshStandardMaterial({ color: 0x207a21, roughness: 0.45 }),
      );
      tip.rotation.x = Math.PI;
      tip.position.y = 0.08;
      pin.add(head, tip);
      pin.position.set(c.x, 0.72, c.z);
      root.add(pin);

      farmEntries.push({
        n: f.n,
        stopT,
        group,
        ringMat,
        stopMat,
        pin,
        basePos: new THREE.Vector3(c.x, 0.95, c.z),
      });
    }

    // 3D CooPERA pickup truck driving strictly on the main road
    const truck = buildPickupTruck(0.92);
    root.add(truck);

    const updateProjectedPins = () => {
      camera.updateMatrixWorld();
      const projected = farmEntries.map((entry) => {
        const v = entry.basePos.clone().project(camera);
        return {
          n: entry.n,
          leftPct: THREE.MathUtils.clamp(((v.x + 1) / 2) * 100, 8, 92),
          topPct: THREE.MathUtils.clamp(((1 - v.y) / 2) * 100, 18, 86),
        };
      });
      setPinPositions(projected);
    };

    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    const onCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(root.children, true);
      if (hits.length === 0) return;
      let obj: THREE.Object3D | null = hits[0].object;
      while (obj) {
        const match = farmEntries.find((f) => f.group === obj || f.pin === obj);
        if (match) {
          onSelectRef.current(match.n);
          return;
        }
        obj = obj.parent;
      }
    };
    canvas.addEventListener("click", onCanvasClick);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let inView = true;
    let tabVisible = !document.hidden;
    let rafId = 0;

    const roadLength = mainRoadCurve.getLength();
    const SPAWN_T = closestTOnCurve(mainRoadCurve, -21);
    const DESPAWN_T = closestTOnCurve(mainRoadCurve, 21);
    const STOP_SECONDS = 2.6;
    const CRUISE = 3.2;
    const SLOW_ZONE = 1.5;
    const stops = [...farmEntries].sort((a, b) => a.stopT - b.stopT);
    let truckT = SPAWN_T;
    let nextStopIdx = 0;
    let stopTimer = 0;
    let loadingN: number | null = null;
    const clock = new THREE.Clock();

    const applyState = (elapsed: number, dt: number) => {
      const activeN = selectedRef.current;
      const isApproved = approvedRef.current;

      if (reduceMotion) {
        const targetEntry = farmEntries.find((f) => f.n === activeN);
        truckT = targetEntry?.stopT ?? stops[0]?.stopT ?? 0.5;
        loadingN = null;
      } else if (stopTimer > 0) {
        stopTimer -= dt;
        if (stopTimer <= 0) {
          stopTimer = 0;
          loadingN = null;
          nextStopIdx++;
        }
      } else if (nextStopIdx < stops.length) {
        const target = stops[nextStopIdx].stopT;
        const distUnits = (target - truckT) * roadLength;
        const factor = THREE.MathUtils.clamp(distUnits / SLOW_ZONE, 0.18, 1);
        truckT += (CRUISE * factor * dt) / roadLength;
        if (truckT >= target) {
          truckT = target;
          stopTimer = STOP_SECONDS;
          loadingN = stops[nextStopIdx].n;
        }
      } else {
        truckT += (CRUISE * dt) / roadLength;
        if (truckT >= DESPAWN_T) {
          truckT = SPAWN_T;
          nextStopIdx = 0;
        }
      }

      if (loadingN !== lastLoadingRef.current) {
        lastLoadingRef.current = loadingN;
        setLoadingFarm(loadingN);
      }

      farmEntries.forEach((entry, idx) => {
        const isSel = entry.n === activeN;
        const targetY = isSel ? 0.2 : isApproved ? 0.1 : 0.06;
        entry.group.position.y += (targetY - entry.group.position.y) * 0.16;

        entry.pin.position.y =
          (isSel ? 0.92 : 0.72) +
          (reduceMotion ? 0 : Math.sin(elapsed * 3 + idx * 0.7) * (isSel ? 0.07 : 0.025));

        const targetHex = isSel ? 0xf06a24 : 0x4ade80;
        entry.ringMat.color.setHex(targetHex);
        const targetOp = isSel ? 0.9 : isApproved ? 0.55 : 0.18;
        entry.ringMat.opacity += (targetOp - entry.ringMat.opacity) * 0.16;

        if (entry.n === loadingN) {
          entry.stopMat.color.setHex(0xf06a24);
          entry.stopMat.emissive.setHex(0xf06a24);
          entry.stopMat.emissiveIntensity = 0.7 + 0.3 * Math.sin(elapsed * 6);
        } else {
          entry.stopMat.color.setHex(targetHex);
          entry.stopMat.emissive.setHex(targetHex);
          entry.stopMat.emissiveIntensity = isSel ? 0.85 : isApproved ? 0.55 : 0.2;
        }
      });

      routeMat.emissiveIntensity += ((isApproved ? 0.85 : 0.15) - routeMat.emissiveIntensity) * 0.12;

      const pos = mainRoadCurve.getPointAt(truckT);
      const ahead = mainRoadCurve.getPointAt(Math.min(truckT + 0.004, 0.999));
      truck.position.set(pos.x, 0.035, pos.z);
      truck.lookAt(ahead.x, 0.035, ahead.z);
    };

    const renderFrame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      applyState(clock.elapsedTime, dt);
      renderer.render(scene, camera);
    };

    renderOnceRef.current = () => {
      if (reduceMotion) {
        applyState(0, 0);
        renderer.render(scene, camera);
      }
    };

    const tick = () => {
      rafId = 0;
      if (!inView || !tabVisible || reduceMotion) return;
      renderFrame();
      rafId = requestAnimationFrame(tick);
    };

    const startOrRender = () => {
      if (reduceMotion) {
        renderOnceRef.current?.();
      } else if (inView && tabVisible && !rafId) {
        clock.getDelta();
        rafId = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (!inView && rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        } else {
          startOrRender();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(container);

    const onVis = () => {
      tabVisible = !document.hidden;
      if (!tabVisible && rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      } else {
        startOrRender();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(Math.round(entry.contentRect.width), 260);
        const h = Math.max(Math.round(entry.contentRect.height), 220);
        updateCameraForAspect(w, h);
        renderer.setSize(w, h, false);
        updateProjectedPins();
        if (reduceMotion) renderOnceRef.current?.();
      }
    });
    ro.observe(container);

    updateProjectedPins();
    startOrRender();

    return () => {
      renderOnceRef.current = null;
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("click", onCanvasClick);
      disposeScene(scene, renderer);
    };
  }, [farms]);

  return (
    <figure className="relative overflow-hidden rounded-[28px] border border-line bg-field-1">
      <div ref={containerRef} className="relative h-[320px] w-full sm:h-[380px] lg:h-[440px]">
        {webglFailed ? (
          <div className="flex h-full items-center justify-center bg-field-1 p-6 text-center text-card">
            <p className="max-w-[36ch]">
              Interactive 5-farm truck route: select a farm below to inspect payouts and dispatch.
            </p>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            aria-label="Interactive 3D cooperative farmland map with five roadside loading bays along a paved main road"
            className="block h-full w-full cursor-pointer"
          />
        )}

        {/* Top-left status pills */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-2 sm:left-5 sm:top-5">
          <span className="inline-flex items-center gap-2 rounded-xl bg-ink/90 px-3.5 py-2 text-sm font-semibold text-card shadow-sm backdrop-blur-sm">
            <IconTruck className="h-4 w-4 text-mint" />1 truck, 5 pickups
          </span>
          <span className="inline-flex items-center rounded-xl bg-card/95 px-3.5 py-2 text-sm font-bold text-ink shadow-sm backdrop-blur-sm">
            {loadingFarm
              ? `Loading at Farm ${loadingFarm} · ${farms.find((f) => f.n === loadingFarm)?.farmer}`
              : approved
                ? "Truck dispatched along main road"
                : "Truck en route on main road"}
          </span>
        </div>

        {/* Accessible 3D-projected farm markers */}
        {pinPositions.map((pin) => {
          const farm = farms.find((f) => f.n === pin.n);
          const isSelected = selectedFarm === pin.n;
          return (
            <button
              key={pin.n}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectFarm(pin.n)}
              style={{
                left: `${pin.leftPct}%`,
                top: `${pin.topPct}%`,
                transform: "translate(-50%, -50%)",
              }}
              className={`absolute inline-flex min-h-9 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.8rem] font-bold shadow-md transition-[background-color,border-color,transform] duration-150 active:scale-[0.97] sm:min-h-10 sm:px-3 ${
                isSelected
                  ? "z-20 border-ink bg-accent text-ink ring-2 ring-card"
                  : "z-10 border-white/30 bg-ink/90 text-card hover:bg-ink"
              }`}
            >
              <span
                className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[0.75rem] font-extrabold ${
                  isSelected ? "bg-ink text-card" : "bg-green text-white"
                }`}
              >
                {pin.n}
              </span>
              <span className="hidden sm:inline">{farm?.farmer ?? `Farm ${pin.n}`}</span>
            </button>
          );
        })}
      </div>
    </figure>
  );
}
