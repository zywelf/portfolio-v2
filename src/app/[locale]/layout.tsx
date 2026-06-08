import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { JetBrains_Mono } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains",
});

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale} className={jetBrainsMono.variable}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
