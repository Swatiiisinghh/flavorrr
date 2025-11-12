// src/components/FlavorGalaxy.js
import './FlavourGalaxy.css';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function FlavorGalaxy() {
  const galaxyRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    galaxyRef.current.appendChild(renderer.domElement);

    // Create particles
    const particles = new THREE.BufferGeometry();
    const particleCount = 1000;

    // Array to store particles positions
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10; // Random position within a range
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffc0cb,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the particle system for a dynamic galaxy effect
      particleSystem.rotation.y += 0.001;

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      galaxyRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="flavor-galaxy" ref={galaxyRef}>
      <div className="flavor-galaxy__overlay">
        <h1>Explore the Flavors of the Galaxy!</h1>
      </div>
    </section>
  );
}

export default FlavorGalaxy;