import { Quote } from "lucide-react";
import { AppCard } from "@/components/common/containers";

export default function AboutFavoriteQuote() {
  return (
    <AppCard rounded className="max-w-2xl p-10">
      <Quote size={38} className="absolute -top-3 -left-3 text-primary" />
      <span className="text-secondary/70 text-xs">Favorite Quote:</span>

      <blockquote className="text-lg font-medium italic leading-relaxed text-white">
        <p>&ldquo;It works on my machine.&rdquo;</p>
      </blockquote>

      <div className="flex items-center gap-4">
        <div className="w-full text-end">
          <p className="text-sm font-semibold text-primary">- John Doe</p>
        </div>
      </div>
    </AppCard>
  );
}
