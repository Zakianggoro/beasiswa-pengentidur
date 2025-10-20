// app/cari-beasiswa/cari.tsx
'use client';

import React, { useState } from 'react';
import { Search, Filter, MapPin, DollarSign, Calendar, BookOpen, GraduationCap, Bell, User } from 'lucide-react';
import Link from 'next/link';

export default function CariBeasiswa() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    category: [] as string[],
    location: [] as string[],
    fundingType: [] as string[]
  });
  const [showFilters, setShowFilters] = useState(false);

  const scholarships = [
    {
      id: 1,
      title: "Beasiswa Unggulan Kemendikbud 2025",
      provider: "Kementerian Pendidikan",
      category: "S1",
      deadline: "2025-12-31",
      amount: "Full Tuition + Living Cost",
      location: "Indonesia",
      fundingType: "Full Funded",
      description: "Beasiswa untuk siswa berprestasi yang melanjutkan pendidikan S1 di dalam maupun luar negeri"
    },
    {
      id: 2,
      title: "LPDP Scholarship Program",
      provider: "LPDP Indonesia",
      category: "S2",
      deadline: "2026-01-15",
      amount: "Full Funded",
      location: "Global",
      fundingType: "Full Funded",
      description: "Program beasiswa penuh untuk pendidikan pascasarjana di universitas terkemuka dunia"
    },
    {
      id: 3,
      title: "Chevening Scholarship UK",
      provider: "UK Government",
      category: "S2",
      deadline: "2025-11-08",
      amount: "£18,000/year",
      location: "United Kingdom",
      fundingType: "Partial",
      description: "Beasiswa pemerintah Inggris untuk pemimpin masa depan dari negara-negara berkembang"
    },
    {
      id: 4,
      title: "Erasmus Mundus Joint Masters",
      provider: "European Commission",
      category: "S2",
      deadline: "2025-12-15",
      amount: "€24,000/year",
      location: "Europe",
      fundingType: "Full Funded",
      description: "Program master bersama yang menawarkan pengalaman belajar di multiple negara Eropa"
    },
    {
      id: 5,
      title: "ADB-JSP Scholarship",
      provider: "Asian Development Bank",
      category: "S2",
      deadline: "2026-01-31",
      amount: "Full Tuition + Allowance",
      location: "Asia",
      fundingType: "Full Funded",
      description: "Beasiswa untuk negara-negara anggota ADB yang ingin melanjutkan pendidikan pascasarjana"
    },
    {
      id: 6,
      title: "Fulbright Indonesia",
      provider: "US Embassy Indonesia",
      category: "S2",
      deadline: "2025-10-31",
      amount: "Full Funded",
      location: "United States",
      fundingType: "Full Funded",
      description: "Program pertukaran pendidikan antara Indonesia dan Amerika Serikat"
    },
    {
      id: 7,
      title: "Beasiswa Kemitraan Universitas",
      provider: "Kerjasama Bilateral",
      category: "S1",
      deadline: "2025-11-30",
      amount: "Tuition Coverage",
      location: "Indonesia",
      fundingType: "Partial",
      description: "Beasiswa kerjasama antara universitas lokal dengan institusi internasional"
    },
    {
      id: 8,
      title: "Coimbra Group Scholarship",
      provider: "Coimbra Group",
      category: "S3",
      deadline: "2026-02-28",
      amount: "€1,000-€2,000/month",
      location: "Europe",
      fundingType: "Partial",
      description: "Beasiswa untuk penelitian doktor di universitas-universitas terkemuka Eropa"
    }
  ];

  const categories = [
    { value: "S1", label: "S1 / Sarjana" },
    { value: "S2", label: "S2 / Master" },
    { value: "S3", label: "S3 / Doktor" }
  ];

  const locations = [
    { value: "Indonesia", label: "Indonesia" },
    { value: "Asia", label: "Asia" },
    { value: "Europe", label: "Eropa" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" },
    { value: "Global", label: "Global" }
  ];

  const fundingTypes = [
    { value: "Full Funded", label: "Full Funded" },
    { value: "Partial", label: "Partial" }
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
    const matchesSearch = scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedFilters.category.length === 0 || selectedFilters.category.includes(scholarship.category);
    const matchesLocation = selectedFilters.location.length === 0 || selectedFilters.location.includes(scholarship.location);
    const matchesFunding = selectedFilters.fundingType.length === 0 || selectedFilters.fundingType.includes(scholarship.fundingType);

    return matchesSearch && matchesCategory && matchesLocation && matchesFunding;
  });

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 fixed h-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-800">BeasiswaKu</span>
        </div>

        <nav className="space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
            <BookOpen className="w-5 h-5" />
            Beranda
          </Link>
          <Link href="/cari-beasiswa" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Search className="w-5 h-5" />
            Cari Beasiswa
          </Link>
          <a href="/artikel" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Bell className="w-5 h-5" />
            Artikel
          </a>
          <a href="/deadline" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5" />
            Deadline
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <User className="w-5 h-5" />
            Beasiswa Bot (BEBOT)
          </a>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white">
            <p className="text-sm font-semibold mb-1">💡 Tips Hari Ini</p>
            <p className="text-xs opacity-90">Mulai persiapan dokumen beasiswa dari sekarang!</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Cari Beasiswa</h1>
          <p className="text-gray-600">Temukan beasiswa yang sesuai dengan profil dan tujuan Anda</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Cari beasiswa, penyedia, atau deskripsi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Filters Panel */}
          {showFilters && (
            <div className="grid grid-cols-4 gap-6 pt-6 border-t border-gray-200">
              {/* Category Filter */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Kategori</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.category.includes(cat.value)}
                        onChange={() => toggleFilter('category', cat.value)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-gray-700">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Lokasi</h4>
                <div className="space-y-2">
                  {locations.map(loc => (
                    <label key={loc.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.location.includes(loc.value)}
                        onChange={() => toggleFilter('location', loc.value)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-gray-700">{loc.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Funding Type Filter */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Jenis Pendanaan</h4>
                <div className="space-y-2">
                  {fundingTypes.map(fund => (
                    <label key={fund.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.fundingType.includes(fund.value)}
                        onChange={() => toggleFilter('fundingType', fund.value)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-gray-700">{fund.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => setSelectedFilters({ category: [], location: [], fundingType: [] })}
                  className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Hapus Filter
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            Menampilkan <span className="font-semibold">{filteredScholarships.length}</span> beasiswa
          </p>
        </div>

        {/* Scholarship Cards */}
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
                        <h3 className="text-lg font-bold text-gray-800">{scholarship.title}</h3>
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
                      <p className="text-sm text-gray-600">{scholarship.provider}</p>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                      Lihat Detail
                    </button>
                  </div>

                  <p className="text-gray-700 mb-4">{scholarship.description}</p>

                  <div className="grid grid-cols-5 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{scholarship.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{scholarship.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 font-semibold">{scholarship.amount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                        {scholarship.fundingType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <div className="text-sm">
                        <span className="text-gray-600">{formatDeadline(scholarship.deadline)}</span>
                        <span className={`ml-1 ${isUrgent ? 'text-red-600 font-semibold' : isExpired ? 'text-gray-400' : 'text-gray-500'}`}>
                          ({daysLeft > 0 ? `${daysLeft} hari lagi` : 'Telah berakhir'})
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
      </main>
    </div>
  );
}