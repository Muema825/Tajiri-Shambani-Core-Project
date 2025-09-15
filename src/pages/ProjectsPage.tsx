import { Button } from '@/components/ui/button'

export default function ProjectsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Agricultural Projects</h1>
        <p className="text-lg text-muted-foreground">
          Discover investment opportunities in sustainable farming
        </p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Button variant="outline">All Categories</Button>
          <Button variant="outline">Vegetables</Button>
          <Button variant="outline">Fruits</Button>
          <Button variant="outline">Livestock</Button>
        </div>
        <Button>Create Project</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <div className="h-48 bg-muted rounded-lg mb-4"></div>
          <h3 className="text-lg font-semibold mb-2">Sample Tomato Farm</h3>
          <p className="text-muted-foreground mb-4">Organic tomato cultivation project seeking $5,000 investment</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Target: $5,000</span>
            <Button size="sm">Invest Now</Button>
          </div>
        </div>
      </div>
    </main>
  )
}