const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const merge = require('webpack-merge');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');


const TARGET = process.env.npm_lifecycle_event;
// const TARGET = 'build';

const path = require('path');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    // style: path.join(__dirname, 'app/main.css'),
    test: path.join(__dirname, 'tests')
};

process.env.BABEL_ENV = TARGET;

const common = {
    // Entry accepts a path or an object of entries. We'll be using the
    // latter form given it's convenient with more complex configurations.
    entry: {
        app: PATHS.app,
        // 'react-vendor': ['react', 'react-dom'],
        // 'summernote-vendor': ['jquery', 'react-summernote', 'react-summernote/dist/react-summernote.css']
        // style: PATHS.style
    },
	// Add resolve.extensions.
	// '' is needed to allow imports without an extension.
	// Note the .'s before extensions as it will fail to match without!!!
	resolve: {
        root: path.resolve(__dirname),
        alias: {
            app: 'app',
            libs: 'app/libs/',
            components: 'app/components/',
            utils: 'app/utils/',
            images: 'app/images/',
            helpers: 'app/utils/helpers'
        },
		extensions: ['', '.js', '.jsx']
	},
    output: {
        path: PATHS.build,
        filename: "[name].js"
    },
    module: {
        loaders: [
        	/*
            {
                test: /\.css$/,
                loaders: ['style', 'css', 'bootstrap'],
                include: PATHS.app
            },
            */
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
            	test: /\.css$/,
            	loader: "style-loader!css-loader"
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
            	test: /\.png$/,
            	loader: "url-loader?limit=100000"
            },
            {
            	test: /\.jpg$/,
            	// loader: "file-loader"
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.gif$/,
                // loader: "file-loader"
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'url-loader'
            },
			{
				test: /\.jsx?$/,
				loader: 'babel',
				query: {
					cacheDirectory: true,
					presets: ['react', 'es2015', 'survivejs-kanban']
				},
				include: PATHS.app
			}
        ]
    }
};

// Default configuration
if(TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
        /*
        entry: {
            style: PATHS.style
        },
        */
        devtool: 'eval-source-map',
		devServer: {
	  		contentBase: PATHS.build,
			// Enable history API fallback so HTML5 History API based
			// routing works. This is a good default that will come
			// in handy in more complicated setups.
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,
			// Display only errors to reduce the amount of output.
			stats: 'errors-only',
			// Parse host and port from env so this is easy to customize.
			//
			// If you use Vagrant or Cloud9, set
			// host: process.env.HOST || '0.0.0.0';
			//
			// 0.0.0.0 is available to all network devices unlike default
			// localhost
			// host: process.env.HOST,
            host: '0.0.0.0',
			// port: process.env.PORT
            port: 4004
		}, plugins: [
		  	// new webpack.HotModuleReplacementPlugin(),
			new NpmInstallPlugin({
        		save: true // --save
      		}),
            /*
            new webpack.optimize.CommonsChunkPlugin({
                names: [
                    // "react-vendor",
                    "summernote-vendor"
                ],
                minChunks: Infinity
            }),
            */
            // new BundleAnalyzerPlugin(),
            // new DuplicatePackageCheckerPlugin(),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            })
		]
	});
}
if(TARGET === 'build' || TARGET === 'stats') {
	module.exports = merge(common, {
        devtool: 'cheap-module-source-map',
        /*
        entry: {
            vendor: Object.keys(pkg.dependencies).filter(function(v) {
                return v !== 'alt-utils';
            })
        },
        */
        plugins: [
            new webpack.NamedModulesPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),

            /*
            new webpack.optimize.CommonsChunkPlugin({
                names: [
                    // "react-vendor",
                    "summernote-vendor"
                ],
                minChunks: Infinity
            }),
            */
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                mangle: true,
                compress: {
                warnings: false, // Suppress uglification warnings
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true
                },
                output: {
                    comments: false
                },
                exclude: [/\.min\.js$/gi] // skip pre-minified libs
            }),
            new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
            new webpack.NoErrorsPlugin(),
            new CompressionPlugin({
                asset: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            })
        ],
        stats: { colors: true }

        /*
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),

            new webpack.optimize.OccurenceOrderPlugin(),

            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false
                }
            }),

            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),

            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            })
        ]
        */
    });
}

if(TARGET === 'test' || TARGET === 'tdd') {
    module.exports = merge(common, {
        devtool: 'inline-source-map',
        resolve: {
            alias: {
                'app': PATHS.app
            }
        },
        module: {
            preLoaders: [{
                test: /\.jsx?$/,
                loaders: ['isparta-instrumenter', 'jshint'],
                include: PATHS.app
            }],
            loaders: [{
                test: /\.jsx?$/,
                loaders: ['babel?cacheDirectory'],
                include: PATHS.test
            }]
        }
    });
}
