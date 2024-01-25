const PROXY_CONFIG = [
    {
        context: ['/api/'],
        target: 'http://localhost:9100/',
        secure: false,
        logLevel: 'debug',
    },
];

module.exports = PROXY_CONFIG;
