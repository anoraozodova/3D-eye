import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect } from "react";

import Background from "../Background/Background";
import Eye from "../components/Eye";


function ResponsiveCamera() {
    const { camera, size } = useThree();

    useEffect(() => {

        camera.position.set(0, 0, 5);
        camera.fov = 45;

        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();

    }, [camera, size]);

    return null;
}



export default function Scene() {
    return (
        <div className="scene">

            <Background />

            <Canvas
                camera={{
                    position: [0, 0, 5],
                    fov: 45,
                }}
                style={{
                    touchAction: "none",
                }}
            >

                <ResponsiveCamera />


                <ambientLight intensity={1.2} />


                <directionalLight
                    position={[5, 5, 5]}
                    intensity={2}
                />


                <directionalLight
                    position={[-5, 3, 2]}
                    intensity={1}
                />


                <pointLight
                    position={[0, 0, 3]}
                    intensity={1.5}
                />


                <Suspense fallback={null}>
                    <Eye />
                </Suspense>


            </Canvas>

        </div>
    );
}