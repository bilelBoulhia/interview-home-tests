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
    const [sections,setSections] = useState<string[]>([]);
    useEffect(()=>{
        const sections = pathname.split('/').filter(Boolean);
        setSections(["acceuil",...sections])
    },[pathname])

    return (
        <div className="bg-gradient-to-r from-slate-100 to-slate-200 border-b border-slate-200">
            <Breadcrumb className="mx-auto py-4  sm:px-6">
                <BreadcrumbList className="flex items-center space-x-1 text-sm">
                    {sections.map((section, i) => (
                        <React.Fragment key={i}>
                            <BreadcrumbItem className="overflow-hidden text-ellipsis whitespace-nowrap">
                                <BreadcrumbLink
                                    href={i === 0 ? "/" : `/${sections.slice(1, i + 1).join("/")}`}
                                    className={`
                    hover:text-[var(--bea-dark-blue)] transition-colors duration-200
                    ${
                                        i === sections.length - 1
                                            ? "font-semibold text-[var(--bea-dark-blue)]"
                                            : "text-slate-600 font-medium"
                                    }
                  `}
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
