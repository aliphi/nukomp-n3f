import * as THREE from 'three'

import { useLayoutEffect, useState, useEffect } from 'react'
import { useGLTF, useVideoTexture, Html, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import gsap from 'gsap'
import React, { useRef } from "react";

// import MiddleScreen from '@/components/canvas/MiddleScreen'

import { useContext } from 'react'
import { Message_data } from '../../context/context'

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
  const { scene, nodes, materials, animations } = useGLTF('/ManFalling.gltf') as unknown as GLTFResult
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
        <group name="Armature" rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={0.1} position={[1.5, 0, 0]} >
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
