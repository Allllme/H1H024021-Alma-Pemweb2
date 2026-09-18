<?php

namespace Database\Seeders;

use App\Models\Mahasiswa;
use App\Models\Matakuliah;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(ProgramStudiSeeder::class);
        $this->call(MatakuliahSeeder::class);

        Mahasiswa::factory()->count(30)->create();

        $daftarMatakuliah = Matakuliah::all();

        Mahasiswa::all()->each(function ($mahasiswa) use ($daftarMatakuliah) {
            $diambil = $daftarMatakuliah->random(rand(2, 4));

            foreach ($diambil as $matakuliah) {
                $mahasiswa->matakuliah()->attach($matakuliah->id, [
                    'nilai' => fake()->randomFloat(2, 60, 100),
                ]);
            }
        });
    }
}