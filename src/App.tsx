import * as React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

interface IAppProps{

}

const App:React.FC<IAppProps> = () =>{
  return(
    <RouterProvider router={router} />
     
    
  )
}

export default App