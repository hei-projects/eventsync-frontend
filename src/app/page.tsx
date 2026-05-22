import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"


export default function HomePage() {
    return <div className="h-svh w-screen flex items-center justify-center">
        <Card className="w-full max-w-xl">
            <CardHeader>
                <CardTitle>Connecter sur votre compte</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input type="email" placeholder="email@domain.ltd" />
                    </Field>
                    <Field>
                        <FieldLabel>Password</FieldLabel>
                        <Input type="password" placeholder="*******" />
                    </Field>
                    
                    <Button className="">Connexion</Button>
                </form>
            </CardContent>
        </Card>
    </div>
}