// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

var Module = require('module');

// Angular doesn't have a way to directly config some coverage options
// so we have to do a lot of evil. Like 4 monkeypatches. But we want all coverage info
var oldRequire = Module.prototype.require;
Module.prototype.require = function(file) {
	const result = oldRequire.call(this, file);
	if (file === 'babel-loader') {
		const oldCustom = result.custom;
		result.custom = function (oldCallback) {
			const callback = function (babel) {
				const result = oldCallback.call(this, babel);
				const oldCustomOptions = result.customOptions;
				result.customOptions = async function (options, { source, map }) {
					const { custom, loader } = await oldCustomOptions.call(this, options, {
						source,
						map
					});

					// Don't exclude test files from coverage
					if (/\.(e2e|spec)\.tsx?$/.test(this.resourcePath)) {
						custom.instrumentCode = {
							includedBasePath: options.instrumentCode.includedBasePath,
							inputSourceMap: map,
						};
						delete loader.ignore;
					}

					return { custom, loader };
				};
				return result;
			};
			return oldCustom.call(this, callback);
		};
	}
	if (file === './default-exclude.js') {
		// Don't exclude files from coverage
		return [];
	}
	return result;
};

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage'),
			require('@angular-devkit/build-angular/plugins/karma')
		],
		client: {
			jasmine: {
				// you can add configuration options for Jasmine here
				// the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
				// for example, you can disable the random execution with `random: false`
				// or set a specific seed with `seed: 4321`
			},
			clearContext: false // leave Jasmine Spec Runner output visible in browser
		},
		jasmineHtmlReporter: {
			suppressAll: true // removes the duplicated traces
		},
		coverageReporter: {
			dir: require('path').join(__dirname, './coverage'),
			subdir: '.',
			reporters: [
				{ type: 'html' },
				{ type: 'text-summary' }
			],
			includeAllSources: true
		},
		reporters: [
			'progress',
			'kjhtml'
		],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: false,
		restartOnFileChange: true
	});
};
