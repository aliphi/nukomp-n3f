/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useContext } from 'react'
import { Message_data } from '../context/context'

export default function Dictaphone(props) {
  const context = useContext(Message_data)
  const message = context.message

  //// auto reset

  // useEffect(() => {
  //   message.commandCoffeeshop.active &&
  //     setTimeout(() => {
  //       context.setMessage({
  //         ...message,
  //         current: '',
  //         commandCoffeeshop: {
  //           active: false,
  //           played: message.commandCoffeeshop.played,
  //           level: 1,
  //           depends: 'commandLightsOff',
  //         },
  //       })
  //     }, 2000)
  // }, [message.commandCoffeeshop.active])

  useEffect(() => {
    message.commandText.active &&
      setTimeout(() => {
        context.setMessage({
          ...message,
          current: '',
          commandText: { active: false, played: message.commandText.played, level: 4, depends: 'commandHome' },
        })
      }, 5000)
  }, [message.commandText.active])

  useEffect(() => {
    message.commandETA.active &&
      setTimeout(() => {
        context.setMessage({
          ...message,
          current: '',
          commandETA: { active: false, played: message.commandETA.played, level: 4, depends: 'commandText' },
        })
      }, 3000)
  }, [message.commandETA.active])

  useEffect(() => {
    message.commandHome.active &&
      setTimeout(() => {
        context.setMessage({
          ...message,
          current: '',
          commandHome: { active: false, played: true, level: 3, depends: 'commandCoffeeshop' },
        })
      }, 1000)
  }, [message.commandHome.active])

  useEffect(() => {
    message.commandLightsOn.active &&
      setTimeout(() => {
        context.setMessage({
          ...message,
          current: '',
          commandLightsOn: {
            active: false,
            played: message.commandLightsOn.played,
            level: 2,
            depends: 'commandLightsOff',
          },
        })
      }, 4000)
  }, [message.commandLightsOn.active])

  useEffect(() => {
    message.commandLightsOff.active &&
      setTimeout(() => {
        context.setMessage({
          ...message,
          current: '',
          commandLightsOff: { active: false, played: message.commandLightsOff.played, level: 1, depends: '0' },
        })
      }, 4000)
  }, [message.commandLightsOff.active])

  useEffect(() => {
    message.commandSeatOn.active &&
      setTimeout(() => {
        context.setMessage({
          ...message,
          current: '',
          commandSeatOn: { active: false, played: message.commandSeatOn.played, level: 2, depends: '0' },
        })
      }, 4000)
  }, [message.commandSeatOn.active])

  useEffect(() => {
    message.commandSeatOff.active &&
      setTimeout(() => {
        context.setMessage({
          ...message,
          current: '',
          commandSeatOff: {
            active: false,
            played: message.commandSeatOff.played,
            level: 2,
            depends: 'commandSeatOn',
          },
        })
      }, 4000)
  }, [message.commandSeatOff.active])

  useEffect(() => {
    message.commandTemp.active &&
      setTimeout(() => {
        context.setMessage({
          ...message,
          current: '',
          commandTemp: { active: false, played: true, level: 4, depends: '0' },
        })
      }, 4000)
  }, [message.commandTemp.active])

  useEffect(() => {
    message.commandDefrosterOn.active &&
      setTimeout(() => {
        context.setMessage({
          ...message,
          current: '',
          commandDefrosterOn: { active: false, played: message.commandDefrosterOn.played, level: 4, depends: '0' },
        })
      }, 4000)
  }, [message.commandDefrosterOn.active])

  //// auto reset

  return <></>
}
