import React from 'react'

function Container({children}) { //Aqui agrupará todas as PAGINAS dentro de MAIN como children
  return (
    <main className='container'>
        {children}
    </main>
  )
}

export default Container