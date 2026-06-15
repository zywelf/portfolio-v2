"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Navbar() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations("nav");
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true);
    }, []);

    const switchTheme = () => {
        const newTheme = resolvedTheme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    };

    const switchLanguage = () => {
        const newLocale = locale === "it" ? "en" : "it";
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPath);
    };

    return (
        <nav className="flex">
            <div>
                <Link href="#about"> {t("about")} </Link>
            </div>
            <div>
                <Link href="#experience"> {t("experience")} </Link>
            </div>
            <div>
                <Link href="#projects"> {t("projects")} </Link>
            </div>
            <div>
                <Link href="#contact"> {t("contact")} </Link>
            </div>
            <div>
                <button type="button" onClick={switchLanguage}>
                    {t("language")}
                </button>
            </div>
            {mounted && (
                <div>
                    <button type="button" onClick={switchTheme}>
                        {resolvedTheme === "dark" ? "☀️" : "🌙"}
                    </button>
                </div>
            )}
        </nav>
    );
}
