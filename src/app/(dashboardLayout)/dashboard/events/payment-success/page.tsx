import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { session_id } = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <Card className="w-full max-w-md text-center shadow-lg border-emerald-100 dark:border-emerald-900/50">
        <CardHeader className="pt-8 pb-4">
          <div className="mx-auto bg-emerald-100 dark:bg-emerald-900/30 w-20 h-20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-emerald-400 dark:to-emerald-200">
            Payment Successful!
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Thank you for your payment. Your spot for the event has been successfully confirmed.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground pb-6">
          {session_id && (
            <div className="bg-muted p-3 rounded-md text-xs font-mono break-all text-left">
              <span className="font-semibold px-1 text-foreground">Transaction ID:</span> <br/>
              {session_id}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center pb-8 gap-3">
          <Button asChild className="px-8">
            <Link href="/dashboard/my-participations">View My Participations</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
