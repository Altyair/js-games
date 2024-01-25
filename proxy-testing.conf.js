const PROXY_CONFIG = [
    {
        context: ['/api/'],
        target: 'https://internal.sfs.xrm.ru/',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
        ws: true,

        // https://github.com/nodejs/node/issues/27916
        // https://github.com/webpack/webpack-dev-server/issues/1642
        onProxyReqWs: (proxyReq, req, socket, options, head) => {
            socket.on('error', function (err) {
                console.warn('Socket error using onProxyReqWs event', err);
            });
        },

        onError(err) {
            console.log('Suppressing WDS proxy upgrade error:', err);
        },
    },
];

module.exports = PROXY_CONFIG;
