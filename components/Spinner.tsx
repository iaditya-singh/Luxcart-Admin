import React from 'react'
import {FadeLoader} from 'react-spinners'

type Props = {
  className?: string; 
  size? : number;
  color?: string;
};


const Spinner = (props: Props) => {
  const { className,size,color } = props;

  return (
    <FadeLoader color={color || '#36d7b7'} className={className}/>
  )
}

export default Spinner