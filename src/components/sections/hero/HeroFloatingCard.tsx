import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import BlurReveal from "@/components/kit/BlurReveal";
import DotArrowButton from "@/components/kit/DotArrowButton";
import { introSignal } from "@/components/kit/introSignal";
import { sideOf, useCoverNext } from "@/components/kit/sectionNeighbour";
import { HALO_SHAPES, type HaloBuilt, type HaloShapeDef } from "@/components/kit/haloShapes";

type HeroFloatingCardProps = {
  shape?: string;
  shapeDef?: HaloShapeDef;
  title?: string;
  titleMuted?: string;
  description?: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  className?: string;
};

const NOISE = `
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0., a = .5; for (int i = 0; i < 5; i++){ v += a*noise(p); p *= 2.03; a *= .5; } return v; }`;

const SIM = 320;
const AREA = { x: -13, z: -16, size: 26 };
const ease = (i: number) => i * 0.09 + 0.25;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HeroFloatingCard({
  shape = "twist",
  shapeDef,
  title = "All you need, nothing you don't",
  titleMuted,
  description = "One calm place to start, grow and stay.",
  primaryButton = { text: "Get Your CAC Certificate", href: "#pricing" },
  secondaryButton = { text: "How it works", href: "#" },
  className,
}: HeroFloatingCardProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();
  const def = shapeDef ?? HALO_SHAPES[shape] ?? HALO_SHAPES.twist;
  const pick = useRef(def);
  const swap = useRef<(next: HaloShapeDef) => void>(undefined);
  const wake = useRef<() => void>(undefined);
  const cover = useRef(0);
  useCoverNext(sectionRef);
  const { scrollYProgress: held } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const haze = useTransform(held, [0, 0.45, 0.9], [0, 0.55, 0.2]);
  const shade = useTransform(held, [0.25, 1], [0, 1]);
  const gone = useTransform(held, (p) => (p >= 1 ? "hidden" : "visible"));
  const sink = useTransform(held, [0, 1], [1, 0.92]);
  const sinkRound = useTransform(held, [0, 0.4], [0, 28]);
  const copyOpacity = useTransform(held, [0, 0.3], [1, 0]);
  const copyY = useTransform(held, [0, 0.3], [0, -60]);

  useEffect(() => introSignal.onReveal(() => setReady(true)), []);

  useEffect(() => {
    pick.current = def;
    swap.current?.(def);
  }, [def]);

  useEffect(() => {
    const section = sectionRef.current;
    const after = section ? sideOf(section, "next") : null;
    after?.style.setProperty("min-height", "100svh");
    section?.closest("main")?.toggleAttribute("data-night-top", (1 - held.get()) * innerHeight > 36);
    return () => {
      const next = section ? sideOf(section, "next") : null;
      after?.style.removeProperty("min-height");
      next?.style.removeProperty("clip-path");
      section?.closest("main")?.style.removeProperty("--sky-on");
      section?.closest("main")?.removeAttribute("data-night-top");
    };
  }, []);

  useMotionValueEvent(held, "change", (p) => {
    const was = cover.current;
    cover.current = p;
    if (was > 0.995 && p <= 0.995) wake.current?.();
    const section = sectionRef.current;
    const next = section ? sideOf(section, "next") : null;
    if (!section || !next) return;
    const done = p >= 1;
    const main = section.closest("main");
    main?.style.setProperty("--sky-on", done ? "1" : "0");
    main?.toggleAttribute("data-night-top", (1 - p) * innerHeight > 36);
    next.style.backgroundColor = done ? "transparent" : "var(--background)";
    if (done || p <= 0) {
      next.style.removeProperty("clip-path");
      return;
    }
    const inset = Math.min(1, (1 - p) / 0.45);
    const round = Math.min(1, (1 - p) / 0.15);
    next.style.clipPath = `inset(0 calc(var(--gutter) * ${(inset * 0.7).toFixed(3)}) round calc(var(--gutter) * ${round.toFixed(3)}))`;
  });

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!section || !stage || !canvas) return;
    let disposed = false;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 880 ? 1 : 1.25));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const envTarget = pmrem.fromScene(room, 0.04);
    scene.environment = envTarget.texture;
    pmrem.dispose();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 260);

    const C = {
      top: new THREE.Color(),
      violet: new THREE.Color(),
      low: new THREE.Color(),
      pink: new THREE.Color(),
      core: new THREE.Color(),
    };

    const skyMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 }, stars: { value: 1 }, top: { value: C.top }, violet: { value: C.violet }, low: { value: C.low }, pink: { value: C.pink }, core: { value: C.core } },
      vertexShader: `varying vec3 vW; void main(){ vec4 w = modelMatrix*vec4(position,1.); vW = w.xyz; gl_Position = projectionMatrix*viewMatrix*w; }`,
      fragmentShader: `uniform float time, stars; uniform vec3 top, violet, low, pink, core; varying vec3 vW; ${NOISE}
      void main(){
        float y = max(vW.y, 0.) / 60., x = vW.x / 110.;
        vec3 c = mix(low, violet, smoothstep(0., .2, y));
        c = mix(c, top, smoothstep(.15, .8, y));
        float sun = exp(-(x*x*9. + y*y*22.));
        c = mix(c, pink, sun * .85);
        c += core * exp(-(x*x*60. + y*y*170.)) * .6;
        float m = fbm(vec2(x*4. + time*.006, y*7. - time*.004));
        c = mix(c, c * 1.25 + violet * .2, smoothstep(.45, .85, m) * (1. - sun) * .6);
        vec2 g = vW.xy * 5.; float s = hash(floor(g));
        float star = step(.9965, s) * smoothstep(.14, .4, y) * (.55 + .45*sin(time*2. + s*90.)) * smoothstep(.18, .0, length(fract(g) - .5)) * .8;
        c += core * star * stars;
        gl_FragColor = vec4(c, 1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
      depthWrite: false,
    });
    const sky = new THREE.Mesh(new THREE.PlaneGeometry(420, 100), skyMat);
    sky.position.set(0, 48, -82);
    scene.add(sky);

    const ringMat = new THREE.MeshStandardMaterial({ emissiveIntensity: 0.25, roughness: 0.35, metalness: 0.7 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(3.35, 0.016, 12, 200), ringMat);
    ring.position.set(0, 0, -1.6);
    scene.add(ring);

    const card = new THREE.Group();
    scene.add(card);
    const glass = new THREE.MeshPhysicalMaterial({
      roughness: 0.12,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.14,
      iridescence: 0.55,
      iridescenceIOR: 1.35,
      iridescenceThicknessRange: [180, 520],
      envMapIntensity: 1.3,
    });
    const core = new THREE.MeshPhysicalMaterial({ metalness: 1, roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 1.6 });
    let built: HaloBuilt = pick.current.build(glass, core);
    card.add(built.object);
    const dropShape = (b: HaloBuilt) => {
      card.remove(b.object);
      b.object.traverse((o) => (o as THREE.Mesh).isMesh && (o as THREE.Mesh).geometry.dispose());
    };
    swap.current = (next) => {
      dropShape(built);
      built = next.build(glass, core);
      card.add(built.object);
      wake.current?.();
    };

    const sweep = new THREE.DirectionalLight("white", 0);
    scene.add(sweep);
    let sweepU = 0.5;
    let sweepK = 0.5;

    document.fonts.ready.then(() => {
      if (disposed) return;
      introSignal.markReady();
      if (!introSignal.isClaimed()) introSignal.reveal();
    });

    const hemi = new THREE.HemisphereLight(undefined, undefined, 0.7);
    scene.add(hemi);
    const key = new THREE.DirectionalLight("white", 1.1);
    key.position.set(3, 5, 8);
    scene.add(key);
    const rim = new THREE.PointLight(undefined, 30, 12, 1.5);
    rim.position.set(0, 1.2, -2.2);
    scene.add(rim);

    const rtOpts = { type: THREE.HalfFloatType, format: THREE.RGBAFormat, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false };
    let simA = new THREE.WebGLRenderTarget(SIM, SIM, rtOpts);
    let simB = new THREE.WebGLRenderTarget(SIM, SIM, rtOpts);
    const simMat = new THREE.ShaderMaterial({
      uniforms: { prev: { value: null }, delta: { value: new THREE.Vector2(1 / SIM, 1 / SIM) }, drops: { value: [0, 1, 2, 3].map(() => new THREE.Vector4()) }, n: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }`,
      fragmentShader: `uniform sampler2D prev; uniform vec2 delta; uniform vec4 drops[4]; uniform int n; varying vec2 vUv;
      void main(){
        vec4 info = texture2D(prev, vUv);
        for (int i = 0; i < 4; i++) if (i < n) {
          float d = max(0., 1. - length(drops[i].xy - vUv) / drops[i].z);
          info.r += (.5 - cos(d * 3.14159) * .5) * drops[i].w;
        }
        vec2 dx = vec2(delta.x, 0.), dy = vec2(0., delta.y);
        float avg = (texture2D(prev, vUv - dx).r + texture2D(prev, vUv + dx).r + texture2D(prev, vUv - dy).r + texture2D(prev, vUv + dy).r) * .25;
        info.g += (avg - info.r) * 2.;
        info.g *= .993; info.r *= .9985;
        info.r += info.g;
        gl_FragColor = info;
      }`,
    });
    const simScene = new THREE.Scene();
    const simCam = new THREE.Camera();
    const simQuad = new THREE.PlaneGeometry(2, 2);
    simScene.add(new THREE.Mesh(simQuad, simMat));
    const queued: THREE.Vector4[] = [];
    let simUntil = 0;
    let activeAt = 0;
    const drop = (x: number, z: number, radius: number, strength: number) => {
      const u = (x - AREA.x) / AREA.size;
      const v = 1 - (z - AREA.z) / AREA.size;
      if (u < 0 || u > 1 || v < 0 || v > 1) return;
      if (queued.length < 4) queued.push(new THREE.Vector4(u, v, radius, strength));
      simUntil = performance.now() + 20000;
    };
    const stepSim = () => {
      simMat.uniforms.prev.value = simA.texture;
      simMat.uniforms.n.value = queued.length;
      queued.forEach((d, i) => simMat.uniforms.drops.value[i].copy(d));
      queued.length = 0;
      renderer.setRenderTarget(simB);
      renderer.render(simScene, simCam);
      renderer.setRenderTarget(null);
      [simA, simB] = [simB, simA];
    };

    const waterShader = {
      name: "HeroWater",
      uniforms: {
        color: { value: null },
        tDiffuse: { value: null },
        textureMatrix: { value: null },
        tHeight: { value: null },
        time: { value: 0 },
        area: { value: new THREE.Vector3(AREA.x, AREA.z, AREA.size) },
        deep: { value: new THREE.Color() },
        horizon: { value: new THREE.Color() },
        glint: { value: new THREE.Color() },
        sunDir: { value: new THREE.Vector3(0, 0.06, -1).normalize() },
      },
      vertexShader: `uniform mat4 textureMatrix; varying vec4 vCoord; varying vec3 vW;
        void main(){ vCoord = textureMatrix * vec4(position, 1.); vec4 w = modelMatrix*vec4(position,1.); vW = w.xyz; gl_Position = projectionMatrix*viewMatrix*w; }`,
      fragmentShader: `uniform sampler2D tDiffuse, tHeight; uniform float time; uniform vec3 area, deep, horizon, glint, sunDir; varying vec4 vCoord; varying vec3 vW;
      float h(vec2 p){ vec2 uv = (p - area.xy) / area.z; uv.y = 1. - uv.y; return texture2D(tHeight, uv).r; }
      void main(){
        vec2 p = vW.xz;
        vec2 uv = (p - area.xy) / area.z;
        float inside = smoothstep(0., .12, uv.x) * smoothstep(1., .88, uv.x) * smoothstep(0., .12, uv.y) * smoothstep(1., .88, uv.y);
        float e = area.z / ${SIM}.;
        vec2 grad = vec2(h(p + vec2(e, 0.)) - h(p - vec2(e, 0.)), h(p + vec2(0., e)) - h(p - vec2(0., e))) * inside;
        float dist = length(p - cameraPosition.xz);
        vec2 swell = vec2(sin(p.x * .9 + time * .6) + sin(p.x * 2.3 - p.y * 1.1 + time * .9) * .5,
                          sin(p.y * 1.7 - time * .7) + sin(p.y * 3.1 + p.x * .8 + time * 1.1) * .5) * .035 / (1. + dist * .08);
        vec3 n = normalize(vec3(-grad.x * 3.2 + swell.x, 1., -grad.y * 3.2 + swell.y));
        vec4 c = vCoord; c.xy += n.xz * c.w * .055;
        vec3 refl = texture2DProj(tDiffuse, c).rgb;
        vec3 view = normalize(vW - cameraPosition);
        float fres = .32 + .68 * pow(1. - max(dot(-view, n), 0.), 3.);
        vec3 col = mix(deep, refl * .9, fres);
        float s = pow(max(dot(reflect(view, n), sunDir), 0.), 70.);
        col += glint * s * 1.6;
        col = mix(col, horizon, smoothstep(30., 80., dist) * .75);
        gl_FragColor = vec4(col, 1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
    };
    const waterGeo = new THREE.PlaneGeometry(260, 164);
    const water = new Reflector(waterGeo, { shader: waterShader, textureWidth: 1024, textureHeight: 1024, clipBias: 0.002 });
    water.rotation.x = -Math.PI / 2;
    scene.add(water);
    const wU = (water.material as THREE.ShaderMaterial).uniforms;

    const readColors = () => {
      const cs = getComputedStyle(section);
      const set = (name: string, out: THREE.Color) => {
        const v = cs.getPropertyValue(name).trim();
        if (v) out.setStyle(v);
      };
      set("--sky-top", C.top);
      set("--sky-mid", C.violet);
      set("--sky-low", C.low);
      set("--sky-glow", C.pink);
      set("--sky-core", C.core);
      set("--sky-light", hemi.color);
      set("--water-deep", wU.deep.value);
      set("--water-horizon", wU.horizon.value);
      set("--water-glint", wU.glint.value);
      set("--water-glint", rim.color);
      set("--halo-ring", ringMat.emissive);
      ringMat.color.copy(ringMat.emissive).multiplyScalar(0.3);
      hemi.groundColor.copy(wU.deep.value).lerp(wU.horizon.value, 0.35);
      glass.color.copy(wU.deep.value).lerp(ringMat.emissive, 0.5);
      glass.sheenColor.copy(wU.glint.value);
      core.color.copy(wU.glint.value).lerp(ringMat.emissive, 0.35);
      sweep.color.copy(wU.glint.value).lerp(new THREE.Color("white"), 0.6);
    };
    readColors();
    const colorObserver = new MutationObserver(readColors);
    colorObserver.observe(document.documentElement, { attributes: true });
    const host = section.closest("main");
    if (host) colorObserver.observe(host, { attributes: true });

    const ndc = new THREE.Vector2();
    const ray = new THREE.Raycaster();
    const floor = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hitPt = new THREE.Vector3();
    const lastDrop = new THREE.Vector3(1e3, 0, 0);
    let pointerIn = false;
    let overCard = false;
    const toNdc = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
    };
    const onMove = (e: PointerEvent) => {
      toNdc(e);
      pointerIn = true;
      activeAt = performance.now();
      overCard = ray.intersectObject(built.object, true).length > 0;
      canvas.style.cursor = overCard ? "pointer" : "";
      if (!overCard && ray.ray.intersectPlane(floor, hitPt) && hitPt.distanceTo(lastDrop) > 0.35) {
        drop(hitPt.x, hitPt.z, 0.012, 0.09);
        lastDrop.copy(hitPt);
      }
    };
    const onLeave = () => {
      pointerIn = false;
      activeAt = performance.now();
      overCard = false;
    };
    const onDown = (e: PointerEvent) => {
      toNdc(e);
      if (ray.ray.intersectPlane(floor, hitPt)) drop(hitPt.x, hitPt.z, 0.022, 0.3);
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);

    let portrait = false;
    const resize = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      portrait = w / h < 0.85;
      camera.aspect = w / h;
      camera.fov = portrait ? 48 : 34;
      camera.position.set(0, portrait ? 1.7 : 1.55, portrait ? 12.5 : 10);
      camera.lookAt(0, portrait ? 1.0 : 1.6, 0);
      card.scale.setScalar(portrait ? 1 : 0.8);
      camera.updateProjectionMatrix();
      const pr = renderer.getPixelRatio();
      water.getRenderTarget().setSize(Math.round(w * pr * 0.45), Math.round(h * pr * 0.45));
    };
    resize();
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(stage);

    let revealed = false;
    const offReveal = introSignal.onReveal(() => {
      revealed = true;
    });

    const tilt = new THREE.Vector2();
    const tiltV = new THREE.Vector2();
    let rise = -3;
    let riseV = 0;
    let lift = 0;
    let splashed = false;
    let nextBeat = 0;
    let last = performance.now();
    let simClock = 0;
    let revealAt = Infinity;
    let raf = 0;

    const frame = (now: number) => {
      const idle = revealAt !== Infinity && now - revealAt > 3000 && now - activeAt > 1500;
      if (idle && now - last < 30) {
        raf = requestAnimationFrame(frame);
        return;
      }
      const real = (now - last) / 1000;
      const dt = Math.max(0, Math.min(real, 1 / 30));
      last = now;
      const t = now / 1000;

      if (revealAt === Infinity && revealed) revealAt = now;
      const since = (now - revealAt) / 1000;
      if (since > 0.15) {
        const k = reduced ? 400 : 34;
        const d = reduced ? 40 : 7.5;
        riseV += (k * (0 - rise) - d * riseV) * dt;
        rise += riseV * dt;
        if (!splashed && rise > -1.2) {
          splashed = true;
          drop(0, 0, 0.05, 0.6);
        }
      }
      lift += ((overCard ? 0.14 : 0) - lift) * Math.min(1, dt * 5);
      const bob = reduced ? 0 : Math.sin(t * 1.1) * 0.06;
      card.position.set(0, (portrait ? 1.75 : 1.5) + rise + bob + lift, 0);

      const tx = pointerIn ? -ndc.y * 0.22 : Math.sin(t * 0.5) * 0.05;
      const ty = pointerIn ? ndc.x * 0.42 : Math.sin(t * 0.35) * 0.16;
      tiltV.x += ((tx - tilt.x) * 40 - tiltV.x * 9) * dt;
      tilt.x += tiltV.x * dt;
      tiltV.y += ((ty - tilt.y) * 40 - tiltV.y * 9) * dt;
      tilt.y += tiltV.y * dt;
      card.rotation.set(tilt.x, tilt.y - 0.05, Math.sin(t * 0.7) * 0.012 - tilt.y * 0.04);
      built.tick(reduced ? 0 : t);
      sweepU = 0.62 + tilt.y * 1.5 - tilt.x * 0.9 + (reduced ? 0 : Math.sin(t * 0.45) * 0.12);
      sweepK += ((overCard ? 0.8 : 0.5) - sweepK) * Math.min(1, dt * 4);
      sweep.position.set(-6 + sweepU * 12, 4 - sweepU * 2, 6);
      sweep.intensity = sweepK * 2.2;

      if (!reduced && splashed && t > nextBeat) {
        drop(0, 0.15, 0.03, 0.16);
        nextBeat = t + 1.7;
      }

      simClock = Math.min(simClock + Math.max(0, real), 4 / 60);
      if (now > simUntil) simClock = 0;
      while (simClock >= 1 / 60) {
        stepSim();
        simClock -= 1 / 60;
      }
      wU.tHeight.value = simA.texture;
      wU.time.value = t;
      skyMat.uniforms.time.value = t;
      ringMat.emissiveIntensity = 0.22 + Math.sin(t * 0.8) * 0.05;
      renderer.render(scene, camera);
      if (cover.current > 0.995) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    let visible = true;
    const sync = () => {
      const run = visible && cover.current <= 0.995 && !document.hidden && !disposed;
      if (run && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    viewObserver.observe(section);
    document.addEventListener("visibilitychange", sync);
    wake.current = sync;
    sync();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      raf = 0;
      offReveal();
      document.removeEventListener("visibilitychange", sync);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      viewObserver.disconnect();
      sizeObserver.disconnect();
      colorObserver.disconnect();
      scene.traverse((o) => {
        if (o === water) return;
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry.dispose();
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => {
          Object.values(m).forEach((v) => {
            if (v instanceof THREE.Texture) v.dispose();
          });
          m.dispose();
        });
      });
      swap.current = undefined;
      wake.current = undefined;
      waterGeo.dispose();
      water.dispose();
      simA.dispose();
      simB.dispose();
      simMat.dispose();
      simQuad.dispose();
      envTarget.dispose();
      room.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={sectionRef} aria-label="Introduction" data-scene data-night className={`relative -mb-[100svh] h-[200svh] text-foreground ${className ?? ""}`}>
      <motion.div ref={stageRef} style={{ visibility: gone }} className="sticky top-0 h-svh overflow-clip bg-background">
        <motion.canvas ref={canvasRef} style={reduce ? undefined : { scale: sink, borderRadius: sinkRound }} aria-label={def.alt} className="absolute inset-0 block size-full touch-pan-y" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[38%] bg-[linear-gradient(180deg,transparent_0%,color-mix(in_srgb,var(--water-deep)_75%,transparent)_100%)] lg:h-[30%]" />
        {!reduce && <motion.div aria-hidden="true" style={{ opacity: haze }} className="pointer-events-none absolute inset-0 z-[5] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--sky-light)_55%,transparent)_0%,color-mix(in_srgb,var(--sky-glow)_45%,var(--sky-low))_55%,var(--sky-low)_100%)]" />}
        <motion.div aria-hidden="true" style={{ opacity: shade }} className="pointer-events-none absolute inset-0 z-[6] bg-background" />
        <motion.div style={reduce ? undefined : { opacity: copyOpacity, y: copyY }} className="pointer-events-none relative z-[4] mx-auto flex h-full w-[var(--container)] flex-col justify-end gap-6 pb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:pb-[clamp(2.5rem,6svh,4rem)]">
          <div className="flex min-w-0 flex-col gap-4 lg:gap-5">
            {description && (
              <BlurReveal as="p" show={ready} y={26} duration={1} delay={ease(2)} className="max-w-[24rem] text-balance text-[length:var(--text-body)] leading-[1.4] text-foreground/80">
                {description}
              </BlurReveal>
            )}
            <h1 className="max-w-[14ch] text-balance text-[length:var(--text-display)] leading-[1] tracking-[-0.04em] lg:max-w-[min(16ch,44vw)]">
              <BlurReveal show={ready} y={26} duration={1} delay={ease(3)} className="block">
                {title}
              </BlurReveal>
              {titleMuted && (
                <BlurReveal show={ready} y={26} duration={1} delay={ease(4)} className="block text-foreground/85 font-medium">
                  {titleMuted}
                </BlurReveal>
              )}
            </h1>
          </div>
          <div className="pointer-events-auto flex gap-3 lg:shrink-0 lg:pb-[0.4rem]">
            {primaryButton && (
              <motion.div initial={reduce ? false : { opacity: 0, y: 26 }} animate={ready || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }} transition={{ duration: 1, ease: EASE, delay: ease(5) }} className="flex flex-1 lg:flex-none">
                <DotArrowButton text={primaryButton.text} href={primaryButton.href} className="w-full px-4 lg:w-auto lg:px-6" />
              </motion.div>
            )}
            {secondaryButton && (
              <motion.div initial={reduce ? false : { opacity: 0, y: 26 }} animate={ready || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }} transition={{ duration: 1, ease: EASE, delay: ease(6) }} className="flex flex-1 lg:flex-none">
                <DotArrowButton text={secondaryButton.text} href={secondaryButton.href} variant="secondary" className="w-full px-4 lg:w-auto lg:px-6" />
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
