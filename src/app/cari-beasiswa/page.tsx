'use client';

import React, { useState, useEffect } from 'react';
import { Search, User, BookOpen, GraduationCap, Calendar, MapPin, DollarSign, Home, NotebookText, Filter } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '../../../database/supabaseClient';

interface Beasiswa {
  id: number;
  nama: string;
  organizer: string;
  deadline: string;
  tipe: string;
  lokasi: string;
  deskripsi: string;
  path: string;
  tingkat: string;
}

export default function CariBeasiswa() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    lokasi: [] as string[],
    tipe: [] as string[],
    tingkat: [] as string[]
  });
  const [showFilters, setShowFilters] = useState(false);

  const [scholarships, setScholarships] = useState<Beasiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBeasiswa() {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('Beasiswa')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } else {
        setScholarships(data || []);
      }
      setLoading(false);
    }

    fetchBeasiswa();
  }, []);


  const lokasiOptions = [
    { value: "Dalam Negeri", label: "Dalam Negeri" },
    { value: "Luar Negeri", label: "Luar Negeri" },
    { value: "Global", label: "Global" },
    { value: "Online / Global", label: "Online / Global" },
    { value: "Luar Negeri (UK)", label: "Luar Negeri (UK)" },
    { value: "Luar Negeri (Jepang)", label: "Luar Negeri (Jepang)" },
  ];

  const tipeOptions = [
    { value: "Full Funded", label: "Full Funded" },
    { value: "Financial Aid", label: "Financial Aid" },
    { value: "Tunjangan Bulanan", label: "Tunjangan Bulanan" },
    { value: "Tunjangan UKT & Bulanan", label: "Tunjangan UKT & Bulanan" },
  ];

  const tingkatOptions = [
    { value: "S1", label: "S1 / Sarjana" },
    { value: "S2", label: "S2 / Master" },
    { value: "S3", label: "S3 / Doktor" }
  ];

  const toggleFilter = (filterType: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLokasi = selectedFilters.lokasi.length === 0 || selectedFilters.lokasi.includes(scholarship.lokasi);
    const matchesTipe = selectedFilters.tipe.length === 0 || selectedFilters.tipe.includes(scholarship.tipe);
    const matchesTingkat = selectedFilters.tingkat.length === 0 || selectedFilters.tingkat.includes(scholarship.tingkat);

    return matchesSearch && matchesLokasi && matchesTipe && matchesTingkat;
  });

  const getDaysUntilDeadline = (deadline: string) => {
    if (!deadline) return 0;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDeadline = (deadline: string) => {
    if (!deadline) return "Tidak ada";
    const date = new Date(deadline);
    return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 p-6 fixed h-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-800">BeasiswaKu</span>
        </div>

        <nav className="space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Home className="w-5 h-5" />
            Beranda
          </Link>
          <Link href="/cari-beasiswa" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
            <Search className="w-5 h-5" />
            Cari Beasiswa
          </Link>
          <Link href="/artikel" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <NotebookText className="w-5 h-5" />
            Artikel
          </Link>
          <Link href="/deadline" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5" />
            Deadline
          </Link>
          <Link href="/bebot" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <User className="w-5 h-5" />
            Beasiswa Bot (BEBOT)
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white">
            <p className="text-sm font-semibold mb-1">💡 Tips Hari Ini</p>
            <p className="text-xs opacity-90">Mulai persiapan dokumen beasiswa dari sekarang!</p>
          </div>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Cari Beasiswa</h1>
          <p className="text-gray-600">Temukan beasiswa yang sesuai dengan profil dan tujuan Anda</p>
        </div>

        <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Cari beasiswa, penyedia, atau deskripsi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-4 gap-6 pt-6 border-t border-gray-200">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Tingkat</h4>
                <div className="space-y-2">
                  {tingkatOptions.map(tkt => (
                    <label key={tkt.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.tingkat.includes(tkt.value)}
                        onChange={() => toggleFilter('tingkat', tkt.value)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-gray-700">{tkt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Lokasi</h4>
                <div className="space-y-2">
                  {lokasiOptions.map(loc => (
                    <label key={loc.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.lokasi.includes(loc.value)}
                        onChange={() => toggleFilter('lokasi', loc.value)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-gray-700">{loc.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Jenis Pendanaan</h4>
                <div className="space-y-2">
                  {tipeOptions.map(fund => (
                    <label key={fund.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.tipe.includes(fund.value)}
                        onChange={() => toggleFilter('tipe', fund.value)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-gray-700">{fund.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => setSelectedFilters({ lokasi: [], tipe: [], tingkat: [] })}
                  className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Hapus Filter
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            Menampilkan <span className="font-semibold">{filteredScholarships.length}</span> beasiswa
          </p>
        </div>

        {loading && (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Memuat data...</h3>
          </div>
        )}

        {error && (
          <div className="bg-red-50 rounded-xl p-12 text-center border border-red-200">
            <h3 className="text-lg font-semibold text-red-700 mb-2">Terjadi Kesalahan</h3>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-4">
            {filteredScholarships.length > 0 ? (
              filteredScholarships.map(scholarship => {
                const daysLeft = getDaysUntilDeadline(scholarship.deadline);
                const isUrgent = daysLeft <= 30 && daysLeft > 0;
                const isExpired = daysLeft < 0;

                return (
                  <div key={scholarship.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-800">{scholarship.nama}</h3>
                          {isUrgent && (
                            <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                              Segera!
                            </span>
                          )}
                          {isExpired && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                              Expired
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{scholarship.organizer}</p>
                      </div>
                      <Link
                        href={scholarship.path || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                      >
                        Lihat Detail
                      </Link>
                    </div>

                    <p className="text-gray-700 mb-4">{scholarship.deskripsi}</p>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{scholarship.tingkat}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{scholarship.lokasi}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                          {scholarship.tipe}
                        </span>
                      </div>

                      <div className="flex items-center gap-2"> 
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div className="text-sm">
                          <span className="text-gray-600">{formatDeadline(scholarship.deadline)}</span>
                          <span className={`ml-1 ${isUrgent ? 'text-red-600 font-semibold' : isExpired ? 'text-gray-400' : 'text-gray-500'}`}>
                            ({daysLeft > 0 ? `${daysLeft} hari lagi` : isExpired ? 'Telah berakhir' : 'Segera dibuka'})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Tidak ada beasiswa ditemukan</h3>
                <p className="text-gray-600">Coba ubah filter atau kata kunci pencarian Anda</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}