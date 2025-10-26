'use client';

import React, { useState, useEffect } from 'react';
import { Search, User, BookOpen, GraduationCap, TrendingUp, Calendar, MapPin, DollarSign, Home, NotebookText, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '../../database/supabaseClient';

interface BeasiswaDB {
  id: number;
  nama: string;
  organizer: string;
  deadline: string | null;
  tipe: string;
  lokasi: string;
  path: string;
  tingkat: string;
}

export default function Dashboard() {
  const [categoryCounts, setCategoryCounts] = useState({ S1: 0, S2: 0, S3: 0 });
  const [featuredScholarships, setFeaturedScholarships] = useState<BeasiswaDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const featuredColors = [
    "from-orange-400 to-red-500",
    "from-blue-500 to-blue-700",
    "from-purple-500 to-indigo-600"
  ];

  const categories = [
    { name: "S1 / Sarjana", icon: BookOpen, color: "bg-blue-500", value: "S1" },
    { name: "S2 / Master", icon: GraduationCap, color: "bg-purple-500", value: "S2" },
    { name: "S3 / Doktor", icon: TrendingUp, color: "bg-orange-500", value: "S3" },
    { name: "Lainnya", icon: Search, color: "bg-gray-500", value: "Lainnya" }
  ];

  const recommendations = [
    {
      title: "Tips Menulis Essay Beasiswa",
      desc: "Panduan lengkap menulis essay yang menarik, coba cek artikel kami dan segera pelajari.",
      image: "📝",
      color: "bg-gradient-to-br from-yellow-400 to-orange-500"
    },
    {
      title: "Cara Memilih Beasiswa yang Tepat",
      desc: "Strategi memilih beasiswa sesuai profil Anda, coba cek artikel kami dan segera pelajari.",
      image: "🎯",
      color: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      title: "Persiapan Interview Beasiswa",
      desc: "Tips sukses menghadapi interview beasiswa, coba cek artikel kami dan segera pelajari.",
      image: "💼",
      color: "bg-gradient-to-br from-purple-400 to-pink-500"
    },
    {
      title: "Dokumen Beasiswa Lengkap",
      desc: "Checklist dokumen yang perlu disiapkan, coba cek artikel kami dan segera pelajari.",
      image: "📋",
      color: "bg-gradient-to-br from-green-400 to-teal-500"
    }
  ];

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      setError(null);
      try {
        const [featuredData, s1Data, s2Data, s3Data] = await Promise.all([
          supabase.from('Beasiswa').select('*').order('deadline', { ascending: false }).limit(3),
          supabase.from('Beasiswa').select('id', { count: 'exact', head: true }).eq('tingkat', 'S1'),
          supabase.from('Beasiswa').select('id', { count: 'exact', head: true }).eq('tingkat', 'S2'),
          supabase.from('Beasiswa').select('id', { count: 'exact', head: true }).eq('tingkat', 'S3')
        ]);

        if (featuredData.error) throw featuredData.error;
        if (s1Data.error) throw s1Data.error;
        if (s2Data.error) throw s2Data.error;
        if (s3Data.error) throw s3Data.error;

        setFeaturedScholarships(featuredData.data || []);
        
        setCategoryCounts({
          S1: s1Data.count || 0,
          S2: s2Data.count || 0,
          S3: s3Data.count || 0,
        });

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan yang tidak diketahui");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  const formatDeadline = (deadline: string | null) => {
    if (!deadline) return "Deadline tidak ditentukan";
    const date = new Date(deadline);
    return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const CategoryLoadingSkeleton = () => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

  const FeaturedLoadingSkeleton = () => (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 animate-pulse">
      <div className="h-40 md:h-48 bg-gray-200"></div>
      <div className="p-4 md:p-6">
        <div className="h-6 bg-gray-200 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        w-64 bg-white border-r border-gray-200 p-6 fixed h-full z-50 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
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
          <Link href="/" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
            <Home className="w-5 h-5" />
            <span>Beranda</span>
          </Link>
          <Link href="/cari-beasiswa" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
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

      <main className="flex-1 lg:ml-64">
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
          <header className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Temukan Beasiswa Impianmu</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Jelajahi ribuan peluang beasiswa untuk masa depan cerah</p>
          </header>

          <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-xl md:rounded-2xl p-6 md:p-8 mb-6 md:mb-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3">Cari Beasiswa Anda</h2>
              <p className="text-blue-100 mb-4 md:mb-6 text-sm md:text-base max-w-2xl">
                Carilah beasiswa favorit mu, kami bantu kamu wujudkan impian mu. Mari cari beasiswa mu dan tanya chat bot kami.
              </p>
              <div className="flex gap-3">
                <Link 
                  href="/cari-beasiswa"
                  className="px-4 md:px-6 py-2 md:py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition inline-block text-sm md:text-base"
                >
                  Mulai Pencarian
                </Link>
              </div>
            </div>
            <div className="absolute right-0 top-0 opacity-20">
              <GraduationCap className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64" />
            </div>
          </div>

          {error && (
            <div className="mb-6 md:mb-8 bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
              <p><strong>Gagal memuat data:</strong> {error}</p>
            </div>
          )}

          <div className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Kategori Beasiswa</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {loading ? (
                [...Array(4)].map((_, i) => <CategoryLoadingSkeleton key={i} />)
              ) : (
                categories.map((cat, idx) => {
                  const count = cat.value === 'Lainnya' 
                    ? 0
                    : categoryCounts[cat.value as keyof typeof categoryCounts];
                  
                  return (
                    <Link 
                      key={idx} 
                      href={`/cari-beasiswa?tingkat=${cat.value}`}
                      className="bg-white rounded-xl p-4 md:p-6 hover:shadow-lg transition cursor-pointer border border-gray-200 block"
                    >
                      <div className={`w-10 h-10 md:w-12 md:h-12 ${cat.color} rounded-lg flex items-center justify-center mb-3 md:mb-4`}>
                        <cat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">{cat.name}</h4>
                      <p className="text-xs md:text-sm text-gray-500">{count} Beasiswa</p>
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          <div className="mb-6 md:mb-8">
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-800">Beasiswa Unggulan</h3>
              <Link href="/cari-beasiswa" className="text-blue-600 font-semibold hover:text-blue-700 text-sm md:text-base">
                Lihat Semua →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {loading ? (
                [...Array(3)].map((_, i) => <FeaturedLoadingSkeleton key={i} />)
              ) : (
                featuredScholarships.map((scholarship, idx) => (
                  <div key={scholarship.id} className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition border border-gray-200 group">
                    <div className={`relative h-40 md:h-48 overflow-hidden bg-gradient-to-r ${featuredColors[idx % featuredColors.length]} p-6 flex items-center justify-center`}>
                      <GraduationCap className="w-16 h-16 text-white opacity-80" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    
                    <div className="p-4 md:p-6">
                      <h4 
                        className="font-bold text-base md:text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition truncate"
                        title={scholarship.nama}
                      >
                        {scholarship.nama}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3 md:mb-4">{scholarship.organizer}</p>
                      <div className="space-y-2 mb-3 md:mb-4">
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                          <span>Deadline: {formatDeadline(scholarship.deadline)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                          <DollarSign className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                          <span>{scholarship.tipe}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                          <span>{scholarship.lokasi}</span>
                        </div>
                      </div>
                      <Link
                        href={scholarship.path || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-2 bg-blue-600 text-white rounded-lg font-semibold text-center hover:bg-blue-700 transition text-sm md:text-base"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Tips & Trick</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {recommendations.map((rec, idx) => (
                <div key={idx} className={`${rec.color} rounded-xl p-4 md:p-6 text-white hover:scale-105 transition cursor-pointer`}>
                  <div className="text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-3">{rec.image}</div>
                  <h4 className="font-bold mb-1 md:mb-2 text-sm md:text-base">{rec.title}</h4>
                  <p className="text-xs md:text-sm opacity-90">{rec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}