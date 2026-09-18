@extends('layouts.app')

@section('judul', 'Detail Mahasiswa')

@section('konten')
<h1 class="h3 mb-4">Detail Mahasiswa</h1>

<div class="card mb-4">
    <div class="card-body">
        <p class="mb-1"><strong>NIM:</strong> {{ $mahasiswa->nim }}</p>
        <p class="mb-1"><strong>Nama:</strong> {{ $mahasiswa->nama }}</p>
        <p class="mb-1"><strong>Email:</strong> {{ $mahasiswa->email }}</p>
        <p class="mb-1"><strong>Program Studi:</strong> {{ $mahasiswa->programStudi->nama }}</p>
        <p class="mb-1"><strong>Angkatan:</strong> {{ $mahasiswa->angkatan }}</p>
        <p class="mb-0"><strong>IPK:</strong> {{ $mahasiswa->ipk }}</p>
    </div>
</div>

<h2 class="h4 mb-3">Matakuliah yang Diambil</h2>

<table class="table table-bordered bg-white">
    <thead>
        <tr>
            <th>Kode</th>
            <th>Nama Matakuliah</th>
            <th>SKS</th>
            <th>Nilai</th>
        </tr>
    </thead>
    <tbody>
        @forelse ($mahasiswa->matakuliah as $mk)
            <tr>
                <td>{{ $mk->kode }}</td>
                <td>{{ $mk->nama }}</td>
                <td>{{ $mk->sks }}</td>
                <td>{{ $mk->pivot->nilai }}</td>
            </tr>
        @empty
            <tr>
                <td colspan="4">Belum ada matakuliah yang diambil.</td>
            </tr>
        @endforelse
    </tbody>
</table>

<a href="{{ route('mahasiswa.data') }}" class="btn btn-secondary mt-3">Kembali</a>
@endsection