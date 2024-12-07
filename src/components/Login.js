import googleLogo from '../assets/icons/google-logo.png';
import { signInWithGooglePopup } from '../firebase.utils';

function Login(){

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    }

    return (
        <div className="container relative">
            <div className="bg-red-500 h-[300px] pt-[50px] rounded-t-[50px] absolute bottom-0 left-0 right-0 justify-items-center">
                <h3>Vibesnap</h3>
                <h5>Moments That Matter, Shared Forever.</h5>
                <button onClick={logGoogleUser} className="bg-black text-white px-5 py-2.5 rounded-full flex gap-x-2">
                    <img src={googleLogo} className="h-6" />Continue with Google
                </button>
            </div>
        </div>

    )
}

export default Login;