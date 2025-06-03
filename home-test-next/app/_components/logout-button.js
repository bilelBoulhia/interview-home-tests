'use client'
import {Button} from "@/app/_components/ui/button";
import {useAuth} from "@/app/_hooks/useAuth";
import {LogOutIcon} from "lucide-react";

export default function LogoutButton(){
    const {logout} = useAuth();
    const handleLogout = async ()=>{
        logout();
    }
    return(
        <div>
            <Button
                className={'fixed bottom-0 right-0 mb-4 mr-4 z-500'}
                onClick={handleLogout}
            >
                <LogOutIcon/>
            </Button>
        </div>
    )
}
