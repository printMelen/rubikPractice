import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const RubiksCube = () => {
  const containerRef = useRef(null);
  const renderer = useRef(null);
  const camera = useRef(null);
  const scene = useRef(null);
  const controls = useRef(null);

  useEffect(() => {
    // Scene
    scene.current = new THREE.Scene();
    
    // Camera
    camera.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.current.position.z = 5;

    // Renderer
    renderer.current = new THREE.WebGLRenderer();
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.current.domElement);

    // Controls
    controls.current = new OrbitControls(camera.current, renderer.current.domElement);

    // Rubik's Cube
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterials = [
      new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Right
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Left
      new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Top
      new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Bottom
      new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Front
      new THREE.MeshBasicMaterial({ color: 0x00ffff })  // Back
    ];
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
    scene.current.add(cube);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update controls
      controls.current.update();

      // Render
      renderer.current.render(scene.current, camera.current);
    };

    animate();

    // Cleanup
    return () => {
      containerRef.current.removeChild(renderer.current.domElement);
      renderer.current.dispose();
      controls.current.dispose();
    };
  }, []);

  return <div ref={containerRef} />;
};

export default RubiksCube;
