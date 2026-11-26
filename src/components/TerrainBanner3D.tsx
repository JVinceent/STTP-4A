"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { configureRenderer, disposeScene } from "@/lib/farm3d";

export function TerrainBanner3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 180);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = configureRenderer(canvas, width, height);
    } catch {
      queueMicrotask(() => setWebglFailed(true));
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x18522b);
    scene.fog = new THREE.Fog(0x18522b, 14, 28);

    const hemi = new THREE.HemisphereLight(0xfff6d6, 0x0f301a, 1.2);
    scene.add(hemi);

    const sun = new THREE.DirectionalLight(0xffe9b8, 2.0);
    sun.position.set(-8, 9, 5);
    scene.add(sun);

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 60);
    camera.position.set(0, 5.2, 11.2);
    camera.lookAt(0, 0.4, -1.5);

    // Sculpted low-poly contoured highland terrace mesh
    const geo = new THREE.PlaneGeometry(26, 11, 46, 20);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    const colors: number[] = [];
    const palette = [
      new THREE.Color(0x1c6131),
      new THREE.Color(0x2f8a45),
      new THREE.Color(0x4ba84d),
      new THREE.Color(0x69bc5b),
    ];

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const ridge =
        Math.sin(x * 0.34 + 0.5) * 0.72 +
        Math.cos(z * 0.65 - x * 0.14) * 0.52 +
        Math.max(0, -z) * 0.28;
      // Quantize softly for stepped hillside terrace contour feel
      const terraced = Math.round(ridge * 3.5) / 3.5;
      pos.setY(i, terraced);

      const band = Math.abs(Math.floor((terraced + 2) * 2)) % palette.length;
      const c = palette[band];
      colors.push(c.r, c.g, c.b);
    }

    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    const terrain = new THREE.Mesh(
      geo,
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        flatShading: true,
        roughness: 0.88,
        metalness: 0.04,
      }),
    );
    scene.add(terrain);

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.8;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.35;
    };
    container.addEventListener("pointermove", onPointerMove);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let inView = true;
    let tabVisible = !document.hidden;
    let rafId = 0;

    const renderFrame = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      camera.position.x = curX;
      camera.position.y = 5.2 - curY;
      camera.lookAt(0, 0.4, -1.5);
      renderer.render(scene, camera);
    };

    const tick = () => {
      rafId = 0;
      if (!inView || !tabVisible || reduceMotion) return;
      renderFrame();
      rafId = requestAnimationFrame(tick);
    };

    const startOrRender = () => {
      if (reduceMotion) {
        renderFrame();
      } else if (inView && tabVisible && !rafId) {
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
        const w = Math.max(Math.round(entry.contentRect.width), 280);
        const h = Math.max(Math.round(entry.contentRect.height), 160);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        if (reduceMotion) renderFrame();
      }
    });
    ro.observe(container);

    startOrRender();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      container.removeEventListener("pointermove", onPointerMove);
      disposeScene(scene, renderer);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 bg-[#18522b]">
      {webglFailed ? (
        <div className="h-full w-full bg-gradient-to-br from-[#2f8a45] via-[#1f6b35] to-[#0f381b]" />
      ) : (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="block h-full w-full"
        />
      )}
    </div>
  );
}
