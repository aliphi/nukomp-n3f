import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";

import Drag from "@/components/dom/AnimationDrag";

export default function Tasks(visible) {
  useEffect(() => { }, []);

  return (
    <>
      {visible.visible && (
        <Flex
          fontSize={{
            base: "1em",
            sm: ".6em",
            md: ".7em",
            lg: ".8em",
            xl: ".9em",
            "2xl": "1em",
            "3xl": "1em",
          }}
          position="fixed"
          minH="100%"
          w="100%"
          direction="column"
          alignItems={"center"}
          justifyContent={"center"}
          justifyItems={"center"}
          alignContent={"center"}
          pointerEvents="all"
          zIndex={2000}
          bg={'rgba(277,277,277,0.4)'}
          filter= 'grayscale(100%)'
        >
          <Flex w="30vh" h="30vh" pointerEvents="none" mb='40vh'>
            <Drag play={undefined} click={undefined} />
          </Flex>
        </Flex>
      )}
    </>
  );
}
