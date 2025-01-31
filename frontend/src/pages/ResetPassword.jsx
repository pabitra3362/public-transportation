import React from 'react'
import { useParams,useLocation } from 'react-router-dom'

const ResetPassword = () => {

    const { role } = useParams();
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search)
    const id = queryParam.get('id')
    console.log(role,id);
    
  return (
    <div>
      hello
    </div>
  )
}

export default ResetPassword
