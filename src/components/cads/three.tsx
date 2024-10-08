import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useQuery } from '@tanstack/react-query';
import { GetHomeCad } from '@/requests/public/home';
import ErrorPage from '@/components/error-page';
import Spinner from '@/components/spinner';
import getStatusCode from '@/utils/get-status-code';
import ThreeJSCad, { emptyThreeJSCad } from './three.interface';

interface ThreeJSProps {
    cad?: ThreeJSCad
    isHomeCad?: boolean
}

function ThreeJS({ cad, isHomeCad }: ThreeJSProps) {
    const mountRef = useRef<HTMLDivElement>(null);
    const isTouchedRef = useRef(false);
    const [loader, setLoader] = useState(true);
    
    let model: ThreeJSCad = emptyThreeJSCad;
    useEffect(() => {
        if (model.cadPath) {
            const scene = new THREE.Scene();

            const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 1000);
            camera.position.set(model.camCoordinates.x, model.camCoordinates.y, model.camCoordinates.z);

            const { x, y, z } = model.camCoordinates;
            if (!x && !y && !z) {
                camera.position.set(0, 0, 5);
            }

            const mount = mountRef.current;
            if (!mount || mount.children.length > 0) {
                return;
            }

            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            mount.appendChild(renderer.domElement);

            let isInteracting = false
            let resumeTimeout: number;

            function cadTouched() {
                if (!isTouchedRef.current) {
                    window.dispatchEvent(new CustomEvent('PositionChanged'));
                    isTouchedRef.current = true;
                }

                isInteracting = true;
                clearTimeout(resumeTimeout);

                resumeTimeout = setTimeout(() => {
                    isInteracting = false;
                }, 1500);
            }

            function sendPosition() {
                const [camCoords, panCoords] = [camera.position, controls.target];
                window.dispatchEvent(new CustomEvent('SavePosition', { detail: { camCoords, panCoords, } }));
            };

            function resetPosition() {
                const [camCoords, panCoords] = [model.camCoordinates, model.panCoordinates];
                camera.position.set(camCoords.x, camCoords.y, camCoords.z);
                controls.target.set(panCoords.x, panCoords.y, panCoords.z);
                window.dispatchEvent(new CustomEvent('ResetsPosition'));
            };

            function trackChanges() {
                isTouchedRef.current = false;
            };

            function updateRendererSize() {
                const width = mount!.clientWidth;
                const height = mount!.clientHeight;

                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
            updateRendererSize();

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            function addDirectionalLight(intensity: number, coords: { x: number, y: number, z: number }) {
                const light = new THREE.DirectionalLight(0xffffff, intensity);
                light.position.set(coords.x, coords.y, coords.z);
                scene.add(light);
            }
            addDirectionalLight(1, { x: 5, y: 10, z: 5 });
            addDirectionalLight(0.5, { x: -5, y: 5, z: 5 });
            addDirectionalLight(0.5, { x: 5, y: -5, z: 5 });
            addDirectionalLight(0.3, { x: 0, y: 5, z: -5 });
            addDirectionalLight(0.3, { x: 0, y: -5, z: 0 });
            addDirectionalLight(0.3, { x: -5, y: 0, z: 0 });
            addDirectionalLight(0.3, { x: 5, y: 0, z: 0 });

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.1;
            controls.target.set(model.panCoordinates.x, model.panCoordinates.y, model.panCoordinates.z);
            controls.update();

            const loader = new GLTFLoader();
            loader.path = import.meta.env.VITE_API_BASE_URL;
            loader.load(model.cadPath,
                (cad) => scene.add(cad.scene),
                (xhr) => xhr.loaded === xhr.total && setLoader(false),
                (e) => console.error(e)
            );

            controls.addEventListener('change', cadTouched);

            function animate() {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);

                if (isHomeCad && !isInteracting) {
                    scene.rotation.y += 0.01;
                }
            }
            animate();

            controls.addEventListener('change', cadTouched);
            window.addEventListener('resize', updateRendererSize);
            window.addEventListener('TrackChanges', trackChanges);
            window.addEventListener('SendPosition', sendPosition);
            window.addEventListener('ResetPosition', resetPosition);


            return () => {
                mount.removeChild(renderer.domElement);
                controls.removeEventListener('change', cadTouched);
                window.removeEventListener('resize', updateRendererSize);
                window.removeEventListener('TrackChanges', trackChanges);
                window.removeEventListener('SendPosition', sendPosition);
                window.addEventListener('ResetPosition', resetPosition);
            };
        }

    }, [loader, model.id, model.cadPath]);

    if (cad) {
        model = cad;
    } else {
        const { data, isError, error } = useQuery({
            queryKey: ['main-cad', isHomeCad],
            queryFn: async () => {
                const { data } = await GetHomeCad();
                return data;
            },
            enabled: isHomeCad
        });
        if (isError) {
            return <ErrorPage status={getStatusCode(error)} />;
        }
        if (data) {
            model = data;
        }
    }

    return !isHomeCad && loader
        ? <>
            <div ref={mountRef} className="w-full h-full hidden" />
            <Spinner />
        </>
        : <div ref={mountRef} className="w-full h-full" />;
}

export default ThreeJS;