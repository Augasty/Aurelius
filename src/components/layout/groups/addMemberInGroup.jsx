import React from 'react'
import { useNavigate } from 'react-router-dom';

const AddMemberInGroup = ({group}) => {

    const history = useNavigate();

    if (!group){
        history("/")
    }
  return (
    <div>Aadd member in </div>
  )
}

export default AddMemberInGroup