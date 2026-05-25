"use client"

import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { ChevronLeft } from 'lucide-react'

export const BackButton = () => {
    const router = useRouter()
  return (
    <Button onClick={() => router.back()} variant="ghost" className='cursor-pointer rounded-none px-1'>
        <ChevronLeft size={48}/>
        Return
    </Button>
  )
}
