import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    allowedDevOrigins: ['192.168.1.128'],
};

export default withNextIntl(nextConfig);
