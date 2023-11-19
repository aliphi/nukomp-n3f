import { Suspense } from 'react'
import { useState, useRef } from 'react'
import { useControls } from 'leva'
import {
  DirectionalLight,
  DirectionalLightHelper,
  Mesh,
  PointLight,
  PointLightHelper,
  RectAreaLight,
  SpotLight,
  SpotLightHelper,
} from 'three'
import { Preload, useHelper } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
export default function Lights({ ...props }) {
  const SpotLightRef = useRef<SpotLight>(null!)

  // const HemiLightRef = useRef<HemisphereLight>(null!)

  // useHelper(SpotLightRef, SpotLightHelper, 'red')

  // const { distance, intensity, x, angle } = useControls({
  //   distance: { value: 1, min: -1, max: 1, steps: 0.1 },
  //   intensity: { value: 1, min: 0, max: 1, steps: 0.1 },
  //   x: { value: 1, min: -5, max: 5 },
  //   angle: { value: Math.PI / 6, min: 0.1, max: 1 },
  // })

  // if (props.level === 4) {
  // SpotLightRef.current.color = '#b9d7eb'
  // }
  const [velocityX, setVelocityX] = useState(1)
  const [velocityZ, setVelocityZ] = useState(1)
  const [velocityIntensity, setVelocityIntensity] = useState(1)

  // useFrame(({ clock }, delta) => {
  // if (props.level === 2) {
  //   SpotLightRef.current.position.x > 1 && setVelocityX(-1)
  //   SpotLightRef.current.position.x < -3 && setVelocityX(1)
  //   SpotLightRef.current.position.x += 0.004 * velocityX
  //   SpotLightRef.current.position.z > 1 && setVelocityZ(-1)
  //   SpotLightRef.current.position.z < -2 && setVelocityZ(1)
  //   SpotLightRef.current.position.z += 0.004 * velocityZ
  //   SpotLightRef.current.intensity > 0.9 && setVelocityIntensity(-1)
  //   SpotLightRef.current.intensity < 0.6 && setVelocityIntensity(1)
  //   SpotLightRef.current.intensity += 0.007 * velocityIntensity
  // }
  // if (props.level === 3) {
  //   SpotLightRef.current.position.x < -1 && (SpotLightRef.current.position.x += 0.01)
  //   SpotLightRef.current.position.x > -1 && (SpotLightRef.current.position.x += -0.01)
  //   SpotLightRef.current.position.z > 0 && (SpotLightRef.current.position.z += -0.01)
  //   SpotLightRef.current.position.z < 0 && (SpotLightRef.current.position.z += 0.01)
  //   SpotLightRef.current.intensity < 0.8 && (SpotLightRef.current.intensity += 0.07)
  // }
  // if (props.level === 4) {
  //   // SpotLightRef.current.color = '#b9d7eb'
  //   SpotLightRef.current.position.x > 1 && setVelocityX(-1)
  //   SpotLightRef.current.position.x < -3 && setVelocityX(1)
  //   SpotLightRef.current.position.x += 0.004 * velocityX
  //   SpotLightRef.current.position.z > 1 && setVelocityZ(-1)
  //   SpotLightRef.current.position.z < -2 && setVelocityZ(1)
  //   SpotLightRef.current.position.z += 0.004 * velocityZ
  //   SpotLightRef.current.intensity > 0.9 && setVelocityIntensity(-1)
  //   SpotLightRef.current.intensity < 0.4 && setVelocityIntensity(1)
  //   SpotLightRef.current.intensity += 0.007 * velocityIntensity
  //   // HemiLightRef.current.intensity = 0.1
  // }
  // if (props.level === 5) {
  //   // SpotLightRef.current.color = '#b9d7eb'
  //   SpotLightRef.current.position.x < -1 && (SpotLightRef.current.position.x += 0.01)
  //   SpotLightRef.current.position.x > -1 && (SpotLightRef.current.position.x += -0.01)
  //   SpotLightRef.current.position.z > 0 && (SpotLightRef.current.position.z += -0.01)
  //   SpotLightRef.current.position.z < 0 && (SpotLightRef.current.position.z += 0.01)
  //   SpotLightRef.current.intensity < 0.8 && (SpotLightRef.current.intensity += 0.7)
  // }
  //  SpotLightRef.current.intensity = 0.8
  // SpotLightRef.current.rotation.x > 0 && setVelocity(-1)
  // SpotLightRef.current.rotation.x < -3 && setVelocity(1)
  // SpotLightRef.current.rotation.x += Math.PI * 1 * velocity
  // SpotLightRef.current.position.x = SpotLightRef.current.position.x + Math.sin(delta * 0.1) * 1
  // SpotLightRef.current.position.x = -1
  // if (pbox.current.position.z < 6 && clicked != true) {
  //   if (pizzaroll.current) {
  //     pizzaroll.current.scale.set(1, 1, 1)
  //   }
  //   splash.current.style.scale = 1
  //   pbox.current.position.z = pbox.current.position.z + delta * props.speed
  //   pbox.current.position.y =
  //     Math.sin(pbox.current.position.z / 2) * 1 - 0.5
  //   pbox.current.position.x -=
  //     (props.endxpos + pbox.current.position.x) * delta
  //   if (pbox.current.position.z > 5.9) {
  //     hitIt()
  //   }
  // } else if (pbox.current.position.z < 6.2 && clicked != true) {
  //   splash.current.style.display = "block"
  //   pbox.current.position.z = pbox.current.position.z + 0.0007
  //   if (pizzaroll.current) {
  //     pizzaroll.current.scale.set(0, 0, 0)
  //   }
  // } else if (pbox.current.position.z > 6.1 && clicked != true) {
  //   splash.current.style.display = "none"
  //   pbox.current.position.set(props.startxpos, -0.5, 0)
  //   if (pizzaroll.current) {
  //     pizzaroll.current.scale.set(1, 1, 1.5)
  //   }
  // }
  // })

  return (
    <>
      {/* <spotLight ref={SpotLightRef} color='#d9d6cc' distance={15} angle={0.15} position={[-1, 5, 0]} intensity={0.8} /> */}
      {/* <hemisphereLight args={['#fff', '#222', 1]} /> */}

      <ambientLight intensity={0.2} />
      <pointLight intensity={0.7} position={[4, 2, 0]} castShadow />
    </>
  )
}
