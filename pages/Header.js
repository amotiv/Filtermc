import {SearchCircleIcon} from '@heroicons/react/solid'
import Link from 'next/link';
import {SearchIcon} from '@heroicons/react/solid'
import {auth} from 'firebase/auth'
import {useSelector} from "react-redux"
import {selectUser} from "../reducers/userSlice"
import { useRouter } from 'next/router';
function Header() {
    const router = useRouter();
    const user = useSelector(selectUser);   
    const handleAuthenticaton = () => {
        if (user) {
          auth.signOut();
        }
      };
    return (
        //Start of Header Flex 
        <div className="flex flex-row w-full justify-evenly h-20 bg-white text-lg text-blue-600 font-bold">
            
            <div className="flex text-2xl my-auto">
                <Link href="/">
                FilterMC
                </Link>
            </div>
            <div className="flex my-auto">
                <Link href="/">
                Home
                </Link>
            </div>
            <div className="flex my-auto">
                My Server
            </div>
            <div className="flex my-auto">
                Sponsor
            </div>
            <div className="flex my-auto">
            <button className="flex text-blue-600 font-bold" type="button" onClick={() => router.push('/SendServer')}>
                <span>{user ? "AddServer" : ""}</span>
                </button>
            </div>
            <div className="flex text-black mx-8 h-6 sm:w-1/5 md:w-1/4 lg:w-1/2 my-auto">
                <SearchIcon/>
                <input placeholder="" type="text" />
            </div>
            <div className="flex my-auto">
                <button className="flex text-blue-600 font-bold" type="button" onClick={() => router.push('/Login')}>
                {user ? "Sign Out" : "Login"}
                </button>
            </div>
        </div>
        
    )
}

export default Header;
