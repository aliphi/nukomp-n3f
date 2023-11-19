import * as THREE from 'three'

import { useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import React, { useRef } from "react";


type GLTFResult = GLTF & {
  nodes: {
    Pyramid: THREE.Mesh
  }
  materials: {
    Frosted_Glass: any
    GlassSidemirror: any
    ['default']: THREE.MeshStandardMaterial
    Glass: THREE.MeshStandardMaterial
  }
}

export default function Car(props) {
  const { scene, nodes, materials, animations } = useGLTF('/Man.gltf') as unknown as GLTFResult
  // const context = useContext(Message_data)


  const group = useRef();
  // const { nodes, materials, animations } = useGLTF("/Man.gltf");
  const { actions } = useAnimations(animations, group);


  // console.log(actions)

  useEffect(() => {
    // modelAnimations.actions[modelAnimations.names].play()
    actions["Armature|mixamo.com|Layer0"].play()

  }, [])


  return (
    <>
      {/* <primitive object={scene} {...props} /> */}
      <group ref={group} {...props} dispose={null}>

        <group name="Scene">
          <group name="Armature" rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={0.1} position={[1.5, -0.5, 0]} >
            <skinnedMesh
              name="lowman_shoes"


              // @ts-ignore
              geometry={nodes.lowman_shoes.geometry}
              // material={nodes.lowman_shoes.material}
              // @ts-ignore
              material={new THREE.MeshStandardMaterial(0x00ff00)}

              // @ts-ignore
              skeleton={nodes.lowman_shoes.skeleton}
            />
            <primitive
              // @ts-ignore
              object={nodes.mixamorigHips} />
          </group>
        </group>
      </group>
    </>
  )
}
