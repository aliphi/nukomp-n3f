import Lottie from 'react-lottie-player'
import * as animation from '../../animation/animation.json'
import { Flex, Image,Text,Tooltip } from '@chakra-ui/react'


interface lottie {
  play: any
  click: any
}
export default function LottiePlayer(props: lottie) {
  return (
    <Tooltip placement='top'  bg='grey' hasArrow label='Rotate by Dragging the Cursor'>

    <Flex
      // fontSize={{
      //   base: '0.8em',
      //   sm: '.6em',
      //   md: '.7em',
      //   lg: '.8em',
      //   xl: '.8em',
      //   '2xl': '0.8em',
      //   '3xl': '0.8em',
      // }}
      // position='absolute'
      // bottom='4em'
      // left='4em'
      // // maxW='7em'
      // // maxH='7em'
      // // filter={'invert(1)'}

      // // position='absolute'
      // // bottom='4em'
      // // right='4em'
      // p='2em'
      // minH='10em'
      // // minH='10em'
      // direction='column'
      // textAlign='center'
      // justifyContent='flex-end'
      // alignItems='center'
      // pointerEvents='all'
      // boxShadow='0 0 8px rgba(0, 0, 0, 0.3)'
      // zIndex={1500}

      // borderRadius='50px'
      // bg="	rgb(255,255,255,0)"
      // // p={4}


      fontSize={{
        base: '1em',
        sm: '.6em',
        md: '.7em',
        lg: '.8em',
        xl: '.9em',
        '2xl': '1em',
        '3xl': '1em',
      }}
      position='fixed'
      bottom='4em'
      left='2em'
      p='1em'
      // minH='10em'
      direction='column'
      textAlign='center'
      justifyContent='flex-end'
      alignItems='center'
      pointerEvents='all'
      boxShadow='0 0 8px rgba(0, 0, 0, 0.15)'
      zIndex={1500}
      // bg='red'

      borderRadius='50px'
    // mixBlendMode='multiply'



    >
      {/* <Lottie
        // @ts-ignore
        loop={true} autoPlay={true} animationData={animation} play={true} /> */}


          {/* <Flex
            flexDir={"column"}
            // bg="	rgb(255,255,255,0.25)"
            // borderRadius={"10px"}
            // mb={0}
            // color={"white"}
            // boxShadow={"xl"}
            // p={8}
            alignItems={"center"}
            justifyContent={"center"}
          > */}
            <Image src="./360.png" w="3em" p='0.5em' />
            {/* <Text color={'white'} fontSize={'0.9em'}>ROTATE<br />USING<br />CURSOR</Text> */}
          {/* </Flex> */}
  

    </Flex>
    </Tooltip>
  )
}
