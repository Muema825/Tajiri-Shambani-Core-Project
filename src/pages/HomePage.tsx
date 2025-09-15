import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'

export default function HomePage() {
  return (
    <main>
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Tajiri Shambani
        </h1>
        <p className="text-lg text-muted-foreground">
          Agricultural Investment Platform - Connecting Farmers with Investors
        </p>
        <div className="mt-6">
          <Button
            onClick={() =>
              toast({
                title: 'App ready',
                description: 'The site is running properly.',
              })
            }
          >
            Run health check
          </Button>
        </div>
      </section>
    </main>
  )
}