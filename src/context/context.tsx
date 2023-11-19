import { createContext, useState, useEffect } from 'react'

export const Message_data = createContext(null)

function Context({ children }) {

  const [camera, setCamera] = useState(1)
  const [cameraSide, setCameraside] = useState(1)
  const [project, setProject] = useState(0)
  
  useEffect(() => {
    camera !== 3 && setCameraside(1)
  }, [camera])

  return (
    <Message_data.Provider
      value={{
        camera,
        setCamera,
        cameraSide,
        setCameraside,
        project,
        setProject
      }}>
      {children}
    </Message_data.Provider>
  )
}

export default Context
