"use client"

import Link from "next/link"
import { useState } from "react"
import {
    ChartNoAxesGantt,
    DeleteIcon,
    EditIcon,
    Menu,
    NewspaperIcon,
    PlusCircleIcon,
    PlusIcon,
    User2Icon,
    X
} from "lucide-react"
import {Avatar, AvatarFallback} from "@/app/_components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/app/_components/ui/dropdown-menu";
import {DropdownMenuSeparator} from "@radix-ui/react-dropdown-menu";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-[var(--color-border)] bg-[var(--color-background)]/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex-shrink-0">
                        <Link
                            href="/products"
                            className="text-xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent"
                        >
                            demo app
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="flex items-center space-x-1">
                        <div

                            className="ml-2 px-1 py-1 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white hover:shadow-lg transition-all duration-300"
                        >
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarFallback><User2Icon/></AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem><a href='/management' className='inline-flex gap-2 '><ChartNoAxesGantt/> Management </a></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </div>
                    </div>


                </div>


            </div>
        </nav>
    )
}
