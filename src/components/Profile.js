import backIcon from '../assets/icons/back.png';

function Profile(){
    return(
        <div className="container">
            <div>
                {/* <button> */}
                    <img class="absolute w-[32px] mt-[25px] ml-[16px]" src={backIcon}/>
                {/* </button> */}
                <img 
                    class="max-h-[189px] w-full object-cover rounded-b-[20px]"
                    src="https://plus.unsplash.com/premium_photo-1671987552220-973918c6f3dc?q=80&w=1906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
            </div>
            <div className='flex relative px-4 -mt-[60px]'>
                <img 
                    class="h-[112px] w-[112px] object-cover rounded-full" 
                    src="https://ca-times.brightspotcdn.com/dims4/default/48ac18e/2147483647/strip/true/crop/4718x3604+0+0/resize/1200x917!/format/webp/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Ffd%2F21%2F3491434e446c83711360a43f6978%2Fla-photos-1staff-471763-en-ana-de-armas-mjc-09.jpg"
                />
                <button className='edit-profile mt-[auto]'>Edit Profile</button>
            </div>
        </div>
    )
}

export default Profile;


