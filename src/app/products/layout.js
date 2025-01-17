import React from 'react'
import Footer from '../components/layout/Footer'

const layout = ({children}) => {
  return (
    <>
    {children}
    <Footer />
    </>
  )
}

export default layout