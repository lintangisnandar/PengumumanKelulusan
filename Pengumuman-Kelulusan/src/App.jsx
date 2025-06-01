import React, { useState, useEffect } from 'react';

export default function App() {
  const [nis, setNis] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  // Target waktu buka
  const targetDate = new Date(new Date().getTime() + 6000); // 1 menit dari sekarang


  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setIsOpen(true);
        setCountdown('');
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setCountdown(
          `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCheck = () => {
    const siswa = data.find((item) => String(item.NIS) === nis.trim());
    if (siswa) {
      setResult(siswa);
      setError('');
    } else {
      setResult(null);
      setError('NIS tidak ditemukan');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl text-center p-8">
        <h1 className="text-3xl font-extrabold text-purple-800 mb-1">
          SMP NEGERI 2 KEDUNGJATI
        </h1>
        <p className="text-md text-purple-700 mb-4">Tahun Pelajaran 2024/2025</p>

        <h2 className="text-lg md:text-xl font-bold text-purple-900 mb-4">
          PENGUMUMAN KELULUSAN SISWA<br />
          SMP NEGERI 2 KEDUNGJATI<br />
          TAHUN 2024/2025
        </h2>

        {!isOpen ? (
          <>
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm md:text-base">
              Pengumuman kelulusan belum dapat diakses. <br />
              Pengumuman akan dibuka pada tanggal <strong>2 Juni 2025 pukul 17:00 WIB</strong>.
            </div>
            <p className="text-purple-800 font-medium">
              Pengumuman akan dibuka dalam:
              <br />
              <span className="text-lg font-semibold">{countdown}</span>
            </p>
          </>
        ) : (
          <>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Masukkan NIS"
                value={nis}
                onChange={(e) => setNis(e.target.value)}
                className="border border-purple-300 px-4 py-2 rounded w-full max-w-xs"
              />
            </div>
            <button
              onClick={handleCheck}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition duration-200"
            >
              Cek
            </button>

            {result && (
              <div className="mt-6 text-center rounded p-4 w-full max-w-md mx-auto text-purple-700 font-semibold">
                <p><strong>NAMA:</strong> {result.NAMA}</p>
                <p><strong>KELAS:</strong> {result.KELAS}</p>
                <p className="mt-4 bg-purple-700 text-white"><strong>{result.STATUS}</strong></p>
              </div>
            )}

            {error && (
              <div className="mt-6 text-red-600 font-semibold">{error}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
