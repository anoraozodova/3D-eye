import './App.css'
import { Canvas } from '@react-three/fiber'
import Eye from './Eye'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[-5, 3, 2]} intensity={1} />
        <pointLight position={[0, 0, 3]} intensity={1.5} />
        <Eye />
      </Canvas>
    </div>
  )
}