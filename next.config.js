module.exports = (phase, { defaultConfig }) => {
    return {
        ...defaultConfig,
        eslint: {
            // Warning: This allows production builds to successfully complete even if
            // your project has ESLint errors.
            ignoreDuringBuilds: true
        },
        webpack: (config) => {
            config.resolve = {
                ...config.resolve,
                fallback: {
                    net: false,
                    tls: false,
                    fs: false,
                    path: false,
                    os: false,
                    crypto: require.resolve('crypto-browserify'),
                    stream: require.resolve('stream-browserify')
                }
            };
            return config;
        }
    };
};
