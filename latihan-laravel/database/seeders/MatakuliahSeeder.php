<?php

namespace Database\Seeders;

use App\Models\Matakuliah;
use Illuminate\Database\Seeder;

class MatakuliahSeeder extends Seeder
{
    public function run(): void
    {
        $daftar = [
            ['kode' => 'PW2', 'nama' => 'Pemrograman Web II', 'sks' => 3, 'semester' => 5],
            ['kode' => 'SDA', 'nama' => 'Struktur Data dan Algoritma', 'sks' => 4, 'semester' => 3],
            ['kode' => 'JAR', 'nama' => 'Jaringan Komputer', 'sks' => 3, 'semester' => 4],
            ['kode' => 'MTK', 'nama' => 'Matematika Diskrit', 'sks' => 2, 'semester' => 2],
            ['kode' => 'ETI', 'nama' => 'Etika Profesi', 'sks' => 2, 'semester' => 6],
            ['kode' => 'BSD', 'nama' => 'Basis Data', 'sks' => 3, 'semester' => 4],
        ];

        foreach ($daftar as $item) {
            Matakuliah::create($item);
        }
    }
}