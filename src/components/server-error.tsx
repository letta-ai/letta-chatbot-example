import { AlertCircle, RefreshCw, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ServerErrorProps {
  onRetry?: () => void
}

export function ServerError({ onRetry }: ServerErrorProps) {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-4">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Unable to connect to Letta server</h2>
          <p className="text-muted-foreground">
            We couldn't fetch your agents. Please ensure the Letta server is running and try again.
          </p>
        </div>

        <div className="flex flex-col gap-3 items-center">
          {onRetry && (
            <Button 
              onClick={onRetry} 
              variant="outline"
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          )}
          

          <div className="text-sm text-muted-foreground">
            Need help getting started?{' '}
            <a 
              href="https://docs.letta.com/overview" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              View Letta documentation
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
