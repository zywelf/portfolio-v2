import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    allowedDevOrigins: ['192.168.1.128'],
    images: {
        remotePatterns: [
            {
                protocol: "https" as const,
                hostname: "media.rawg.io"
            }
        ]
    }
};

export default withNextIntl(nextConfig);
