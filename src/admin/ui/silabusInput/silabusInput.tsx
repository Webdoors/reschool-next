import React, { useRef, useState } from "react"
import { RiCloseLine } from "react-icons/ri"
import { PropsFn } from "../../../models/propsFn"




export const SilabusInput:React.FC<{name: string, data: any[], deleteItem: <T extends { coordinates: [number, number, number]}>(data: T)=>void,addItem: <T extends {name:string, addedSilabusItem: string, coordinates: [number, number]}>(data: T)=>void, index: number, secIndex: number}> = (props)=>{

        const nameRef = useRef<HTMLInputElement | null>(null)
        const [name, setName]= useState(props.name)
        const silabusItem =useRef<HTMLInputElement | null>(null)

        const inputParrentClickedHandler = (e: any )=>{
            const inputElement =e?.target?.children[e?.target?.children.length-1]
            if(inputElement){
              inputElement?.focus()
             
            }
           
          }
          const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>)=> {
            setName(e?.target?.value)
        }
        
          const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> ) =>{
            e.stopPropagation()
        
            if (e.key === 'Enter') {
                
                props.addItem({
                    name: nameRef.current?.value || '',
                    addedSilabusItem: silabusItem?.current?.value || '',
                    coordinates: [props.index, props.secIndex]
                  })
          
            }
          
          }

        const deleteHandler = (itemIndex: number)=>{
            props.deleteItem({
                coordinates: [props.index, props.secIndex , itemIndex]
            })
        }

    return  <div  className="col-md-6" style={{marginBottom: '10px'}}>

    <input ref={nameRef} onChange={nameChangeHandler} className='input-tags width_100' value={name}  placeholder={props.name}/>
       
         <div onClick={inputParrentClickedHandler} className="bootstrap-tagsinput  "style={{width: '100%', marginTop: '10px'}}>

           {
             props.data?.map((name: any, index: number)=>{
               return  <span key={name + 23232 + index} className="tag label label-info">{name}  <RiCloseLine onClick={(()=> deleteHandler(index))}  style={{cursor: 'pointer'}} size={'20px'}/><span 

               data-role="remove"></span></span> 
             })
           }
      
             <input className='input-tags' ref={silabusItem} onKeyDown={handleKeyDown } type="text" placeholder=""/></div>
       </div>
}



export default SilabusInput