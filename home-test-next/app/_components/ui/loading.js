import {Loader2} from "lucide-react";

export default function Loading(){
    return (
        <div className='absolute left-1/2 top-1/2 -translate-1/2 '>
            <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-[var(--color-primary)] mx-auto mb-4"/>
            </div>
        </div>


    )
}
