const serverConfig = require("./server-config.json");
const mix = require("laravel-mix");
const { relativePublicPath } = serverConfig;

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setPublicPath(relativePublicPath)
    .js("resources/js/index.js", `${relativePublicPath}/assets/js`)
    .react();
