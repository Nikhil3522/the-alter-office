import Loader from '../assets/Iphone-spinner-2.gif';

function LoaderComp(){
    return (
        <div className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]">
            <img src={Loader}/>
        </div>
    )
}

export default LoaderComp;