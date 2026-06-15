"use client"

import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { ChevronLeft } from 'lucide-react'

export const BackButton = () => {
    const router = useRouter()
  return (
    <Button onClick={() => router.back()} 
    variant="ghost" 
    className=' cursor-pointer px-1 w-[126px] h-[48px] mb-8 bg-[#6D53CA] rounded-2xl text-white font-bold shadow-lg hover:bg-[#5a44b0] transition-all duration-200'>
        <ChevronLeft
         size={48}
         className='font-bold'/>
        <span className="font-medium text-lg">Return</span>
    </Button>
  )
}
