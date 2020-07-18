// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const fs = require(`fs`);
const path = require(`path`);
const exec = require('child_process').exec;

const srcPath = path.resolve(__dirname, `./src/`);
const distPath = path.resolve(__dirname, `./dist/`);

module.exports = async function(mode = `production`) {
	const entryFiles = {
		'js/script': `${srcPath}/js/script.js`,
		'js/script_map': `${srcPath}/js/script_map.js`
	};

	return {
		mode: mode,
		resolve: {
			extensions: ['.js', '.jsx'],
			alias: {
				"@": srcPath
			}
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [ `babel-loader` ]
				}
			]
		},
		entry: entryFiles,
		plugins: [{
			apply: (compiler) => {
				compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
					exec('npm run rsync', (err, stdout, stderr) => {
						if(stdout) process.stdout.write(stdout);
						if(stderr) process.stderr.write(stderr);
					});
				});
			}
		}],
		output: {
			path: distPath,
			filename: `[name].js`
		}
	};
};
