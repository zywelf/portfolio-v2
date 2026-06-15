import { useTranslations } from "next-intl";
import Link from "next/link";
import Section from "../layout/Section";

export default function Hero() {
    const t = useTranslations("hero");

    return (
        <Section id="hero" className="flex flex-col items-center justify-center min-h-screen text-center px-6 gap-6">
            <p className="text-sm text-teal-light uppercase tracking-widest">
                {t("subtitle")}
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground max-w-4xl leading-tight">
                {t("title")}
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
                {t("description")}
            </p>
            <Link
                href="#projects"
                className="mt-4 px-6 py-3 rounded-full border border-teal-light text-teal-light hover:bg-teal-light hover:text-black transition-colors duration-300"
            >
                {t("cta")}
            </Link>
        </Section>
    );
}
