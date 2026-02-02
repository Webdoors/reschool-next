import { useEffect, useState } from 'react';
const EmptyState:React.FC<{message: string, emptyComponentLoaded?: ()=>void}> =(props) =>{
    const [show, setShow] = useState(false)
    useEffect(()=>{
        if(props.emptyComponentLoaded){
            props.emptyComponentLoaded()
        }
   
    },[])
    return (
        
        <h5  className="wow  animated py-xl-5 text-white empty-comp" style={{visibility: "visible", padding: '100px 0', textAlign: 'center', margin: '0'}}> {props.message}</h5>
    )
} 

export default EmptyState