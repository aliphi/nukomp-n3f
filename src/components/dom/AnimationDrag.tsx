import Lottie from 'react-lottie-player'
import * as drag from '../../animation/drag.json'
import { Flex, Image,Text,Tooltip } from '@chakra-ui/react'


interface lottie {
  play: any
  click: any
}
export default function LottiePlayer(props: lottie) {
  return (
<>
      <Lottie
        // @ts-ignore
        loop={true} autoPlay={true} animationData={drag} play={true} />
</>

  )
}
