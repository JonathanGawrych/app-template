<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
	/**
	 * Bootstrap any application services.
	 *
	 * @return void
	 */
	public function boot()
	{
		// Disable Eloquent's guard system and handle attribute filling manually.
		// IMO the guard system just leads to repetition, which will give a false sense of security.
		Model::unguard();
	}
}
