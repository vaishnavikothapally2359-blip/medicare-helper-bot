import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn("flex gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-lg">
          M
        </div>
      )}
      <div className={cn("max-w-[75%] rounded-2xl px-5 py-3", isUser ? "bg-primary text-primary-foreground" : "bg-card border border-border")}>
        <p className={cn("text-base leading-relaxed", isUser ? "text-primary-foreground" : "text-foreground")}>{message}</p>
        {timestamp && <p className={cn("text-xs mt-2 opacity-70", isUser ? "text-primary-foreground" : "text-muted-foreground")}>{timestamp}</p>}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-semibold text-lg">
          U
        </div>
      )}
    </div>
  );
};
