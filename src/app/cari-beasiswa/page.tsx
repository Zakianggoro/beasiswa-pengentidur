'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, User, BookOpen, GraduationCap, Calendar, MapPin, DollarSign, Home, NotebookText, Filter, Menu, X } from 'lucide-react';
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

function CariBeasiswaContent() {
  const searchParams = useSearchParams();
  const tingkatQuery = searchParams.get('tingkat');
  const searchQueryParam = searchParams.get('q');

  const [searchQuery, setSearchQuery] = useState(searchQueryParam || '');
  const [selectedFilters, setSelectedFilters] = useState({
    lokasi: [] as string[],
    tipe: [] as string[],
    tingkat: tingkatQuery ? [tingkatQuery] : [] as string[]
  });
  
  const [showFilters, setShowFilters] = useState(tingkatQuery ? true : false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const activeFiltersCount = selectedFilters.lokasi.length + selectedFilters.tipe.length + selectedFilters.tingkat.length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-64 bg-white border-r border-gray-200 p-6 fixed h-full z-50 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Close Button (Mobile Only) */}
        <button 
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 lg:hidden hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-800">BeasiswaKu</span>
        </div>

        <nav className="space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Home className="w-5 h-5" />
            <span>Beranda</span>
          </Link>
          <Link href="/cari-beasiswa" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
            <Search className="w-5 h-5" />
            <span>Cari Beasiswa</span>
          </Link>
          <Link href="/artikel" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <NotebookText className="w-5 h-5" />
            <span>Artikel</span>
          </Link>
          <Link href="/deadline" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5" />
            <span>Deadline</span>
          </Link>
          <Link href="/bebot" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <User className="w-5 h-5" />
            <span>Beasiswa Bot (BEBOT)</span>
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white">
            <p className="text-sm font-semibold mb-1">💡 Tips Hari Ini</p>
            <p className="text-xs opacity-90">Mulai persiapan dokumen beasiswa dari sekarang!</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Mobile Header with Hamburger */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-800">BeasiswaKu</span>
          </div>
          <div className="w-10"></div>
        </div>

        <div className="p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Cari Beasiswa</h1>
            <p className="text-sm md:text-base text-gray-600">Temukan beasiswa yang sesuai dengan profil dan tujuan Anda</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl p-4 md:p-6 mb-6 md:mb-8 border border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Cari beasiswa, penyedia, atau deskripsi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                />
                <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-400 absolute left-3 top-3 md:top-3.5" />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm md:text-base relative"
              >
                <Filter className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Filter</span>
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="pt-4 md:pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {/* Tingkat Filter */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">Tingkat</h4>
                    <div className="space-y-2">
                      {tingkatOptions.map(tkt => (
                        <label key={tkt.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedFilters.tingkat.includes(tkt.value)}
                            onChange={() => toggleFilter('tingkat', tkt.value)}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                          <span className="text-gray-700 text-sm md:text-base">{tkt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Lokasi Filter */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">Lokasi</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {lokasiOptions.map(loc => (
                        <label key={loc.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedFilters.lokasi.includes(loc.value)}
                            onChange={() => toggleFilter('lokasi', loc.value)}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                          <span className="text-gray-700 text-sm md:text-base">{loc.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Tipe Filter */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">Jenis Pendanaan</h4>
                    <div className="space-y-2">
                      {tipeOptions.map(fund => (
                        <label key={fund.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedFilters.tipe.includes(fund.value)}
                            onChange={() => toggleFilter('tipe', fund.value)}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                          <span className="text-gray-700 text-sm md:text-base">{fund.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filter Button */}
                  <div className="flex items-end">
                    <button
                      onClick={() => setSelectedFilters({ lokasi: [], tipe: [], tingkat: [] })}
                      className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition text-sm md:text-base"
                    >
                      Hapus Filter
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm md:text-base text-gray-600">
              Menampilkan <span className="font-semibold">{filteredScholarships.length}</span> beasiswa
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-xl p-8 md:p-12 text-center border border-gray-200">
              <h3 className="text-base md:text-lg font-semibold text-gray-800">Memuat data...</h3>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 rounded-xl p-8 md:p-12 text-center border border-red-200">
              <h3 className="text-base md:text-lg font-semibold text-red-700 mb-2">Terjadi Kesalahan</h3>
              <p className="text-sm md:text-base text-red-600">{error}</p>
            </div>
          )}

          {/* Scholarship List */}
          {!loading && !error && (
            <div className="space-y-4">
              {filteredScholarships.length > 0 ? (
                filteredScholarships.map(scholarship => {
                  const daysLeft = getDaysUntilDeadline(scholarship.deadline);
                  const isUrgent = daysLeft <= 30 && daysLeft > 0;
                  const isExpired = daysLeft < 0;

                  return (
                    <div key={scholarship.id} className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 hover:shadow-lg transition">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                        <div className="flex-1 w-full">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="text-base md:text-lg font-bold text-gray-800">{scholarship.nama}</h3>
                            {isUrgent && (
                              <span className="px-2 md:px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full whitespace-nowrap">
                                Segera!
                              </span>
                            )}
                            {isExpired && (
                              <span className="px-2 md:px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full whitespace-nowrap">
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
                          className="w-full sm:w-auto text-center px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm md:text-base"
                        >
                          Lihat Detail
                        </Link>
                      </div>

                      <p className="text-sm md:text-base text-gray-700 mb-4">{scholarship.deskripsi}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-4">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{scholarship.tingkat}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{scholarship.lokasi}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                            {scholarship.tipe}
                          </span>
                        </div>

                        <div className="flex items-center gap-2"> 
                          <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
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
                <div className="bg-white rounded-xl p-8 md:p-12 text-center border border-gray-200">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">Tidak ada beasiswa ditemukan</h3>
                  <p className="text-sm md:text-base text-gray-600">Coba ubah filter atau kata kunci pencarian Anda</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function CariBeasiswaPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen bg-gray-50">
        <aside className="w-64 bg-white border-r border-gray-200 p-6 fixed h-full animate-pulse hidden lg:block">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
            <div className="h-6 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="space-y-2">
            <div className="h-10 bg-gray-200 rounded-lg"></div>
            <div className="h-10 bg-gray-200 rounded-lg"></div>
            <div className="h-10 bg-gray-200 rounded-lg"></div>
            <div className="h-10 bg-gray-200 rounded-lg"></div>
          </div>
        </aside>
        <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8">
          <div className="mb-6 md:mb-8">
            <div className="h-8 md:h-9 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="bg-white rounded-xl p-4 md:p-6 mb-6 md:mb-8 border border-gray-200">
            <div className="h-10 md:h-12 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="bg-white rounded-xl p-8 md:p-12 text-center border border-gray-200">
            <h3 className="text-base md:text-lg font-semibold text-gray-800">Memuat data...</h3>
          </div>
        </main>
      </div>
    }>
      <CariBeasiswaContent />
    </Suspense>
  );
}