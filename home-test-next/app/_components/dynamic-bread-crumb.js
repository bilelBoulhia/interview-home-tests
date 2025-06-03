import {usePathname} from "next/navigation";
import React, {useEffect, useState} from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/app/_components/ui/bread-crumbs";
import {ChevronRight} from "lucide-react";




export const DynamicBreadCrumb =()=>{
    const pathname = usePathname();
    const [sections,setSections] = useState([]);
    useEffect(()=>{
        const sections = pathname.split('/').filter(Boolean);
        setSections([...sections])
    },[pathname])

    return (
        <div className="bg-[var(--color-background)] border-b-1 border-[var(--color-primary)]/30 py-1 px-4">
            <Breadcrumb className="mx-auto py-4  sm:px-6">
                <BreadcrumbList className="flex items-center space-x-1 text-sm">
                    {sections.map((section, i) => (
                        <React.Fragment key={i}>
                            {i === 0 && (
                            <BreadcrumbSeparator>
                                <ChevronRight className="h-4 w-4 text-slate-400"/>
                            </BreadcrumbSeparator>
                            )}
                            <BreadcrumbItem key={`i-${i}`} className="overflow-hidden text-ellipsis whitespace-nowrap">
                                <BreadcrumbLink
                                    href={i === 0 ? "/" : `/${sections.slice(1, i + 1).join("/")}`}
                                    className={`hover:text-[var(--color-secondary)]  transition-colors duration-200${
                                        i === sections.length - 1
                                            ? "font-semibold text-[var(--color-primary)]"
                                            : "text-[var(--color-secondary)] font-medium"
                                    }`}
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {i < sections.length - 1 && (
                                <BreadcrumbSeparator>
                                    <ChevronRight className="h-4 w-4 text-slate-400"/>
                                </BreadcrumbSeparator>
                            )}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}
