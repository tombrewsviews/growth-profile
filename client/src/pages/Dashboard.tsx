import { SortingVisualizer } from "@/components/SortingVisualizer";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white font-mono p-8">
      <header className="mb-12">
        <h1 className="text-4xl mb-4">_Design _Drives _Growth</h1>
        <div className="flex gap-2 text-gray-400">
          <span>#tom</span>
          <span>#barandyk</span>
          <span>#technical</span>
          <span>#product</span>
          <span>#designer</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <SortingVisualizer
          algorithm="bubble"
          label="@qodo"
          color="rgb(167, 139, 250)"
        />
        <SortingVisualizer
          algorithm="quick"
          label="@neon"
          color="rgb(234, 179, 8)"
        />
        <SortingVisualizer
          algorithm="selection"
          label="@greyfinch"
          color="rgb(34, 197, 94)"
        />
        <SortingVisualizer
          algorithm="selection"
          label="@softco"
          color="rgb(59, 130, 246)"
        />
      </div>

      <footer className="text-gray-400 space-y-2">
        <a href="#" className="block hover:text-white">//linkedin</a>
        <a href="#" className="block hover:text-white">//dribbble</a>
        <a href="#" className="block hover:text-white">//medium</a>
      </footer>
    </div>
  );
}
