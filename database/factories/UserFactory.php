<?php declare(strict_types=1);

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
	/**
	 * Define the model's default state.
	 */
	public function definition(): array
	{
		$name = $this->faker->name();
		return [
			'name' => $name,
			'lower' => strtolower($name)
		];
	}
}
