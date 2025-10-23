import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MedicareTopicCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}

export const MedicareTopicCard = ({ icon: Icon, title, description, onClick }: MedicareTopicCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 bg-card border-border group"
    >
      <div className="flex flex-col items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
          <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
        </div>
        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </Card>
  );
};
