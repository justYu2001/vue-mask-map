const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import '@/assets/scss/all.scss';`,
            },
        },
    },
    chainWebpack: (config) => {
        config.module.rules.delete('svg');
        config.module
            .rule('svg-sprite-loader')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/images'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({ symbolId: '[name]' });
    },
};