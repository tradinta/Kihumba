export const VideoPlaceholders = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 h-96 w-full opacity-80 mix-blend-luminosity">
       <div className="h-full bg-card border relative overflow-hidden flex items-center justify-center">
         <div className="w-12 h-12 border border-muted-foreground rounded-full animate-spin" />
       </div>
       <div className="h-full bg-card border relative overflow-hidden md:col-span-2 flex items-center justify-center">
          <div className="flex gap-1 h-32 items-end">
             {[...Array(8)].map((_,i) => <div key={i} className="w-4 bg-muted animate-pulse" style={{ height: `${Math.random()*100}%` }} />)}
          </div>
       </div>
       <div className="h-full bg-card border relative overflow-hidden flex items-center justify-center">
          <div className="w-32 h-32 bg-secondary rounded-full blur-3xl opacity-50 animate-pulse" />
       </div>
    </div>
  );
  