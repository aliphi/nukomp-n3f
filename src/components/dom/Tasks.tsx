import { Flex, Image, Stack, Tooltip } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { Message_data } from "../../context/context";

import Pulse from "@/components/dom/pulse/Pulse";

export default function Tasks(visible) {
  const context = useContext(Message_data);

  const [page, setPage] = useState(1);

  const changePage = async (e: any) => {
    e.StopPropagation;
    if (page > 1 && e === -1) {
      setPage(page - 1);
    } else if (page < 20 && e === 1) {
      setPage(page + 1);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const isUp = event.key === "ArrowUp";
    const isDown = event.key === "ArrowDown";

    const isLeft = event.key === "ArrowLeft";
    const isRight = event.key === "ArrowRight";

    if (isUp && page > 1) {
      setPage(page - 1);
    }

    if (isDown && page < 4) {
      setPage(page + 1);
    }

    if (isLeft && page > 1) {
      setPage(page - 1);
    }

    if (isRight && page < 4) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    visible.visible === 0 && window.addEventListener("keydown", handleKeyDown);
    return () => {
      visible.visible === 0 &&
        window.removeEventListener("keydown", handleKeyDown);
    };
  }, [page, visible.visible]);

  useEffect(() => {
    context.setCamera(page);
  }, [page]);

  useEffect(() => {
    context.camera !== page && setPage(context.camera);
  }, [context.camera]);

  return (
    <>
      {visible.visible === 0 && (
        <Tooltip
          placement="top"
          hasArrow
          bg="grey"
          label={context.camera === 1 ? "Click, Scroll or use Arrow Keys" : ""}
        >
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
      bottom='4em'
      right='2em'
      p='1em'
      minH='9em'
      direction='column'
      textAlign='center'
      justifyContent='flex-end'
      alignItems='center'
      pointerEvents='all'
      boxShadow='0 0 8px rgba(0, 0, 0, 0.3)'
      zIndex={1500}
      borderRadius='50px'
          >
            {context.camera > 1 && (
              <Image
                src="/IconArrow.svg"
                maxH='1.5em'
                maxW='1.5em'
                minH='1.5em'
                minW='1.5em'
                alt="Arrow Up"
                m="1em"
                transform="rotate(90deg)"
                cursor="pointer"
                onClick={() => changePage(-1)}
              />
            )}

            {context.camera < 4 ? (
              <Image
                src="/IconArrow.svg"
                maxH='1.5em'
                maxW='1.5em'
                minH='1.5em'
                minW='1.5em'
                alt="Arrow Down"
                m="1em"
                transform="rotate(-90deg)"
                cursor="pointer"
                onClick={() => changePage(1)}
              />
            ) : (
              <Image
                src="/IconArrow.svg"
                maxH='1.5em'
                maxW='1.5em'
                minH='1.5em'
                minW='1.5em'
                alt="Arrow Down"
                m="1em"
                transform="rotate(-90deg)"
                pointerEvents={"none"}
                opacity={"0"}
              />
            )}

            {context.camera === 1 && (
              <Flex w='3.5em' h='3.5em' position="absolute" pointerEvents="none">
                <Pulse />
              </Flex>
            )}
          </Flex>
        </Tooltip>
      )}
    </>
  );
}
