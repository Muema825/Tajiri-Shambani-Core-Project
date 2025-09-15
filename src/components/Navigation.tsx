import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Navigation() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            Tajiri Shambani
          </Link>
          
          <div className="flex gap-6 items-center">
            <Link to="/" className="text-foreground hover:text-primary">
              Home
            </Link>
            <Link to="/projects" className="text-foreground hover:text-primary">
              Projects
            </Link>
            <Link to="/investor-dashboard" className="text-foreground hover:text-primary">
              Investor
            </Link>
            <Link to="/farmer-dashboard" className="text-foreground hover:text-primary">
              Farmer
            </Link>
            <Link to="/profile" className="text-foreground hover:text-primary">
              Profile
            </Link>
            <Button size="sm">Sign In</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}