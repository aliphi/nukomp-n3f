import Head from 'next/head'
import Script from 'next/script'
import { Flex, Image, Text } from '@chakra-ui/react'
import { useRef, forwardRef, useImperativeHandle, useEffect, useState } from 'react'


import styles from './Layout.module.scss'

import { IframeHTMLAttributes } from 'react'

interface Props {
  children: React.ReactNode
}

declare global {
  interface Window {
    dataLayer: any
  }
}

interface ExtendedIframeHTMLAttributes extends IframeHTMLAttributes<HTMLIFrameElement> {
  display?: string
  visibility?: string
}

function MyIframe(props: ExtendedIframeHTMLAttributes) {
  return <iframe {...props} />
}

const Layout = forwardRef(({ children }: Props, ref) => {
  const localRef = useRef()

  useImperativeHandle(ref, () => localRef.current)

  const [device, setDevice] = useState(false)
  const [orientation, setOrientation] = useState(false)

  useEffect(() => {
    //HEIGHT FIXE FOR PHONES
    if (/webOS|Android|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      setDevice(true)

      window.orientation !== 0 && setOrientation(true)
    }
    //HEIGHT FIXE FOR PHONES
  }, [])

  useEffect(() => {
    function resetOrientation() {
      if (!orientation) {
        location.reload()
      }
    }
    window.addEventListener('orientationchange', resetOrientation)
    return () => window.removeEventListener('orientationchange', resetOrientation)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orientation])

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
      </Head>
      {/* <Script
        id='GTM'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NMRDNTK');`,
        }}></Script> */}

      {/* <noscript>
        <MyIframe
          src='https://www.googletagmanager.com/ns.html?id=GTM-NMRDNTK'
          height='0'
          width='0'
          display='none'
          visibility='hidden'
        />
      </noscript> */}

      <Flex
        ref={localRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 99,
          w: '100vw',
          height: 'calc(var(--vh, 1vh) * 100)',
          overflow: 'hidden',
        }}
        >
     

        {/* {device && ( */}
          <div className={styles.blocker}>
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              gap='10vh'
              fontSize={{
                base: '1em',
                sm: '.7em',
                md: '1em',
                lg: '1em',
                xl: '1em',
                '2xl': '1em',
                '3xl': '1em',
              }}>
              <Text fontFamily='GoogleSansBold' fontSize='1.5em' m='5vh 0 3vh 0' textAlign='center'>
                Not ready for portrait yet!<br></br>
                Please, try a Desktop in Landscape.
              </Text>
            </Flex>
          </div>
        {/* )} */}
        {children}
      </Flex>
    </>
  )
})
Layout.displayName = 'Layout'

export default Layout
