import { useTranslations } from "next-intl";
import Link from "next/link";
import Section from "../layout/Section";
import TypingTitle from "../ui/TypingTitle";

export default function Hero() {
    const t = useTranslations("hero");

    return (
        <Section
            id="hero"
            className="flex flex-col items-center justify-center min-h-screen text-center px-6 gap-6"
        >
            <p className="text-sm text-teal-light uppercase tracking-widest">
                {t("subtitle")}
            </p>
            <TypingTitle />
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
