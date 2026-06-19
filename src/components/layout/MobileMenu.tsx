"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { IT, GB } from "country-flag-icons/react/3x2";
import { useTranslations } from "next-intl";
import { NavItem } from "@/types";
import { Menu } from "lucide-react";
import { useState } from "react";

type MobileMenuProps = {
    locale: string;
    resolvedTheme: string;
    onSwitchLanguage: () => void;
    onSwitchTheme: () => void;
    mounted: boolean;
    navItems: NavItem[];
};

export default function MobileMenu({
    locale,
    resolvedTheme,
    onSwitchLanguage,
    onSwitchTheme,
    mounted,
    navItems,
}: MobileMenuProps) {
    const t = useTranslations("nav");
    const [isOpen, setIsOpen] = useState(false);

    const closeSheet = () => {
        setIsOpen(false);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
                <Menu size={24} />
            </SheetTrigger>
            <SheetContent
                className="p-4 backdrop-blur-md bg-background/80"
                showCloseButton={false}
            >
                <SheetTitle>
                    <span className="text-foreground font-semibold tracking-tight">
                        Zywel<span className="text-teal-light">.</span>
                    </span>
                </SheetTitle>
                {navItems.map((item) => (
                    <Link
                        key={item.title}
                        href={item.href}
                        onClick={closeSheet}
                        className="text-sm text-muted-foreground hover:text-teal-light transition-colors"
                    >
                        {t(item.title)}
                    </Link>
                ))}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onSwitchLanguage}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-teal-light transition-colors"
                    >
                        {locale === "it" ? (
                            <IT className="w-4 h-4" />
                        ) : (
                            <GB className="w-4 h-4" />
                        )}
                        <span>{t("language")}</span>
                    </button>
                    {mounted && (
                        <button
                            type="button"
                            onClick={onSwitchTheme}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {resolvedTheme === "dark" ? "☀️" : "🌙"}
                        </button>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
