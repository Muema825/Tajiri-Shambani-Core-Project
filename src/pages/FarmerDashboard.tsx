import { Button } from '@/components/ui/button'

export default function FarmerDashboard() {
  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Farmer Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Manage your projects and connect with investors
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Active Projects</h3>
          <p className="text-2xl font-bold text-primary">0</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Total Funding</h3>
          <p className="text-2xl font-bold text-primary">$0</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Completed Projects</h3>
          <p className="text-2xl font-bold text-primary">0</p>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>
        <div className="bg-card p-8 rounded-lg border text-center">
          <p className="text-muted-foreground mb-4">You haven't created any projects yet</p>
          <Button>Create New Project</Button>
        </div>
      </section>
    </main>
  )
}