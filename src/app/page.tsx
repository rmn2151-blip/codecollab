import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-lg text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">CodeCollab</h1>
        <p className="text-lg text-muted-foreground">
          Group restaurant ordering for university students. Find a group,
          join the chat, and decide what to order together.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/signup">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg">Sign In</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
