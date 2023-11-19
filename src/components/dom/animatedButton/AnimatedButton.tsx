import styles from './AnimatedButton.module.scss'
import { Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function AnimatedButton(props) {
  const [command, setCommand] = useState('')

  useEffect(() => {
    props.active &&
      setTimeout(() => {
        setCommand("Got it! Let's go.")
      }, 8000)
  }, [props.active])

  function handleClick() {
    props.click(true)
  }
  return (
    <Button
      className={styles.animatedButton}
      fontFamily='GoogleSansRegular'
      fontSize='1.5em'
      letterSpacing='-0.02em'
      bg='gray'
      minW='20em'
      p='1.5em 2.2em 1.5em 2.2em'
      onClick={handleClick}
      pointerEvents={command !== '' ? 'all' : 'none'}>
      <div className={props.active ? styles.off : styles.on}></div>
      {command}
    </Button>
  )
}
