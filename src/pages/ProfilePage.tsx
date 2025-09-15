import { Button } from '@/components/ui/button'

export default function ProfilePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Profile</h1>
        <p className="text-lg text-muted-foreground">
          Manage your account information and preferences
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-card p-6 rounded-lg border">
          <div className="w-24 h-24 bg-muted rounded-full mb-4 mx-auto"></div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-1">User Profile</h3>
            <p className="text-muted-foreground mb-4">Complete your profile to get started</p>
            <Button variant="outline">Upload Photo</Button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Account Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <div className="mt-1 p-3 border rounded-md bg-muted">Not provided</div>
            </div>
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <div className="mt-1 p-3 border rounded-md bg-muted">Not provided</div>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <div className="mt-1 p-3 border rounded-md bg-muted">Not authenticated</div>
            </div>
            <Button>Edit Profile</Button>
          </div>
        </div>
      </div>
    </main>
  )
}