import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CreditCard } from "lucide-react"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/dashboard/transfer">
            <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
              <ArrowRight className="h-6 w-6" />
              <span>Transfer</span>
            </Button>
          </Link>
          <Link href="/dashboard/loans">
            <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
              <CreditCard className="h-6 w-6" />
              <span>Loans</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
