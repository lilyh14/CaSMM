module.exports = ({ env }) => ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    // url: 'localhost:1337',
    admin: {
        url: env('URL', '/admin'),
        // serveAdminPanel: false
    }
})