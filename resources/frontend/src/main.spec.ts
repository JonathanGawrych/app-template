import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { fakeAsync, tick } from '@angular/core/testing';
import { getPlatform, isDevMode } from '@angular/core';
import type { Injector } from '@angular/core';

describe('Main', () => {
	beforeEach(() => {
		// Instruct angular that it's okay to load the main.ts, even though test.ts is already loaded.
		// There's probably a much better way to provide an injection token, but my attempts failed.
		const platform = getPlatform()!;
		const orgGet = platform.injector.get;
		spyOn(platform.injector, 'get').and.callFake(function (this: Injector, token: any, ...args: any[]) {
			// Depending on test run order, the following if may or may not run
			/* istanbul ignore next */
			if (token.toString() === 'InjectionToken Platform: browserDynamic') {
				return true;
			}
			return orgGet.call(this, token, ...args);
		});

		// If it's been cached, we want to require again
		delete require.cache[require.resolve('./main.ts')];
	})

	it('should bootstrap the app with the AppModule', () => {
		const platform = getPlatform()!;

		const boostrapSpy = spyOn(platform, 'bootstrapModule').and.resolveTo();
		require('./main.ts');
		expect(boostrapSpy).toHaveBeenCalledWith(AppModule);
	});

	it('should log an error if it cannot boot', fakeAsync(() => {
		const platform = getPlatform()!;

		const boostrapSpy = spyOn(platform, 'bootstrapModule').and.rejectWith('oh noes!');
		const consoleSpy = spyOn(console, 'error');
		require('./main.ts');
		tick();
		expect(boostrapSpy).toHaveBeenCalledWith(AppModule);
		expect(consoleSpy).toHaveBeenCalledWith('oh noes!');
	}));

	it('should enable prod mode if the production environment is loaded', () => {
		environment.production = true;
		const platform = getPlatform()!;

		const boostrapSpy = spyOn(platform, 'bootstrapModule').and.resolveTo();
		require('./main.ts');
		expect(boostrapSpy).toHaveBeenCalledWith(AppModule);
		expect(isDevMode()).toBeFalse();
		// Warning: The way angular has written this, you can never call enableProdMode again
		// as it's a local variable in node, and not reset with the environment
		// So we delete cache to @angular/core and hope that's good enough
		delete require.cache[require.resolve('@angular/core')];
		environment.production = false;
	});
});
