import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {useStore} from '../store/cubeState.js';

const RubiksCube = () => {
  const cubeState = useStore((state) => state.cubeState);
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
    const cubeMaterials = cubeState.map(colorCube => {
      const hexColor = parseInt(colorCube, 16);
      return new THREE.MeshBasicMaterial({ color: hexColor});
    });
    const cubeSize = 1;
    const separation = 0.01;
    const totalCubes = 3;

    for (let x = 0; x < totalCubes; x++) {
      for (let y = 0; y < totalCubes; y++) {
        for (let z = 0; z < totalCubes; z++) {
          const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
          const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
          cube.position.set(
            (cubeSize + separation) * (x - (totalCubes - 1) / 2),
            (cubeSize + separation) * (y - (totalCubes - 1) / 2),
            (cubeSize + separation) * (z - (totalCubes - 1) / 2)
          );
          scene.current.add(cube);
        }
      }
    }

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
  }, [cubeState]);

  return <div ref={containerRef} />;
};

export default RubiksCube;
