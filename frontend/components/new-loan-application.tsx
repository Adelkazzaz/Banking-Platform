"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { applyForLoanAction } from "@/app/dashboard/loans/actions"

const loanSchema = z.object({
  amount: z.coerce
    .number()
    .positive({ message: "Amount must be positive" })
    .min(1000, { message: "Minimum loan amount is $1,000" })
    .max(50000, { message: "Maximum loan amount is $50,000" }),
  term: z.coerce
    .number()
    .int({ message: "Term must be a whole number" })
    .min(6, { message: "Minimum term is 6 months" })
    .max(60, { message: "Maximum term is 60 months" }),
})

interface NewLoanApplicationProps {
  userId: string
}

export function NewLoanApplication({ userId }: NewLoanApplicationProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const form = useForm<z.infer<typeof loanSchema>>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      amount: 5000,
      term: 12,
    },
  })

  async function onSubmit(values: z.infer<typeof loanSchema>) {
    setIsLoading(true)
    setResult(null)

    try {
      const result = await applyForLoanAction(values)
      setResult(result)

      if (result.success) {
        // Reset form on success
        form.reset()

        // Refresh the page after a short delay
        setTimeout(() => {
          router.refresh()
        }, 2000)
      }
    } catch (error) {
      setResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply for a Loan</CardTitle>
        <CardDescription>Fill out the form below to apply for a new loan</CardDescription>
      </CardHeader>
      <CardContent>
        {result && (
          <Alert variant={result.success ? "default" : "destructive"} className="mb-6">
            <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>{result.message}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="5000" {...field} />
                  </FormControl>
                  <FormDescription>Enter an amount between $1,000 and $50,000</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Term (months)</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number.parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a loan term" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                      <SelectItem value="36">36 months</SelectItem>
                      <SelectItem value="48">48 months</SelectItem>
                      <SelectItem value="60">60 months</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Choose a term between 6 and 60 months</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Apply for Loan"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
