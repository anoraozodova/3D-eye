import { useRef, useEffect, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

export default function Eye() {
  const outerGroup = useRef()
  const fbx = useLoader(FBXLoader, '/model/eye/OJO FINAL.fbx')
  const [ready, setReady] = useState(false)
  const { size } = useThree()

  const scale = Math.max(0.006, Math.min(0.01, size.width / 32000))
  useEffect(() => {
    const loader = new THREE.TextureLoader()

    const corneaBaseColor = loader.load('/model/eye/textures/CORNEA_Base_Color.jpg')
    const corneaRoughness = loader.load('/model/eye/textures/CORNEA_Roughness.jpg')
    const corneaNormal = loader.load('/model/eye/textures/CORNEA_Normal_DirectX.jpg')
    const irisNormal = loader.load('/model/eye/textures/IRIS_Normal_DirectX.jpg')

    fbx.traverse((child) => {
      if (child.isMesh) {
        const matName = child.material.name.toUpperCase()

        if (matName.includes('IRIS')) {
          child.material.normalMap = irisNormal
        } else {
          child.material.map = corneaBaseColor
          child.material.roughnessMap = corneaRoughness
          child.material.normalMap = corneaNormal
        }

        child.material.needsUpdate = true
      }
    })

    fbx.scale.setScalar(scale)

    const box = new THREE.Box3().setFromObject(fbx)
    const center = box.getCenter(new THREE.Vector3())
    fbx.position.sub(center)

    setReady(true)
  }, [fbx])

  const BASE_ROTATION_Y = -Math.PI / 2

  useFrame(({ mouse }) => {
    if (!outerGroup.current) return

    const targetX = -mouse.y * 0.5
    const targetY = BASE_ROTATION_Y + mouse.x * 0.5

    outerGroup.current.rotation.x = targetX
    outerGroup.current.rotation.y = targetY
  })

  return (
    <group ref={outerGroup}>
      {ready && <primitive object={fbx} />}
    </group>
  )
}