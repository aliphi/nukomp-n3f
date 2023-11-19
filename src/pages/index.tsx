import { useState, useRef, useEffect } from "react";
import {
  Flex,
  Text,
  Image,
  Stack,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AspectRatio,
} from "@chakra-ui/react";
import { Fade, ScaleFade, Collapse } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { Message_data } from "../context/context";

// @ts-ignore
import Typewriter from "typewriter-effect";

// @ts-ignore
import Immersive from "@/components/dom/Animation";
import Solar from "@/components/dom/AnimationSolar";

import Navigation from "@/components/dom/Navigation";

import Tasks from "@/components/dom/Tasks";
import Modal from "@/components/dom/Modal";

export default function Scene({ ...props }) {
  // const [pointerDown, setPointerDown] = useState(false);
  // const [cameraDirection, setCameraDirection] = useState([0, 0]);
  // const [loader, setLoader] = useState(true);

  const loaderRed = useRef();

  const [popup, setPopup] = useState(0);
  const [project, setProject] = useState(0);

  const context = useContext(Message_data);

  const [modal, setModal] = useState({ state: false, played: false });

  // const [fov, setFov] = useState(35)

  // useEffect(() => {
  // device ? setFov(45) : setFov(62)
  // }, [device])

  // useEffect(() => {
  //   context.camera === 3 &&
  //     (setModal(true),
  //     setTimeout(() => {
  //       setModal(false);
  //     }, 300));
  // }, [context.camera, modal]);

  function HandleProject(e) {
    e !== 0
      ? (setPopup(1),
        setTimeout(() => {
          setProject(e);
        }, 100))
      : (setProject(0),
        setTimeout(() => {
          setPopup(0);
        }, 100));
  }

  useEffect(() => {
    document.addEventListener(
      "click",
      function () {
        modal.played &&
          setModal({
            ...modal,
            state: false,
            played: true,
          });
      },
      false
    );
  }, [modal.played]);

  ////////////// SCROLL BEHAVIOUR

  useEffect(() => {
    var clientHeight = document.documentElement.clientHeight;
    context.camera === 1 && window.scrollTo(0, 0);
    context.camera === 2 && window.scrollTo(0, clientHeight);
    context.camera === 3 && window.scrollTo(0, clientHeight * 2);
    context.camera === 4 && window.scrollTo(0, clientHeight * 3);
    // context.camera === 1 && window.scrollTo({ top: 0, left: 0, behavior: "smooth"});
    // context.camera === 2 && window.scrollTo({ top: clientHeight, left: 0, behavior: "smooth"});
    // context.camera === 3 && window.scrollTo({ top: clientHeight*2, left: 0, behavior: "smooth"});
    // context.camera === 4 && window.scrollTo({ top: clientHeight*3, left: 0, behavior: "smooth"});

    context.camera === 3 &&
      modal.played === false &&
      setModal({
        ...modal,
        state: true,
        played: true,
      });

    context.camera !== 3 &&
      setModal({
        ...modal,
        state: false,
        played: modal.played,
      });
  }, [context.camera]);

  useEffect(() => {
    document.addEventListener(
      "scroll",
      function () {
        var scrollTop = document.documentElement.scrollTop;
        // var offerHeight = document.documentElement.offsetHeight;
        var clientHeight = document.documentElement.clientHeight;
        context.setCamera(Math.round(scrollTop / clientHeight) + 1);
      },
      false
    );
  });

  useEffect(() => {
    project === 0
      ? (document.documentElement.style.overflowY = "scroll")
      : (document.documentElement.style.overflowY = "hidden");
  }, [project]);

  ////////////// SCROLL BEHAVIOUR

  useEffect(() => {
    //HEIGHT FIXE FOR PHONES
    if (
      /webOS|Android|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    //HEIGHT FIXE FOR PHONES
  }, []);

  return (
    <>
      <Tasks visible={popup} />
      <Navigation visible={0} />
      <Modal visible={modal.state} />


    </>
  );
}
