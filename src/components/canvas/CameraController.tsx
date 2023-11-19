import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import gsap from 'gsap'

interface CameraControllerProps {
  position?: number[]
  positionside?: number[]
  cameraDirection: number[]
  onTransitionComplete?: Function
}

export default function CameraController({ cameraDirection, position, positionside }: CameraControllerProps) {
  const ref = useRef()

  const { camera, mouse } = useThree()
  const [lookTarget, setLookTarget] = useState(new THREE.Vector3(0, 0, 0))
  const vec = new Vector3(lookTarget.x, lookTarget.y, lookTarget.z)


  useEffect(() => {
    // @ts-ignore
    position === 1 && gsap.to(camera.position, { x: 3, y: 4, z: 3, duration: 1 })

    // @ts-ignore
    position === 2 && gsap.to(camera.position, { x: 0, y: 1, z: 10, duration: 1 })

    // @ts-ignore
    position === 3 && positionside === 1 && gsap.to(camera.position, { x: 10, y: -10, z: 5, duration: 1 })
    // @ts-ignore
    position === 3 && positionside === 2 && gsap.to(camera.position, { x: 20, y: 10, z: 5, duration: 1 })
    // @ts-ignore
    position === 3 && positionside === 3 && gsap.to(camera.position, { x: 0, y: 0, z: 15, duration: 1 })
    // @ts-ignore
    position === 3 && positionside === 4 && gsap.to(camera.position, { x: 0, y: 20, z: 5, duration: 1 })

    // @ts-ignore
    position === 4 && gsap.to(camera.position, { x: 5, y: 0.1, z: 0, duration: 1 })

  }, [position, positionside])

  useFrame((state, delta) => {
    // @ts-ignore
    position === 1 && camera.lookAt(vec.lerp(new Vector3(0, 0, 0), 0.1))
    // @ts-ignore
    position === 2 && camera.lookAt(vec.lerp(new Vector3(0, 0, 0), 0.1))
    // @ts-ignore
    position === 3 && camera.lookAt(vec.lerp(new Vector3(0, 0, 0.5), 0.1))
    // @ts-ignore
    position === 4 && camera.lookAt(vec.lerp(new Vector3(0, 0, 0), 0.1))

  })

  return <></>
}




// import { useEffect, useRef, useState } from 'react'
// import * as THREE from 'three'
// import { useThree, useFrame } from '@react-three/fiber'
// import { Vector3 } from 'three'
// import gsap from 'gsap'

// interface CameraControllerProps {
//   position?: number[]
//   positionside?: number[]
//   cameraDirection: number[]
//   onTransitionComplete?: Function
//   project?: number[]
// }

// export default function CameraController({ cameraDirection, position, positionside, project }: CameraControllerProps) {
//   const ref = useRef()

//   const { camera, mouse } = useThree()
//   const [lookTarget, setLookTarget] = useState(new THREE.Vector3(0, 0, 0))
//   const vec = new Vector3(lookTarget.x, lookTarget.y, lookTarget.z)

//   useEffect(() => {
//     // @ts-ignore
//     position === 1 && gsap.to(camera.position, { x: 0, y: 0, z: 3, duration: 1 })

//     // @ts-ignore
//     position === 3 && positionside === 1 && gsap.to(camera.position, { x: 0, y: 2, z: 10, duration: 1 })
//     // @ts-ignore
//     position === 3 && positionside === 2 && gsap.to(camera.position, { x: -6, y: 2, z: 8, duration: 1 })
//     // @ts-ignore
//     position === 3 && positionside === 3 && gsap.to(camera.position, { x: 6, y: -5, z: 0, duration: 1 })
//     // @ts-ignore
//     position === 3 && positionside === 4 && gsap.to(camera.position, { x: 8, y: 3, z: 4, duration: 1 })

//     // @ts-ignore
//     position === 2 && gsap.to(camera.position, { x: 0, y: 0, z: 1, duration: 1 })

//     // @ts-ignore
//     position === 4 && gsap.to(camera.position, { x: 4, y: 0, z: 0, duration: 1 })

//   }, [position, positionside, project])

//   useFrame((state, delta) => {
//     // @ts-ignore
//     position === 1 && camera.lookAt(vec.lerp(new Vector3(0, 0, 0), 0.1))
//     // @ts-ignore
//     position === 3 && positionside === 1 && camera.lookAt(vec.lerp(new Vector3(0, 0, 0), 0.1))
//     // @ts-ignore
//     // position === 2 && positionside === 4 && camera.lookAt(vec.lerp(new Vector3(-2, 1, 3), 0.1))
//     //  // @ts-ignore
//     // position === 2 && positionside === 2 && camera.lookAt(vec.lerp(new Vector3(1, 0, 0), 0.1))
//     //  // @ts-ignore
//     // position === 2 && positionside === 3 && camera.lookAt(vec.lerp(new Vector3(2, 0, 2), 0.1))

//     // @ts-ignore
//     position === 2 && camera.lookAt(vec.lerp(new Vector3(0, 0, 0), 0.1))
//     // @ts-ignore
//     position === 4 && camera.lookAt(vec.lerp(new Vector3(0, 0, 0), 0.1))



//   })

//   return <></>
// }
