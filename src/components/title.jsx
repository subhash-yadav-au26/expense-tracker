import React from 'react'

const Title = ({title}) => {
  return (  
    <p className='text-2xl 2xl:text-3xl font-semibold text-gray-600 dark:text-gray-500 mb-5'>
        {title}
    </p>
  )
}

export default Title