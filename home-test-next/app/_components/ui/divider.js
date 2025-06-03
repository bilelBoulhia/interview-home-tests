export default function Divider(){

    return (
        <div className="hidden lg:block w-[2px] min-h-screen relative">
            <div
                className="absolute inset-0 w-full h-[98%] top-[1%] clip-path-diamond bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)]"
                style={{
                    clipPath: 'polygon(50% 0%, 100% 2%, 100% 98%, 50% 100%, 0% 98%, 0% 2%)'
                }}
            />
            <div
                className="absolute inset-0 w-full h-[98%] top-[1%] blur-sm bg-gradient-to-b from-yellow-200/50 via-amber-400/50 to-yellow-200/50"
                style={{
                    clipPath: 'polygon(50% 0%, 100% 2%, 100% 98%, 50% 100%, 0% 98%, 0% 2%)'
                }}
            />
            <div
                className="absolute inset-0 w-full h-[98%] top-[1%] animate-pulse bg-gradient-to-b from-yellow-100/30 via-amber-300/30 to-yellow-100/30"
                style={{
                    clipPath: 'polygon(50% 0%, 100% 2%, 100% 98%, 50% 100%, 0% 98%, 0% 2%)'
                }}
            />
        </div>
    )
}
