import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import gsap from 'gsap';
import { DistrictConfig, DistrictId } from '../types';
import { DISTRICTS } from '../data/portfolioData';
import { cyberAudio } from '../audio/cyberAudio';

interface CityCanvasProps {
  activeDistrict: DistrictId | null;
  onSelectDistrict: (id: DistrictId) => void;
  onHoverDistrictChange: (
    district: DistrictConfig | null,
    screenPos: { x: number; y: number } | null
  ) => void;
  isAutoRotating: boolean;
  onCameraUpdate: (info: { x: string; y: string; z: string; angle: number }) => void;
  resetTrigger: number;
}

export const CityCanvas: React.FC<CityCanvasProps> = ({
  activeDistrict,
  onSelectDistrict,
  onHoverDistrictChange,
  isAutoRotating,
  onCameraUpdate,
  resetTrigger
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // References to keep fresh props in Three.js event listeners
  const activeDistrictRef = useRef(activeDistrict);
  useEffect(() => {
    activeDistrictRef.current = activeDistrict;
  }, [activeDistrict]);

  const onSelectDistrictRef = useRef(onSelectDistrict);
  useEffect(() => {
    onSelectDistrictRef.current = onSelectDistrict;
  }, [onSelectDistrict]);

  const onHoverDistrictChangeRef = useRef(onHoverDistrictChange);
  useEffect(() => {
    onHoverDistrictChangeRef.current = onHoverDistrictChange;
  }, [onHoverDistrictChange]);

  // References to hold Three.js instances for updates and animation
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const beaconMeshesRef = useRef<{ id: DistrictId; mesh: THREE.Group }[]>([]);

  // Panoramic default coordinates
  const DEFAULT_CAM_POS = new THREE.Vector3(0, 6.5, 12.5);
  const DEFAULT_TARGET = new THREE.Vector3(0, 1.0, 0);

  // Initialize Scene, Renderer, Post-processing, Model
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene setup with exponential cyber fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06080e);
    scene.fog = new THREE.FogExp2(0x06080e, 0.015);
    sceneRef.current = scene;

    // 2. Camera setup: 45° FOV with tight clipping plane (0.1 to 250) to prevent z-fighting
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 250);
    camera.position.copy(DEFAULT_CAM_POS);
    cameraRef.current = camera;

    // 3. WebGL Renderer with ACESFilmic tone mapping and sRGB color space
    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: false,
      depth: true,
      stencil: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Cannot go underground
    controls.minDistance = 2.5;
    controls.maxDistance = 38.0;
    controls.target.copy(DEFAULT_TARGET);
    controlsRef.current = controls;

    // 5. Post-Processing: UnrealBloomPass
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.65, // Strength: glows without washing out
      0.4,  // Radius
      0.82  // Threshold: only emissive neon signs glow
    );
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composerRef.current = composer;

    // 6. Cyberpunk Lighting Rig
    // Cool Ambient Fill
    const ambientLight = new THREE.AmbientLight(0x101726, 1.8);
    scene.add(ambientLight);

    // Directional Key Sunlight
    const dirLight = new THREE.DirectionalLight(0x7dd3fc, 2.5);
    dirLight.position.set(12, 22, 14);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 60;
    dirLight.shadow.bias = -0.0005;
    dirLight.shadow.normalBias = 0.02;
    const d = 12;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    scene.add(dirLight);

    // Strategic Cyber Point Lights
    const cyanLight = new THREE.PointLight(0x00f0ff, 4.0, 14);
    cyanLight.position.set(2.2, 2.8, -0.6);
    scene.add(cyanLight);

    const magentaLight = new THREE.PointLight(0xff007f, 4.0, 14);
    magentaLight.position.set(-2.0, 2.2, 1.5);
    scene.add(magentaLight);

    const amberLight = new THREE.PointLight(0xffb800, 3.5, 12);
    amberLight.position.set(-2.5, 3.0, -1.8);
    scene.add(amberLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 3.5, 14);
    purpleLight.position.set(1.5, 3.8, -2.5);
    scene.add(purpleLight);

    // 7. Ground Cyber Grid
    const gridHelper = new THREE.GridHelper(60, 60, 0x00f0ff, 0x111c2e);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // 8. Atmospheric Floating Cyber Dust Particles
    const particleCount = 300;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 24;
      particlePos[i + 1] = Math.random() * 8;
      particlePos[i + 2] = (Math.random() - 0.5) * 24;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.04,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 9. District 3D Holographic Beacons (Exclusively Interactive)
    const beaconGroups: { id: DistrictId; mesh: THREE.Group }[] = [];
    DISTRICTS.forEach(d => {
      const beaconGroup = new THREE.Group();
      beaconGroup.position.set(...d.beaconPos);

      // Rotating diamond
      const diamondGeo = new THREE.OctahedronGeometry(0.18, 0);
      const diamondMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(d.primaryColor),
        wireframe: true
      });
      const diamondMesh = new THREE.Mesh(diamondGeo, diamondMat);
      diamondMesh.name = `beacon_${d.id}`;
      diamondMesh.userData = { districtId: d.id, isBeacon: true };
      beaconGroup.add(diamondMesh);

      // Pulsing beacon ring
      const ringGeo = new THREE.RingGeometry(0.24, 0.28, 16);
      ringGeo.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(d.primaryColor),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.userData = { districtId: d.id, isBeacon: true };
      beaconGroup.add(ringMesh);

      // Vertical holographic light beam
      const beamGeo = new THREE.CylinderGeometry(0.01, 0.04, 1.2, 8);
      beamGeo.translate(0, -0.6, 0);
      const beamMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(d.primaryColor),
        transparent: true,
        opacity: 0.35
      });
      const beamMesh = new THREE.Mesh(beamGeo, beamMat);
      beamMesh.userData = { districtId: d.id, isBeacon: true };
      beaconGroup.add(beamMesh);

      // Invisible spherical hit area encompassing the beacon for reliable, crisp click detection
      const hitGeo = new THREE.SphereGeometry(0.42, 16, 16);
      const hitMat = new THREE.MeshBasicMaterial({
        visible: false,
        depthWrite: false
      });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.name = `hitbox_${d.id}`;
      hitMesh.userData = { districtId: d.id, isBeacon: true, isHitbox: true };
      beaconGroup.add(hitMesh);

      beaconGroup.userData = { districtId: d.id, isBeacon: true };
      scene.add(beaconGroup);
      beaconGroups.push({ id: d.id, mesh: beaconGroup });
    });
    beaconMeshesRef.current = beaconGroups;

    // 10. Load GLB Cyberpunk City Model (Purely Visual Scenery - No District Click Targets)
    const loader = new GLTFLoader();
    loader.load(
      '/models/cyberpunk_city_-_1.glb',
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        // Compute bounds and center model at (0, 0, 0) with base on ground
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        
        // Offset so base is at y = 0 and center in x, z is 0
        model.position.x = -center.x;
        model.position.y = -box.min.y;
        model.position.z = -center.z;

        // Traverse meshes to optimize materials & neon glow (NO district clickboxes on buildings)
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            // Enhance emissive materials for neon glow
            if (mesh.material) {
              const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
              materials.forEach((mat) => {
                const stdMat = mat as THREE.MeshStandardMaterial;
                if (stdMat.emissive && (stdMat.emissive.r > 0 || stdMat.emissive.g > 0 || stdMat.emissive.b > 0)) {
                  stdMat.emissiveIntensity = 2.4;
                  stdMat.toneMapped = true;
                }
                stdMat.roughness = Math.max(0.2, stdMat.roughness || 0.5);
              });
            }
          }
        });

        scene.add(model);
        setIsLoaded(true);
        setLoadProgress(100);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        } else {
          setLoadProgress(prev => Math.min(prev + 10, 95));
        }
      },
      (error) => {
        console.error('Error loading 3D Cyberpunk City:', error);
        setLoadError('Failed to load 3D Cyberpunk City model.');
      }
    );

    // 11. Raycasting Setup: Restricted Exclusively to Floating 3D Beacons
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getIntersectedBeacon = (clientX: number, clientY: number): { district: DistrictConfig; point: THREE.Vector3 } | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return null;
      }

      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Raycast ONLY against beacon groups (buildings are excluded completely)
      const beaconObjects = beaconGroups.map(b => b.mesh);
      const intersects = raycaster.intersectObjects(beaconObjects, true);

      for (const hit of intersects) {
        let cur: THREE.Object3D | null = hit.object;
        while (cur && cur !== scene) {
          if (cur.userData?.isBeacon && cur.userData.districtId) {
            const district = DISTRICTS.find(d => d.id === cur?.userData.districtId);
            if (district) {
              const beaconGroup = beaconGroups.find(b => b.id === district.id);
              const beaconWorldPos = new THREE.Vector3();
              if (beaconGroup) {
                beaconGroup.mesh.getWorldPosition(beaconWorldPos);
              } else {
                cur.getWorldPosition(beaconWorldPos);
              }
              return { district, point: beaconWorldPos };
            }
          }
          cur = cur.parent;
        }
      }

      return null;
    };

    // Pointer state tracking for drag-safe click discrimination
    let pointerDownState: {
      x: number;
      y: number;
      districtId: DistrictId | null;
      time: number;
    } | null = null;
    let isDraggingOrbit = false;

    const handlePointerDown = (e: PointerEvent) => {
      // Only process primary click (left mouse button or single touch)
      if (e.button !== 0) return;
      if (activeDistrictRef.current) return;

      const hit = getIntersectedBeacon(e.clientX, e.clientY);
      pointerDownState = {
        x: e.clientX,
        y: e.clientY,
        districtId: hit ? hit.district.id : null,
        time: performance.now()
      };
      isDraggingOrbit = false;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (activeDistrictRef.current) {
        onHoverDistrictChangeRef.current(null, null);
        if (container) container.style.cursor = 'default';
        renderer.domElement.style.cursor = 'default';
        return;
      }

      // If pointer is down and movement exceeds drag threshold, user is orbiting/panning the camera
      if (pointerDownState) {
        const moveDist = Math.hypot(e.clientX - pointerDownState.x, e.clientY - pointerDownState.y);
        if (moveDist > 6) {
          isDraggingOrbit = true;
          if (container) container.style.cursor = 'grabbing';
          renderer.domElement.style.cursor = 'grabbing';
          onHoverDistrictChangeRef.current(null, null);
          return;
        }
      }

      if (isDraggingOrbit) {
        onHoverDistrictChangeRef.current(null, null);
        return;
      }

      // Check hover exclusively on beacons
      const hit = getIntersectedBeacon(e.clientX, e.clientY);
      if (hit) {
        const rect = renderer.domElement.getBoundingClientRect();
        const screenPos = hit.point.clone().project(camera);
        const sx = ((screenPos.x + 1) / 2) * rect.width + rect.left;
        const sy = ((-screenPos.y + 1) / 2) * rect.height + rect.top;
        onHoverDistrictChangeRef.current(hit.district, { x: sx, y: sy });
        if (container) container.style.cursor = 'pointer';
        renderer.domElement.style.cursor = 'pointer';
      } else {
        onHoverDistrictChangeRef.current(null, null);
        if (container) container.style.cursor = 'grab';
        renderer.domElement.style.cursor = 'grab';
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (activeDistrictRef.current) {
        pointerDownState = null;
        isDraggingOrbit = false;
        return;
      }

      if (!pointerDownState) {
        return;
      }

      const dx = e.clientX - pointerDownState.x;
      const dy = e.clientY - pointerDownState.y;
      const distance = Math.hypot(dx, dy);
      const elapsed = performance.now() - pointerDownState.time;
      const initialDistrictId = pointerDownState.districtId;

      // Clear down state immediately
      pointerDownState = null;
      isDraggingOrbit = false;

      // STRICT DRAG-SAFE DISCRIMINATION:
      // 1. Must have started on an active beacon hitbox (initialDistrictId !== null)
      // 2. Drag movement must be within 6px tolerance (prevents camera drag from triggering)
      // 3. Duration must be within 650ms (prevents long-press camera rotates from triggering)
      // 4. Pointer release must occur on the EXACT SAME beacon hitbox
      if (initialDistrictId && distance <= 6 && elapsed <= 650) {
        const hitUp = getIntersectedBeacon(e.clientX, e.clientY);
        if (hitUp && hitUp.district.id === initialDistrictId) {
          cyberAudio.playWarp();
          onSelectDistrictRef.current(initialDistrictId);
        }
      }

      // Restore hover cursor
      const hitHover = getIntersectedBeacon(e.clientX, e.clientY);
      const nextCursor = hitHover ? 'pointer' : 'grab';
      if (container) container.style.cursor = nextCursor;
      renderer.domElement.style.cursor = nextCursor;
    };

    const handlePointerCancel = () => {
      pointerDownState = null;
      isDraggingOrbit = false;
      if (container) container.style.cursor = 'grab';
      renderer.domElement.style.cursor = 'grab';
    };

    // Suppress native click to prevent duplicate triggers or stray browser clicks after drag
    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', handlePointerDown);
    domElement.addEventListener('pointermove', handlePointerMove);
    domElement.addEventListener('pointerup', handlePointerUp);
    domElement.addEventListener('pointercancel', handlePointerCancel);
    domElement.addEventListener('click', handleClick);

    // 12. Responsive Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      composer.setSize(width, height);
      bloomPass.resolution.set(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 13. Animation Render Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Gentle floating animation for beacons
      beaconGroups.forEach((b, i) => {
        b.mesh.children[0].rotation.y += delta * 1.5;
        b.mesh.children[0].rotation.x = Math.sin(elapsed * 2 + i) * 0.2;
        b.mesh.children[1].rotation.z += delta * 0.8;
      });

      // Slowly drift floating particles upward
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += delta * 0.35;
        if (positions[i] > 8) positions[i] = 0;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Update controls
      controls.update();

      // Camera orientation telemetry calculation
      const angle = Math.round((Math.atan2(camera.position.x, camera.position.z) * 180) / Math.PI);
      onCameraUpdate({
        x: camera.position.x.toFixed(1),
        y: camera.position.y.toFixed(1),
        z: camera.position.z.toFixed(1),
        angle: (angle + 360) % 360
      });

      // Render through bloom composer
      composer.render();
    };
    animate();

    // 14. Cleanup on unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('pointerdown', handlePointerDown);
      domElement.removeEventListener('pointermove', handlePointerMove);
      domElement.removeEventListener('pointerup', handlePointerUp);
      domElement.removeEventListener('pointercancel', handlePointerCancel);
      domElement.removeEventListener('click', handleClick);

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }

      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      gridHelper.dispose();
    };
  }, []);

  // Update controls auto-rotate state
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotating;
      controlsRef.current.autoRotateSpeed = 1.0;
    }
  }, [isAutoRotating]);

  // Smooth Camera Swoop to Selected District or Reset to Panoramic
  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    if (activeDistrict) {
      const targetDistrict = DISTRICTS.find(d => d.id === activeDistrict);
      if (targetDistrict) {
        // Temporarily disable auto-rotate when diving into a district
        controls.autoRotate = false;

        const targetLookAt = new THREE.Vector3(...targetDistrict.targetOffset);
        const targetCamPos = new THREE.Vector3(...targetDistrict.cameraOffset);

        // Smooth GSAP swoop
        gsap.to(camera.position, {
          x: targetCamPos.x,
          y: targetCamPos.y,
          z: targetCamPos.z,
          duration: 1.4,
          ease: 'power2.inOut'
        });

        gsap.to(controls.target, {
          x: targetLookAt.x,
          y: targetLookAt.y,
          z: targetLookAt.z,
          duration: 1.4,
          ease: 'power2.inOut',
          onUpdate: () => controls.update()
        });
      }
    } else {
      // Return to panoramic overview
      gsap.to(camera.position, {
        x: DEFAULT_CAM_POS.x,
        y: DEFAULT_CAM_POS.y,
        z: DEFAULT_CAM_POS.z,
        duration: 1.2,
        ease: 'power2.inOut'
      });

      gsap.to(controls.target, {
        x: DEFAULT_TARGET.x,
        y: DEFAULT_TARGET.y,
        z: DEFAULT_TARGET.z,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: () => controls.update()
      });
    }
  }, [activeDistrict]);

  // Reset trigger handler
  useEffect(() => {
    if (resetTrigger === 0 || !cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    gsap.to(camera.position, {
      x: DEFAULT_CAM_POS.x,
      y: DEFAULT_CAM_POS.y,
      z: DEFAULT_CAM_POS.z,
      duration: 1.0,
      ease: 'power2.out'
    });

    gsap.to(controls.target, {
      x: DEFAULT_TARGET.x,
      y: DEFAULT_TARGET.y,
      z: DEFAULT_TARGET.z,
      duration: 1.0,
      ease: 'power2.out',
      onUpdate: () => controls.update()
    });
  }, [resetTrigger]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        cursor: 'grab'
      }}
    >
      {/* Loading Screen */}
      {!isLoaded && !loadError && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 60,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#06080e',
            gap: '20px'
          }}
        >
          {/* Animated Cyber Ring */}
          <div
            style={{
              width: '80px',
              height: '80px',
              border: '2px solid rgba(255, 255, 255, 0.15)',
              borderTop: '2px solid #ffffff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          />

          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                letterSpacing: '0.15em',
                color: '#fff',
                marginBottom: '8px'
              }}
            >
              INITIALIZING CYBERPUNK 3D GRID
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: '#ffffff',
                letterSpacing: '0.08em'
              }}
            >
              STREAMING GEOMETRY & PBR SHADERS // {loadProgress}%
            </p>
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: '260px',
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${loadProgress}%`,
                height: '100%',
                backgroundColor: '#ffffff',
                boxShadow: '0 0 12px rgba(255, 255, 255, 0.8)',
                transition: 'width 0.2s ease'
              }}
            />
          </div>
        </div>
      )}

      {/* Error State */}
      {loadError && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#06080e',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            padding: '20px',
            textAlign: 'center'
          }}
        >
          {loadError}
        </div>
      )}
    </div>
  );
};
