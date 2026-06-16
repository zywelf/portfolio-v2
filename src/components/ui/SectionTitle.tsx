type TitleProps = {
    className?: string;
    children: React.ReactNode;
};

export default function SectionTitle({ children, className }: TitleProps) {
    return (
        <h2
            className={`text-4xl font-bold text-foreground mb-12 ${className ?? ""}`}
        >
            {children}
            <span className="text-teal-light">.</span>
        </h2>
    );
}
