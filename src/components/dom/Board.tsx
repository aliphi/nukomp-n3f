import { Flex } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useContext } from 'react'
import { Message_data } from '../../context/context'

export default function Tasks() {
  const context = useContext(Message_data)


  return (
    <>
      <Flex
        fontSize='0.5em'
        flexDirection='column'
        w='40em'
        maxW='15em'
        maxH='max-content'
        position='fixed'
        top='2em'
        left='2em'
        zIndex={1500}
        p='1em'>
        <Button colorScheme='blue' m='.1em' onClick={() => context.setCamera(1)}>POS1</Button>
        <Button colorScheme='blue' m='.1em' onClick={() => context.setCamera(2)}>POS2</Button>
        <Button colorScheme='blue' m='.1em' onClick={() => context.setCamera(3)}>POS3</Button>
        <Button colorScheme='blue' m='.1em' onClick={() => context.setCamera(4)}>POS4</Button>
      </Flex>
    </>
  )
}
