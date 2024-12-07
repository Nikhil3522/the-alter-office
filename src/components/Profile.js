import { useState } from 'react';
import backIcon from '../assets/icons/back.png';
import ProfileInfo from './ProfileInfo';
import EditProfileInfo from './EditProfileInfo';
import EditIcon from '../assets/icons/edit.png';

function Profile(){
    const [step, setStep] = useState(1);

    const backBtnFunction = () => {
        if(step === 2){
            setStep(1);
            return;
        }
    }
    return(
        <div className="container relative">
            <div>
                <div className='absolute flex mt-[25px] ml-[16px]'>
                    <button onClick={backBtnFunction}><img className="w-[32px] " src={backIcon}/></button>
                    {step === 2 &&
                    <p className='text-[20px] font-semibold text-white ml-[15px]'>Edit Profile</p>
                    }
                </div>
                <img 
                    class="max-h-[189px] w-full object-cover rounded-b-[20px]"
                    src="https://plus.unsplash.com/premium_photo-1671987552220-973918c6f3dc?q=80&w=1906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                {/* cover image edit icon */}
                {step === 2 &&
                <img
                    className="w-[25px] bg-[#c2c2c2] absolute right-[13px] -mt-[36px] p-[5px] rounded-[15px]"
                    src={EditIcon}
                />}
            </div>
            <div className='flex relative px-4 -mt-[60px]'>
                <img 
                    class="h-[112px] w-[112px] object-cover rounded-full" 
                    src="https://ca-times.brightspotcdn.com/dims4/default/48ac18e/2147483647/strip/true/crop/4718x3604+0+0/resize/1200x917!/format/webp/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Ffd%2F21%2F3491434e446c83711360a43f6978%2Fla-photos-1staff-471763-en-ana-de-armas-mjc-09.jpg"
                />
                {/* profile image edit icon */}
                {step === 2 &&
                <img
                    className="w-[25px] bg-[#c2c2c2] absolute mt-[73px] ml-[90px] p-[5px] rounded-[15px]"
                    src={EditIcon}
                />}
                {step === 1 &&
                <button onClick={() => setStep(2)} className='edit-profile mt-[auto]'>Edit Profile</button>
                }
            </div>
            {step === 1 ? <ProfileInfo /> : <EditProfileInfo />}

            {step === 2 &&
                <div className='w-full absolute bottom-[40px] px-4'>
                    <button className="w-full bg-black text-white h-[48px] rounded-[36px]">SAVE</button>
                </div>
            }

        </div>
    )
}

export default Profile;


