import {useCredentials} from "@/app/_hooks/useCredentials";
import {toast} from "sonner";
import {useRouter} from "next/navigation";



export const useAuth=()=> {
    const {credentials, addCredentials, removeCredentials, setCredentials} = useCredentials();
    const router = useRouter();



    const login = async (username, password) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const err = await res.text();
                toast.error(err);
                return;
            }

            const data = await res.text();
            addCredentials(JSON.parse(data));

            router.push('/products');
            toast.success('signed in');

        } catch (err) {
            toast.error('un erreur a ete etabalir');
        }
    };




    const logout = () => {
        removeCredentials();
        router.push('/');
        toast.dismiss('logged out');
    };


    return {credentials,login,logout,setCredentials}
}


