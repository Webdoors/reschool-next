import './overlay.css'
const Overlay: React.FC<{overlayClicked: ()=>void, show?: boolean}> = (props)=>{
    return <div onClick={props.overlayClicked} className={`overlay ${!props.show? 'overlay_hide': ''}`}></div>
}

export default Overlay