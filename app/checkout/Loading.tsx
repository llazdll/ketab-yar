import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-screen p-4">
    <div className="space-y-8">
        <Skeleton className="h-12 w-1/2" />
        {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-10 w-full" />
            </div>
        ))}
        <Skeleton className="h-10 w-full" />
    </div>
    <div className="space-y-4">
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
    </div>
</div>
  )
}

export default Loading