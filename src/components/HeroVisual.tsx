"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { HERO } from "@/content";
import {
  buildBananaCluster,
  buildCoopShed,
  buildEggplantPlot,
  buildLeafyPlot,
  buildPaddyPlot,
  buildPalmTree,
  buildPickupTruck,
  buildPlotSlab,
  buildSeedlingPlot,
  buildTomatoPlot,
  configureRenderer,
  createStudioLighting,
  disposeScene,
} from "@/lib/farm3d";
import { IconPin, serviceIcon } from "./Icons";

type StepKey = "forecast" | "truck" | "buyer" | "receipt";

const STEP_KEYS: StepKey[] = ["forecast", "truck", "buyer", "receipt"];

const ICON_MAP = {
  forecast: serviceIcon.forecast,
  truck: serviceIcon.truck,
  buyer: serviceIcon.buyer,
  receipt: serviceIcon.settle,
} as const;

const CHIP_POSITIONS = [
  "sm:right-[2%] sm:top-[4%]",
  "sm:left-[1%] sm:top-[35%]",
  "sm:right-[1%] sm:top-[60%]",
  "sm:left-[4%] sm:bottom-[4%]",
] as const;

function StepChipButton({
  stepKey,
  label,
  value,
  active,
  onSelect,
  className = "",
}: {
  stepKey: StepKey;
  label: string;
  value: string;
  active: boolean;
  onSelect: () => void;
  className?: string;
}) {
  const Icon = ICON_MAP[stepKey];
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={`group flex min-h-11 flex-col gap-2 rounded-none border p-2.5 text-left backdrop-blur-sm transition-[border-color,background-color,box-shadow,transform] duration-150 active:scale-[0.98] ${
        active
          ? "border-ink bg-white ring-1 ring-ink/40"
          : "border-line/90 bg-white/95 hover:border-ink/60"
      } ${className}`}
    >
      <span className="flex w-full items-center gap-2">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-none transition-colors ${
            active ? "bg-ink text-white" : "bg-paper text-green group-hover:bg-green/12"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="text-[0.92rem] font-bold leading-tight text-ink">{label}</span>
        <span
          className={`ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-none transition-colors ${
            active ? "bg-ink text-card" : "bg-green/15 text-green"
          }`}
        >
          <IconPin className="h-3 w-3" />
        </span>
      </span>
      <span
        className={`self-start rounded-none px-2.5 py-0.5 text-[0.84rem] font-bold leading-snug transition-colors ${
          active ? "bg-[#bef648] text-ink" : "bg-paper text-ink"
        }`}
      >
        {value}
      </span>
    </button>
  );
}

