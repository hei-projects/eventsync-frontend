"use client"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Card, CardContent } from "../ui/card"

type Props = {
    className?: string
    onSubmit?: (data: { question: string, name?: string }) => void
}

export const QuestionInput = ({ className, onSubmit }: Props) => {
    return <form className={cn("w-full", className)} onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const question = formData.get('question') as string
        const name = formData.get('name') as string | undefined
        if (onSubmit) {
            onSubmit({ question, name })
        }
    }}>
        <Card>
            <CardContent className="space-y-4">
                <Input type="text" name="name" placeholder="Enter your name (optional)" className="max-w-96" />
                <Textarea name="question" placeholder="Enter your question..." />
                <Button type="submit">Submit</Button>
            </CardContent>
        </Card>
    </form>
}