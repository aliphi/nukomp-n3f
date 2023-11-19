import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Preload,
  OrbitControls,
  useProgress,
  Html,
  Box,
  Plane,
} from "@react-three/drei";
import dynamic from "next/dynamic";
import { Suspense, useState, useEffect, useRef, useMemo } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import gsap from "gsap";

import * as THREE from "three";

import { Physics, useBox, usePlane } from "@react-three/cannon";

import CameraController from "./CameraController";

import { useContext } from "react";
import { Message_data } from "../../context/context";

import Pulse from "@/components/dom/pulse/Pulse";

import vertexShader from "../vertexShader";
import fragmentShader from "../fragmentShader";
import { MathUtils } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";

// const Main = dynamic(() => import('@/components/canvas/Main'), { ssr: true })
const Lights = dynamic(() => import("@/components/canvas/Lights"), {
  ssr: true,
});
// const Sound = dynamic(() => import('@/components/canvas/Sounds'), { ssr: true })

const Man = dynamic(() => import("@/components/canvas/Man"), { ssr: false });
const ManFalling = dynamic(() => import("@/components/canvas/ManFalling"), {
  ssr: false,
});

const Blob = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const hover = useRef(false);
  const colorMap = useLoader(TextureLoader, "t.jpg");

  const uniforms = useMemo(
    () => ({
      u_intensity: {
        value: 0.3,
      },

      uTexture: {
        value: colorMap,
      },

      u_time: {
        value: 0.0,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    // @ts-ignore
    mesh.current.material.uniforms.u_time.value = 0.1 * clock.getElapsedTime();

    // @ts-ignore
    mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
      // @ts-ignore
      mesh.current.material.uniforms.u_intensity.value,
      hover.current ? 0.85 : 0.15,
      0.02
    );

    if (props.camera === 3) {
      // @ts-ignore
      gsap.to(mesh.current.position, {
        x: props.position[0],
        y: props.position[1],
        z: props.position[2],
        duration: 1.5,
      });
    } else {
      // @ts-ignore
      gsap.to(mesh.current.position, { x: 0, y: 0, z: 0, duration: 1 });
    }
  });

  const context = useContext(Message_data);

  const changeCameraPosition = async (e: any) => {
    context.setCameraside(e);
  };

  return (
    <mesh
      ref={mesh}
      rotation={props.rotation}
      scale={props.scale}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
      // onClick={() => console.log('kk')}
      onClick={() => changeCameraPosition(props.case)}
    >
      <icosahedronGeometry args={[2, 40]} />

      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />

      {/* {context.cameraSide !== props.case && (
        <Html
          transform
          sprite
          pointerEvents={"none"}>
          <Flex
            borderRadius="20px"
            flexDir={"column"}
            opacity={1}
            pointerEvents={"none"}
            fontSize={"0.3em"}
            transform={"translateY(-250%)"}
          >
            <Text color="grey">{props.title}</Text>
          </Flex>
        </Html>
      )} */}
      
    </mesh>
  );
};

function PhyPlane({ ...props }) {
  const [ref] = usePlane(() => ({ ...props }));

  return (
    // @ts-ignore
    <Plane args={[500, 500]} ref={ref}>
      <meshStandardMaterial attach="material" color={"lightgray"} />
    </Plane>
  );
}

function PhyGround({ camera, ...props }) {
  const [ref, api] = usePlane(() => ({ ...props }));
  // const ref = useRef()

  // console.log(camera)
  useFrame((state, delta) => {
    // ref.current.rotation.x += 0.01
    if (camera === 3) {
      // api.position.y += -0.01

      api.position.set(0, -10, 0);
      // ref.current.rotation.x += 0.01
      // ref.current.rotation.y += 0.005
    } else {
      api.position.set(0, -1, 0);
    }

    // if (props.camera === 3 && ref.current.position.x > -30){
    //   ref.current.position.x -= 1

    // }
  });

  return (
    // @ts-ignore
    <Plane args={[500, 500]} ref={ref} receiveShadow>
      <meshStandardMaterial attach="material" color={"lightgray"} />
    </Plane>
  );
}

