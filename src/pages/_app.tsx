import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Context from '../context/context'
import Header from '@/config'
import Layout from '@/components/dom/Layout'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import Fonts from '@/components/Fonts'
import { extendTheme } from '@chakra-ui/react'
import customTheme from '../../utils/theme'
import 'regenerator-runtime/runtime'


const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true })

export default function App({ Component, pageProps = { title: 'index' } }) {
  const ref = useRef()

  return (
    <>
      <ChakraProvider theme={customTheme}>
        <Fonts />

        <Header title={pageProps.title} />
        <Context>
          <Layout ref={ref}>
            <Scene {...pageProps}  eventSource={ref} eventPrefix='client' />

            <Component {...pageProps} />
          </Layout>{' '}
        </Context>
      </ChakraProvider>
    </>
  )
}
