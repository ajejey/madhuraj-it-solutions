import Footer from '@/app/components/layout/Footer'
import React from 'react'

const layout = ({children}) => {
  return (
    <>
    {children}
    <Footer />
    </>
  )
}

export default layout