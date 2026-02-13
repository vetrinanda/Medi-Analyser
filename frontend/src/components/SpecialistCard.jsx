import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Brain, Wind, Users } from "lucide-react";

const specialistConfig = {
    cardiologist: {
        title: "Cardiologist",
        icon: Heart,
        accent: "specialist-cardio",
        badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
        iconColor: "text-red-400",
        bgGlow: "from-red-500/5 to-transparent",
    },
    psychologist: {
        title: "Psychologist",
        icon: Brain,
        accent: "specialist-psycho",
        badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        iconColor: "text-purple-400",
        bgGlow: "from-purple-500/5 to-transparent",
    },
    pulmonologist: {
        title: "Pulmonologist",
        icon: Wind,
        accent: "specialist-pulmo",
        badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        iconColor: "text-teal-400",
        bgGlow: "from-teal-500/5 to-transparent",
    },
    team: {
        title: "Multidisciplinary Team",
        icon: Users,
        accent: "specialist-team",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        iconColor: "text-amber-400",
        bgGlow: "from-amber-500/5 to-transparent",
    },
};

export default function SpecialistCard({ type, content, delay = 0 }) {
    const config = specialistConfig[type];
    if (!config) return null;
    const Icon = config.icon;

    // Convert markdown-like bullet points into structured JSX
    const formattedContent = content
        .split("\n")
        .filter((line) => line.trim())
        .map((line, i) => {
            const trimmed = line.trim();
            // Bold: **text**
            const parts = trimmed.split(/(\*\*.*?\*\*)/g).map((part, j) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                    return (
                        <span key={j} className="font-semibold text-foreground">
                            {part.slice(2, -2)}
                        </span>
                    );
                }
                return part;
            });

            if (trimmed.startsWith("- ") || trimmed.startsWith("• ") || trimmed.startsWith("* ")) {
                return (
                    <li key={i} className="ml-4 list-disc text-muted-foreground text-sm leading-relaxed">
                        {parts.slice(0).map((p, idx) => typeof p === 'string' ? p.replace(/^[-•*]\s*/, '') : p)}
                    </li>
                );
            }
            return (
                <p key={i} className="text-muted-foreground text-sm leading-relaxed">
                    {parts}
                </p>
            );
        });

    return (
        <Card
            className={`glass-card ${config.accent} overflow-hidden animate-slide-up group hover:border-primary/20 transition-all duration-300`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Subtle gradient glow */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${config.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
            />

            <CardHeader className="pb-3 relative z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 ${config.iconColor}`} />
                        </div>
                        <CardTitle className="text-base font-semibold">
                            {config.title}
                        </CardTitle>
                    </div>
                    <Badge variant="outline" className={`${config.badgeColor} text-xs`}>
                        Analysis
                    </Badge>
                </div>
            </CardHeader>

            <Separator className="opacity-30" />

            <CardContent className="pt-4 relative z-10">
                <div className="space-y-2">{formattedContent}</div>
            </CardContent>
        </Card>
    );
}
