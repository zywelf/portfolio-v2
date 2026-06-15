import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning className={jetBrainsMono.variable}>
            <body>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
