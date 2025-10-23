import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/components/ChatMessage";
import { MedicareTopicCard } from "@/components/MedicareTopicCard";
import { Send, Heart, Pill, Calendar, HelpCircle, Hospital, FileText, Shield, Stethoscope } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm MediCare AI, your caring healthcare assistant. I'm here to help you understand Medicare, track your health routines, and provide support. How can I help you today? 💙",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const medicareTopics = [
    {
      icon: Hospital,
      title: "Medicare Part A",
      description: "Hospital insurance coverage including inpatient care, skilled nursing, and hospice.",
      query: "Tell me about Medicare Part A",
    },
    {
      icon: Stethoscope,
      title: "Medicare Part B",
      description: "Medical insurance for doctor visits, outpatient care, and preventive services.",
      query: "What does Medicare Part B cover?",
    },
    {
      icon: Shield,
      title: "Medicare Part C",
      description: "Medicare Advantage plans offered by private insurance companies.",
      query: "Explain Medicare Part C to me",
    },
    {
      icon: Pill,
      title: "Medicare Part D",
      description: "Prescription drug coverage to help lower medication costs.",
      query: "How does Medicare Part D work?",
    },
  ];

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim();
    
    if (!textToSend) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(textToSend),
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("part a")) {
      return "Medicare Part A helps cover hospital stays, skilled nursing facility care, hospice care, and some home health services. Most people don't pay a monthly premium for Part A if they or their spouse paid Medicare taxes while working. Would you like to know more about what's specifically covered?";
    } else if (lowerQuery.includes("part b")) {
      return "Medicare Part B covers doctor visits, outpatient care, medical supplies, lab tests, X-rays, and preventive services like flu shots and screenings. Part B requires a monthly premium. The standard premium for 2024 is set by Medicare annually. Would you like to know what preventive services are included?";
    } else if (lowerQuery.includes("part c")) {
      return "Medicare Part C, also known as Medicare Advantage, is offered by private insurance companies approved by Medicare. These plans include Part A, Part B, and usually Part D coverage. Many also offer extra benefits like dental, vision, and hearing. Would you like help comparing plans?";
    } else if (lowerQuery.includes("part d")) {
      return "Medicare Part D helps cover prescription drug costs. It's offered by private companies approved by Medicare. Each plan has its own list of covered drugs (formulary) and costs vary. You can add Part D to Original Medicare, or it may be included in Medicare Advantage plans. Would you like tips on choosing a plan?";
    } else if (lowerQuery.includes("eligible") || lowerQuery.includes("age") || lowerQuery.includes("qualify")) {
      return "Most people become eligible for Medicare at age 65. You may also qualify if you're under 65 with certain disabilities or have End-Stage Renal Disease (ESRD). Your initial enrollment period begins 3 months before your 65th birthday and extends 3 months after. Would you like help understanding enrollment periods?";
    } else if (lowerQuery.includes("cost") || lowerQuery.includes("premium") || lowerQuery.includes("price")) {
      return "Medicare costs vary by plan. Part A is usually premium-free if you paid Medicare taxes. Part B has a monthly premium (around $174.70 in 2024 for most people). Parts C and D vary by plan. You may also have deductibles and copayments. Would you like a breakdown of typical costs?";
    } else if (lowerQuery.includes("medication") || lowerQuery.includes("pill") || lowerQuery.includes("medicine")) {
      return "I can help you track your medications! Please tell me the name of your medication, the dosage, and when you need to take it (e.g., 'twice daily at 9 AM and 9 PM'). I'll help you set up reminders. 💊";
    } else if (lowerQuery.includes("appointment") || lowerQuery.includes("doctor") || lowerQuery.includes("visit")) {
      return "I can help you remember your appointments! Please share the date, time, and purpose of your appointment (e.g., 'Doctor visit on Friday at 3 PM for checkup'). I'll make sure you don't miss it. 📅";
    } else if (
      lowerQuery.includes("nervous") ||
      lowerQuery.includes("anxious") ||
      lowerQuery.includes("worried") ||
      lowerQuery.includes("scared")
    ) {
      return "It's completely normal to feel this way. Remember, taking care of your health is something to be proud of, and you're not alone. I'm here to support you. Would you like some tips to help you feel calmer, or would you like to talk about what's concerning you? ❤️";
    } else if (lowerQuery.includes("thank")) {
      return "You're very welcome! I'm here whenever you need help. Remember, you're doing a great job taking care of yourself. Is there anything else I can help you with today? 😊";
    }

    return "That's a great question! While I can provide general information about Medicare and healthcare, for specific medical advice or complex coverage questions, I recommend speaking with a licensed healthcare professional or contacting Medicare directly at 1-800-MEDICARE. Is there something specific about Medicare coverage or general wellness I can help clarify?";
  };

  const handleTopicClick = (query: string) => {
    handleSendMessage(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Heart className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">MediCare AI</h1>
              <p className="text-sm text-muted-foreground">Your caring healthcare assistant</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Section */}
        <section className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Welcome to MediCare AI
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Understanding Medicare doesn't have to be complicated. I'm here to answer your questions,
            help you track your health, and provide caring support every step of the way.
          </p>
        </section>

        {/* Quick Topics */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            Quick Medicare Topics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medicareTopics.map((topic, index) => (
              <MedicareTopicCard
                key={index}
                icon={topic.icon}
                title={topic.title}
                description={topic.description}
                onClick={() => handleTopicClick(topic.query)}
              />
            ))}
          </div>
        </section>

        {/* Chat Section */}
        <section className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
          <div className="bg-gradient-primary p-4">
            <h3 className="text-xl font-semibold text-primary-foreground flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Chat with MediCare AI
            </h3>
          </div>

          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message.text} isUser={message.isUser} timestamp={message.timestamp} />
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 bg-muted/30">
            <div className="flex gap-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Medicare, medications, or appointments..."
                className="flex-1 text-base py-6 bg-card border-border"
              />
              <Button
                onClick={() => handleSendMessage()}
                className="px-6 py-6 bg-gradient-primary hover:opacity-90 transition-opacity"
                disabled={!inputMessage.trim()}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              💡 Reminder: Always consult a licensed healthcare professional for medical advice
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mt-8 p-6 bg-warning/10 border border-warning/30 rounded-xl">
          <p className="text-sm text-foreground leading-relaxed">
            <strong>Important:</strong> MediCare AI provides general information and support but does not
            diagnose conditions or prescribe medications. For medical concerns, please consult a licensed
            healthcare professional. In case of emergency, call 911 immediately.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            MediCare AI • Your trusted companion for Medicare information and health support
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
