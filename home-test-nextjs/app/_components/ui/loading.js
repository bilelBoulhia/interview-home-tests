import {Loader2} from "lucide-react";

export default function Loading(){
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-[var(--color-primary)] mx-auto mb-4"/>
                <p className="text-[var(--color-muted)] text-lg">Loading products...</p>
            </div>
        </div>
    )
}