export default function Scene({ ...props }) {
  // const [pointerDown, setPointerDown] = useState(false)
  const [cameraDirection, setCameraDirection] = useState([0, 0]);
  const [loader, setLoader] = useState(true);

  const loaderRed = useRef();

  const loaderactive = useProgress((state) => state.active);
  const { active, progress, errors, item, loaded, total } = useProgress();

  const context = useContext(Message_data);

  const [device, setDevice] = useState(false);
  const [fov, setFov] = useState(35);

  // useEffect(() => {
  //   //HEIGHT FIXE FOR PHONES
  //   if (/webOS|Android|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  //     let vh = window.innerHeight * 0.01
  //     document.documentElement.style.setProperty('--vh', `${vh}px`)
  //     setDevice(true)
  //   }
  //   //HEIGHT FIXE FOR PHONES
  // }, [])

  // useEffect(() => {
  //   // device ? setFov(45) : setFov(62)
  // }, [device])

  const changeCameraPosition = async (e: any) => {
    // if (context.camera > 1 && e === -1) {
    context.setCameraside(e);
    // } else if (context.camera < 4 && e === 1) {
    //   context.setCameraside(context.camera + 1)
    // }
  };

  const PhyBox = (props, camera) => {
    // const [ref, api] = useBox(() => ({
    //   mass: props.camera === 3 ? 0 : 0,
    //   // args: [1.2, 1.2, 1.2],
    //   // rotation: [Math.random() - 5, Math.random() * 2, Math.random() - 2],
    //   // position: [4, Math.random() * 2, -2],
    //   ...props,
    // }))
    const ref = useRef()
    const doit = () => {
      // api.applyImpulse([-0.6, 0, 0.2], [0, 0, 0]),
      //   api.rotation.set(Math.random() - 5, Math.random() * 2, Math.random() - 2),
      //   api.position.set(6, Math.random() * 4, -2)
      // api.mass.set(0.09)
    }

    useFrame((state, delta) => {
      // ref.current.rotation.x += 0.01
      if (props.camera === 3) {
        // @ts-ignore
        ref.current.rotation.x += 0.01
        // @ts-ignore
        ref.current.rotation.y += 0.005
      }

      // if (props.camera === 1) {
      //   // @ts-ignore
      //   if (ref.current.scale.x > 0.1) {
      //      // @ts-ignore
      //     ref.current.scale.x  += -0.01
      //   }

      // }

      // if (props.camera === 2) {
      //   // @ts-ignore
      //   if (ref.current.scale.x < 1) {
      //      // @ts-ignore
      //     ref.current.scale.x  += 0.008
      //   }

      // }
      // if (props.camera === 2 && ref.current.position.x > -7){
      //   ref.current.position.x -= 0.1

      // }
    })

    // useFrame(() => api.at(Math.floor(Math.random() * 5)).position.set(0, Math.random() * 10, 0))

    return (
      // @ts-ignore
      <Box castShadow args={[1.2, 1.2, 1.2]} scale={[1, 1, 1]}  ref={ref} position={[0, 0.6, 0]} onClick={(e) => doit()}>
        <meshLambertMaterial attach='material' />
      </Box>
    )
  }

  return (
    <>
      {/* <Flex id='camera-up-box' position='absolute' w='100%' h='5%' mx='auto' top='0' zIndex='99'>
        <Flex
          w='60%'
          mx='auto'
          onPointerEnter={() => setCameraDirection([0, 1])}
          onPointerLeave={() => setCameraDirection([0, 0])}></Flex>
      </Flex>
      <Flex id='camera-down-box' position='absolute' w='100%' h='5%' mx='auto' top='95%' zIndex='99'>
        <Flex
          w='60%'
          mx='auto'
          onPointerEnter={() => setCameraDirection([0, -1])}
          onPointerLeave={() => setCameraDirection([0, 0])}></Flex>
      </Flex>
      <Flex id='camera-left-box' position='absolute' w='5%' h='100%' mx='auto' top='0' left='0' zIndex='99'>
        <Flex
          h='60%'
          w='100%'
          my='auto'
          onPointerEnter={() => setCameraDirection([-1, 0])}
          onPointerLeave={() => setCameraDirection([0, 0])}></Flex>
      </Flex>
      <Flex id='camera-right-box' position='absolute' w='5%' h='100%' mx='auto' top='0' left='95%' zIndex='99'>
        <Flex
          h='60%'
          w='100%'
          my='auto'
          onPointerEnter={() => setCameraDirection([1, 0])}
          onPointerLeave={() => setCameraDirection([0, 0])}></Flex>
      </Flex> */}

      {/* {loader && (
        <Flex
          ref={loaderRed}
          position='fixed'
          flexDirection='column'
          minW='100vw'
          minH='100vh'
          justifyContent='center'
          zIndex='1500'
          alignItems='center'
          bg='rgba(66,133,244, 1)'
          opacity='1'>
          {Math.round(progress) !== 100 && (
            <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' mb='1em' />
          )}
        </Flex>
      )} */}

      <Flex
        sx={{
          filter: props.blur ? "blur(5px)" : "none",
          position: "fixed",
          w: "100%",
          height: "100%",
        }}
      >
        <Canvas
          dpr={[1, 2]}
          camera={{ fov: fov, position: [0, 0, 8], near: 0.1, far: 1000 }}
        >
          <Suspense fallback={null}>
            {/* <color attach="background" args={["#101010"]} /> */}
            <color attach="background" args={["#ababab"]} />

            <CameraController
              cameraDirection={cameraDirection}
              position={context.camera}
              positionside={context.cameraSide}
            />


            <Blob
              position={[0, 0, 0]}
              rotation={[0, Math.PI / 1, 0]}
              scale={0.3}
              camera={context.camera}
              case={1}
              title={""}
            />
            <Blob
              position={[-2, 1, 3]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.15}
              camera={context.camera}
              case={2}
              title={"SERVICES"}
            />
            <Blob
              position={[2, -2, -1]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.15}
              camera={context.camera}
              case={3}
              title={"BRANDS"}
            />
            <Blob
              position={[3, 2, 2]}
              rotation={[0, Math.PI / 3, 0]}
              scale={0.15}
              camera={context.camera}
              case={4}
              title={"TECH"}
            />

            <Physics gravity={[-2, -15, -1]}>
              <PhyGround
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                camera={context.camera}
              />
              <PhyPlane position={[0, 0, -10]} />

              <PhyPlane
                position={[-10, 0, -5]}
                rotation={[0, Math.PI / 1.5, 0]}
              />
              <PhyPlane
                position={[10, 0, -5]}
                rotation={[0, -Math.PI / 1.5, 0]}
              />
            {/* <PhyBox camera={context.camera} /> */}
            {/* <Blob />*/}
            </Physics> 

            {/* {context.camera === 3 && (
              <> */}
                {/* {context.cameraSide !== 1 && <Html position={[2, -2, -1]} zIndexRange={[0, 0]}>
                  <Flex w='30px' h='30px' cursor='pointer' onClick={() => changeCameraPosition(1)}>
                    <Pulse />
                  </Flex>
                </Html>
                } */}

                {/* <Html position={[3, 2, 2]} zIndexRange={[0, 0]}>
                  <Flex
                    w="30px"
                    h="30px"
                    cursor="pointer"
                    onClick={() => changeCameraPosition(2)}
                  >
                    <Pulse />
                  </Flex>
                </Html>

                <Html position={[-2, 3, -2]} zIndexRange={[0, 0]}>
                  <Flex
                    w="30px"
                    h="30px"
                    cursor="pointer"
                    onClick={() => changeCameraPosition(3)}
                  >
                    <Pulse />
                  </Flex>
                </Html>

                <Html position={[-2, 1, 3]} zIndexRange={[0, 0]}>
                  <Flex
                    w="30px"
                    h="30px"
                    cursor="pointer"
                    onClick={() => changeCameraPosition(4)}
                  >
                    <Pulse />
                  </Flex>
                </Html>
              </>
            )} */}

            {context.camera === 3 ? <ManFalling /> : <Man />} 

            {/* <Box /> */}
       

            <Lights level={context.level} />
            <Preload all />
          </Suspense>

          {context.camera === 3 && (
            // <OrbitControls
            // enablePan
            // enableRotate
            // enableZoom
            // maxDistance={90}
            // minDistance={4}
            // />
            // <OrbitControls
            //   enablePan={false}
            //   enableRotate
            //   minAzimuthAngle={0.4}
            //   maxAzimuthAngle={Math.PI / 2}
            //   minPolarAngle={1}
            //   maxPolarAngle={Math.PI / 1.8}
            //   enableZoom={false}
            // // maxDistance={90}
            // // minDistance={4}
            // />

            <OrbitControls
            enablePan={false}
            enableRotate
            enableZoom={false}
          />
          )}
        </Canvas>

        {props.blur && props.blurColour && (
          <Flex
            sx={{
              position: "absolute",
              w: "100%",
              h: "100%",
              backgroundColor: props.blur ? props.blurColour : "transparent",
            }}
          ></Flex>
        )}
      </Flex>
    </>
  );
}
