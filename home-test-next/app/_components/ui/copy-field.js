'use client'

import { useState } from "react"
import { Copy } from "lucide-react"
import { Button } from "@/app/_components/ui/button"

export function CopyField({ label, value }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="flex items-center justify-between gap-2">
            <span>
                <strong className="text-white">{label}:</strong> {value}
            </span>
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleCopy}
            >
                <Copy className="w-4 h-4 mr-1" />
                {copied ? "Copied!" : "Copy"}
            </Button>
        </div>
    )
}