export function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeStep, setActiveStep] = useState<StepKey>("forecast");
  const activeStepRef = useRef<StepKey>("forecast");
  const [webglFailed, setWebglFailed] = useState(false);

  const renderOnceRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    activeStepRef.current = activeStep;
    renderOnceRef.current?.();
  }, [activeStep]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = Math.max(container.clientWidth, 280);
    const height = Math.max(container.clientHeight, 260);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = configureRenderer(canvas, width, height);
    } catch {
      queueMicrotask(() => setWebglFailed(true));
      return;
    }

    const scene = new THREE.Scene();
    createStudioLighting(scene, 7.5);

    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    const SCENE_RADIUS = 4.6; // half-diagonal of the 6.3 lane base (≈4.45) + palm height margin
    const LOOK_AT = new THREE.Vector3(0, 0.25, 0);
    const fitRadius = (aspect: number) => {
      const vHalf = THREE.MathUtils.degToRad(camera.fov / 2);
      const hHalf = Math.atan(Math.tan(vHalf) * aspect);
      return (SCENE_RADIUS / Math.sin(Math.min(vHalf, hHalf))) * 1.02;
    };
    const baseAzimuth = 0.78;
    const basePolar = 0.88;
    let radius = fitRadius(width / height);
    let targetAzimuth = baseAzimuth;
    let targetPolar = basePolar;
    let currentAzimuth = baseAzimuth;
    let currentPolar = basePolar;

    const updateCamera = () => {
      camera.position.set(
        radius * Math.sin(currentPolar) * Math.sin(currentAzimuth),
        radius * Math.cos(currentPolar),
        radius * Math.sin(currentPolar) * Math.cos(currentAzimuth),
      );
      camera.lookAt(LOOK_AT);
    };
    updateCamera();

    const root = new THREE.Group();
    scene.add(root);

    // Subtle dirt roadway grid underneath the 3x3 plots
    const laneBase = new THREE.Mesh(
      new THREE.BoxGeometry(6.3, 0.24, 6.3),
      new THREE.MeshStandardMaterial({ color: 0xa48056, roughness: 0.94 }),
    );
    laneBase.position.y = -0.17;
    laneBase.receiveShadow = true;
    root.add(laneBase);

    const STEP = 2.18;
    const harvestPlots: THREE.Group[] = [];
    const forecastRings: THREE.Mesh[] = [];
    const interactiveTargets: { obj: THREE.Object3D; step: StepKey }[] = [];

    const addForecastRing = (x: number, z: number) => {
      const ringGeo = new THREE.RingGeometry(0.95, 1.07, 4);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x4ade80,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.rotation.z = Math.PI / 4;
      ring.position.set(x, 0.03, z);
      root.add(ring);
      forecastRings.push(ring);
    };

    type PlotSpec = {
      col: number;
      row: number;
      harvest?: boolean;
      build: () => THREE.Group;
    };

    const specs: PlotSpec[] = [
      {
        col: -1,
        row: -1,
        build: () => {
          const g = buildSeedlingPlot(1.88, 1.88);
          const p1 = buildPalmTree(0.75);
          p1.position.set(-0.72, 0, -0.72);
          g.add(p1);
          return g;
        },
      },
      {
        col: 0,
        row: -1,
        harvest: true,
        build: () => buildTomatoPlot(1.88, 1.88),
      },
      {
        col: 1,
        row: -1,
        harvest: true,
        build: () => buildPaddyPlot(1.88, 1.88),
      },
      {
        col: -1,
        row: 0,
        harvest: true,
        build: () => {
          const g = buildLeafyPlot(1.88, 1.88);
          const b = buildBananaCluster(0.78);
          b.position.set(-0.68, 0, 0.64);
          g.add(b);
          return g;
        },
      },
      {
        col: 1,
        row: 0,
        harvest: true,
        build: () => {
          const g = buildTomatoPlot(1.88, 1.88);
          const p = buildPalmTree(0.72);
          p.position.set(0.72, 0, -0.7);
          g.add(p);
          return g;
        },
      },
      {
        col: -1,
        row: 1,
        harvest: true,
        build: () => buildEggplantPlot(1.88, 1.88),
      },
      {
        col: 0,
        row: 1,
        build: () => buildSeedlingPlot(1.88, 1.88),
      },
      {
        col: 1,
        row: 1,
        build: () => {
          const g = buildLeafyPlot(1.88, 1.88);
          const p = buildPalmTree(0.76);
          p.position.set(0.7, 0, 0.72);
          g.add(p);
          return g;
        },
      },
    ];

    for (const s of specs) {
      const plot = s.build();
      const px = s.col * STEP;
      const pz = s.row * STEP;
      plot.position.set(px, 0, pz);
      root.add(plot);
      if (s.harvest) {
        harvestPlots.push(plot);
        addForecastRing(px, pz);
        interactiveTargets.push({ obj: plot, step: "forecast" });
      }
    }

    // Central Cooperative Hub (0, 0)
    const hubGroup = new THREE.Group();
    hubGroup.add(buildPlotSlab(1.88, 1.88, 0x9c7b52));
    const shed = buildCoopShed();
    shed.position.set(0, 0, -0.14);
    hubGroup.add(shed);
    root.add(hubGroup);
    interactiveTargets.push({ obj: hubGroup, step: "buyer" });

    // Buyer spotlight beacon ring around hub crates
    const buyerRingMat = new THREE.MeshBasicMaterial({
      color: 0xf06a24,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });
    const buyerRing = new THREE.Mesh(
      new THREE.RingGeometry(0.95, 1.12, 4),
      buyerRingMat,
    );
    buyerRing.rotation.x = -Math.PI / 2;
    buyerRing.rotation.z = Math.PI / 4;
    buyerRing.position.set(0, 0.04, 0);
    root.add(buyerRing);

    // Truck loop path around the inner cooperative lane
    const loopPts = [
      new THREE.Vector3(-1.09, 0.04, 1.09),
      new THREE.Vector3(1.09, 0.04, 1.09),
      new THREE.Vector3(1.09, 0.04, -1.09),
      new THREE.Vector3(-1.09, 0.04, -1.09),
    ];
    const truckCurve = new THREE.CatmullRomCurve3(loopPts, true, "catmullrom", 0.25);
    const routeTubeMat = new THREE.MeshStandardMaterial({
      color: 0xf06a24,
      emissive: 0xf06a24,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.25,
      roughness: 0.4,
    });
    const routeTube = new THREE.Mesh(
      new THREE.TubeGeometry(truckCurve, 64, 0.035, 6, true),
      routeTubeMat,
    );
    root.add(routeTube);

    // Pickup truck driving on the inner lane
    const truck = buildPickupTruck(0.76);
    root.add(truck);
    interactiveTargets.push({ obj: truck, step: "truck" });

    // Receipt pulse rings emitted outward from hub
    const receiptRings: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; phase: number }[] = [];
    for (let r = 0; r < 2; r++) {
      const rm = new THREE.MeshBasicMaterial({
        color: 0x4ade80,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
      });
      const mesh = new THREE.Mesh(new THREE.RingGeometry(0.45, 0.56, 36), rm);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(0, 0.14, 0);
      root.add(mesh);
      receiptRings.push({ mesh, mat: rm, phase: r * 0.5 });
    }

    // Track pointer drag for smooth orbit rotation & click raycasting
    let dragging = false;
    let dragDist = 0;
    let lastX = 0;
    let lastY = 0;
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      dragDist = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      dragDist += Math.hypot(dx, dy);
      lastX = e.clientX;
      lastY = e.clientY;
      targetAzimuth -= dx * 0.0075;
      targetPolar = THREE.MathUtils.clamp(targetPolar - dy * 0.0055, 0.62, 1.06);
      renderOnceRef.current?.();
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (canvas.hasPointerCapture(e.pointerId)) {
        canvas.releasePointerCapture(e.pointerId);
      }

      if (dragDist < 6) {
        const rect = canvas.getBoundingClientRect();
        pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointerNdc, camera);
        const hits = raycaster.intersectObjects(root.children, true);
        if (hits.length > 0) {
          let hitObj: THREE.Object3D | null = hits[0].object;
          let matched: StepKey | null = null;
          while (hitObj && !matched) {
            const found = interactiveTargets.find((t) => t.obj === hitObj);
            if (found) matched = found.step;
            hitObj = hitObj.parent;
          }
          if (matched) {
            setActiveStep(matched);
          } else {
            setActiveStep((prev) => {
              const idx = STEP_KEYS.indexOf(prev);
              return STEP_KEYS[(idx + 1) % STEP_KEYS.length];
            });
          }
        }
      }
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let inView = true;
    let tabVisible = !document.hidden;
    let rafId = 0;
    let truckT = 0.08;
    const clock = new THREE.Clock();

    const applySceneState = (elapsed: number, dt: number) => {
      const step = activeStepRef.current;
      const isForecast = step === "forecast";
      const isTruck = step === "truck";
      const isBuyer = step === "buyer";
      const isReceipt = step === "receipt";

      // Smooth camera orbit damping
      if (!dragging) {
        targetAzimuth += (baseAzimuth + Math.sin(elapsed * 0.22) * 0.05 - targetAzimuth) * 0.008;
      }
      currentAzimuth += (targetAzimuth - currentAzimuth) * 0.12;
      currentPolar += (targetPolar - currentPolar) * 0.12;
      updateCamera();

      // Forecast: gently elevate and pulse the 5 harvest-ready farms
      harvestPlots.forEach((plot, idx) => {
        const targetY = isForecast
          ? 0.09 + Math.sin(elapsed * 2.8 + idx * 0.7) * 0.03
          : 0;
        plot.position.y += (targetY - plot.position.y) * 0.14;
      });
      forecastRings.forEach((ring, idx) => {
        const rMat = ring.material as THREE.MeshBasicMaterial;
        const targetOp = isForecast
          ? 0.55 + Math.sin(elapsed * 3.2 + idx * 0.8) * 0.35
          : 0.12;
        rMat.opacity += (targetOp - rMat.opacity) * 0.14;
      });

      // Truck: animate smoothly along loop when selected, park cleanly otherwise
      if (isTruck && !reduceMotion) {
        truckT = (truckT + dt * 0.13) % 1;
      } else if (!isTruck) {
        truckT = 0.08;
      }
      const pos = truckCurve.getPointAt(truckT);
      const ahead = truckCurve.getPointAt((truckT + 0.02) % 1);
      truck.position.copy(pos);
      truck.lookAt(ahead);
      routeTubeMat.opacity += ((isTruck ? 0.85 : 0.18) - routeTubeMat.opacity) * 0.14;

      // Buyer offer: spotlight hub & crates
      const buyerTargetOp = isBuyer ? 0.55 + Math.sin(elapsed * 3.5) * 0.3 : 0;
      buyerRingMat.opacity += (buyerTargetOp - buyerRingMat.opacity) * 0.14;
      const shedLift = isBuyer ? 0.06 + Math.sin(elapsed * 3.2) * 0.02 : 0;
      hubGroup.position.y += (shedLift - hubGroup.position.y) * 0.14;

      // Receipt: expanding pulse rings from cooperative hub
      receiptRings.forEach((r) => {
        if (!isReceipt) {
          r.mat.opacity += (0 - r.mat.opacity) * 0.16;
          return;
        }
        const cycle = reduceMotion ? 0.45 : (elapsed * 0.55 + r.phase) % 1;
        const s = 1 + cycle * 6.4;
        r.mesh.scale.set(s, s, 1);
        r.mesh.position.y = 0.12 + cycle * 0.22;
        r.mat.opacity = (1 - cycle) * 0.72;
      });
    };

    const renderFrame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      applySceneState(clock.elapsedTime, dt);
      renderer.render(scene, camera);
    };

    renderOnceRef.current = () => {
      if (reduceMotion) {
        currentAzimuth = targetAzimuth;
        currentPolar = targetPolar;
        applySceneState(1.2, 0);
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
        const w = Math.max(Math.round(entry.contentRect.width), 200);
        const h = Math.max(Math.round(entry.contentRect.height), 200);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        radius = fitRadius(w / h);
        updateCamera();
        renderer.setSize(w, h, false);
        if (reduceMotion) renderOnceRef.current?.();
      }
    });
    ro.observe(container);

    startOrRender();

    return () => {
      renderOnceRef.current = null;
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      disposeScene(scene, renderer);
    };
  }, []);

  return (
    <figure className="relative mx-auto w-full max-w-[600px]" aria-labelledby="hero-visual-caption">
      <div
        ref={containerRef}
        className="relative mx-auto h-[320px] w-full sm:h-[460px] lg:h-[520px]"
      >
        {/* Subtle concentric orbit rings & soft emerald blur behind the 3D scene */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className="orb-ambient absolute h-[74%] w-[74%] rounded-full opacity-70" />
          <span className="absolute aspect-square w-[68%] rounded-full border border-green/12" />
          <span className="absolute aspect-square w-[90%] rounded-full border border-dashed border-green/15" />
        </div>

        {webglFailed ? (
          <div className="relative z-10 flex h-full items-center justify-center rounded-none border border-line bg-paper p-6 text-center">
            <p className="max-w-[30ch] text-[1rem] text-muted">
              Nine-plot cooperative cluster: forecast harvests, pool one truck, match buyers, and text receipts.
            </p>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            aria-label="Interactive 3D cooperative farm diorama showing tomato trellises, rice paddies, eggplant beds, seedling nursery, packing shed, and pickup truck"
            className="relative z-10 block h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
          />
        )}

        {/* Interactive workflow step chips on tablet & desktop */}
        {HERO.chips.map((chip, i) => {
          const stepKey = STEP_KEYS[i];
          return (
            <StepChipButton
              key={chip.label}
              stepKey={stepKey}
              label={chip.label}
              value={chip.value}
              active={activeStep === stepKey}
              onSelect={() => setActiveStep(stepKey)}
              className={`z-20 hidden sm:flex sm:absolute sm:w-max sm:min-w-[184px] sm:max-w-[248px] ${CHIP_POSITIONS[i]}`}
            />
          );
        })}
      </div>

      {/* Compact 2x2 interactive step chips on mobile */}
      <div className="mt-3 grid grid-cols-2 gap-2.5 sm:hidden">
        {HERO.chips.map((chip, i) => {
          const stepKey = STEP_KEYS[i];
          return (
            <StepChipButton
              key={chip.label}
              stepKey={stepKey}
              label={chip.label}
              value={chip.value}
              active={activeStep === stepKey}
              onSelect={() => setActiveStep(stepKey)}
            />
          );
        })}
      </div>

      <figcaption
        id="hero-visual-caption"
        className="sr-only"
      >
        Interactive 3D · Drag to rotate · Click a step
      </figcaption>
    </figure>
  );
}
