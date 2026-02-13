export default function LoadingAnalysis() {
    const steps = [
        { label: "Cardiologist analyzing...", color: "bg-red-400" },
        { label: "Psychologist analyzing...", color: "bg-purple-400" },
        { label: "Pulmonologist analyzing...", color: "bg-teal-400" },
        { label: "Team consolidating...", color: "bg-amber-400" },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-pulse-ring">
                    <svg className="w-8 h-8 text-primary animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="60 30" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground">Analyzing Report</h3>
                <p className="text-sm text-muted-foreground">
                    Our AI specialists are reviewing your medical report...
                </p>
            </div>

            <div className="space-y-3 max-w-sm mx-auto">
                {steps.map((step, i) => (
                    <div
                        key={step.label}
                        className="flex items-center gap-3 animate-slide-up"
                        style={{ animationDelay: `${i * 200}ms` }}
                    >
                        <div className={`w-2 h-2 rounded-full ${step.color} animate-pulse`} />
                        <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                            <div
                                className={`h-full rounded-full ${step.color} animate-shimmer`}
                                style={{
                                    width: "60%",
                                    animationDelay: `${i * 300}ms`,
                                }}
                            />
                        </div>
                        <span className="text-xs text-muted-foreground w-40">{step.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
