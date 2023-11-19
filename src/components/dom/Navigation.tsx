import { Flex, Image, Tooltip } from '@chakra-ui/react'
import { useContext, useState, useEffect } from 'react'
import { Message_data } from '../../context/context'

import Pulse from '@/components/dom/pulse/Pulse'

export default function Tasks(visible) {
  const context = useContext(Message_data)


  const [page, setPage] = useState(1);



  const Dot = (props) => {

    // const context = useContext(Message_data)
    return (


      <Flex w='0.75em' h='0.75em'  borderRadius='50px' transitionDuration='1s' cursor='pointer'
      bg={props.color} 
      onClick={() => (context.setCamera(props.camera),context.setCameraside(props.cameraSide))}
      _hover={{
        filter: 'invert(1)',
        // transitionDuration: '1s',
        opacity: 0.5
      }}></Flex>
    );
  };

  return (
    <>
      {visible.visible === 0 && (

          <Flex
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
            top='4em'
            right='2em'
            p='1em'
            minH='10em'
            direction='column'
            textAlign='center'
            justifyContent='flex-start'
            alignItems='center'
            pointerEvents='all'
            // boxShadow='0 0 8px rgba(0, 0, 0, 0.3)'
            zIndex={1500}
            // bg='yellow'
            gap={2}

            w='6em'
          // m='1em'


          // borderRadius='50px'
          // mixBlendMode='multiply'
          >


            <Dot camera={1} cameraSide={1} color={context.camera === 1 && context.cameraSide === 1 ? 'black' : 'white'} />
            <Dot camera={2} cameraSide={1} color={context.camera === 2 && context.cameraSide === 1 ? 'black' : 'white'} />
            <Dot camera={3} cameraSide={1} color={context.camera === 3 && context.cameraSide === 1 ? 'black' : 'white'} />
            <Dot camera={3} cameraSide={2} color={context.camera === 3 && context.cameraSide === 2 ? 'black' : 'white'} />
            <Dot camera={3} cameraSide={3} color={context.camera === 3 && context.cameraSide === 3 ? 'black' : 'white'} />
            <Dot camera={3} cameraSide={4} color={context.camera === 3 && context.cameraSide === 4 ? 'black' : 'white'} />
            <Dot camera={4} cameraSide={1} color={context.camera === 4 && context.cameraSide === 1 ? 'black' : 'white'} />


            {/* <Button colorScheme='blue' m='.1em' onClick={() => context.setCamera(1)}>POS1</Button>
          <Button colorScheme='blue' m='.1em' onClick={() => context.setCamera(2)}>POS2</Button>
          <Button colorScheme='blue' m='.1em' onClick={() => context.setCamera(3)}>POS3</Button>
          <Button colorScheme='blue' m='.1em' onClick={() => context.setCamera(4)}>POS4</Button> */}
          </Flex>
      )}

    </>
  )
}


