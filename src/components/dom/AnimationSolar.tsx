import Lottie from "react-lottie-player";
import * as animation from "../../animation/animation.json";
import { Flex, Tooltip } from "@chakra-ui/react";

interface lottie {
  play: any;
  click: any;
}
export default function LottiePlayer(props: lottie) {
  return (
    <Tooltip placement="top" hasArrow bg="grey" label="Back to the Main View">
      <Flex filter="grayscale(100%)" maxW="5em" maxH="5em">
        <Lottie
          // @ts-ignore
          loop={true} autoPlay={true} animationData={animation} play={true}
        />
      </Flex>
    </Tooltip>
  );
}
