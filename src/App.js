import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainNavigation from './components/MainNavigation'

const App = () => {
  return (
    // <ThemeProvider theme={""}>
      <BrowserRouter>
      <MainNavigation />
      <center><h1>Click on Any of the above links</h1></center>
      </BrowserRouter>
    // </ThemeProvider>
  )
}

export default App