'use client'
import {Button} from "@/app/_components/ui/button";
import {useAuth} from "@/app/_hooks/useAuth";

export default function LogoutButton(){
    const {logout} = useAuth();
    const handleLogout = async ()=>{
        logout();
    }
    return(
        <div>
            <Button
                onClick={handleLogout}
            >
                Logout
            </Button>
        </div>
    )
}
