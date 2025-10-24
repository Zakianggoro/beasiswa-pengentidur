'use client';

import React, { useState, useEffect } from 'react';
import { Search, User, BookOpen, GraduationCap, TrendingUp, Calendar, MapPin, DollarSign, Home, NotebookText } from 'lucide-react';
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
  const [featuredScholarships, setFeaturedScholarships] = useState<BeasiswaDB[]>([]);
  const [categoryCounts, setCategoryCounts] = useState({ S1: 0, S2: 0, S3: 0 });
  const [loading, setLoading] = useState(true);
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
      desc: "Panduan lengkap menulis essay yang menarik",
      image: "📝",
      color: "bg-gradient-to-br from-yellow-400 to-orange-500"
    },
    {
      title: "Cara Memilih Beasiswa yang Tepat",
      desc: "Strategi memilih beasiswa sesuai profil Anda",
      image: "🎯",
      color: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      title: "Persiapan Interview Beasiswa",
      desc: "Tips sukses menghadapi interview beasiswa",
      image: "💼",
      color: "bg-gradient-to-br from-purple-400 to-pink-500"
    },
    {
      title: "Dokumen Beasiswa Lengkap",
      desc: "Checklist dokumen yang perlu disiapkan",
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

      } catch (err: any) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message);
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
      <div className="h-32 bg-gray-200"></div>
      <div className="p-6">
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
      <aside className="w-64 bg-white border-r border-gray-200 p-6 fixed h-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-800">BeasiswaKu</span>
        </div>

        <nav className="space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
            <Home className="w-5 h-5" />
            Beranda
          </Link>
          <Link href="/cari-beasiswa" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
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
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Temukan Beasiswa Impianmu</h1>
            <p className="text-gray-600 mt-1">Jelajahi ribuan peluang beasiswa untuk masa depan cerah</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari beasiswa..."
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
        </header>

        <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-3">Cari Beasiswa Anda</h2>
            <p className="text-blue-100 mb-6 max-w-2xl">
              Carilah beasiswa favorit mu, kami bantu kamu wudjudkan impian mu. Mari cari beasiswa mu dan tanya chat bot kami.
            </p>
            <div className="flex gap-3">
              <Link 
                href="/cari-beasiswa"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition inline-block"
              >
                Mulai Pencarian
              </Link>
            </div>
          </div>
          <div className="absolute right-0 top-0 opacity-20">
            <GraduationCap className="w-64 h-64" />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Kategori Beasiswa</h3>
          <div className="grid grid-cols-4 gap-4">
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
                    className="bg-white rounded-xl p-6 hover:shadow-lg transition cursor-pointer border border-gray-200 block"
                  >
                    <div className={`w-12 h-12 ${cat.color} rounded-lg flex items-center justify-center mb-4`}>
                      <cat.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">{cat.name}</h4>
                    <p className="text-sm text-gray-500">{count} Beasiswa</p>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Beasiswa Unggulan</h3>
            <Link href="/cari-beasiswa" className="text-blue-600 font-semibold hover:text-blue-700">
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {loading ? (
              [...Array(3)].map((_, i) => <FeaturedLoadingSkeleton key={i} />)
            ) : (
              featuredScholarships.map((scholarship, idx) => (
                <div key={scholarship.id} className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition border border-gray-200">
                  <div className={`h-32 bg-gradient-to-r ${featuredColors[idx % featuredColors.length]} p-6 flex items-center justify-center`}>
                    <GraduationCap className="w-16 h-16 text-white opacity-80" />
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-lg text-gray-800 mb-2 truncate" title={scholarship.nama}>{scholarship.nama}</h4>
                    <p className="text-sm text-gray-600 mb-4">{scholarship.organizer}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDeadline(scholarship.deadline)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>{scholarship.tipe}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{scholarship.lokasi}</span>
                      </div>
                    </div>
                    <Link
                      href={scholarship.path || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-2 bg-blue-600 text-white rounded-lg font-semibold text-center hover:bg-blue-700 transition"
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
          <h3 className="text-xl font-bold text-gray-800 mb-4">Tips & Trick</h3>
          <div className="grid grid-cols-4 gap-4">
            {recommendations.map((rec, idx) => (
              <div key={idx} className={`${rec.color} rounded-xl p-6 text-white hover:scale-105 transition cursor-pointer`}>
                <div className="text-4xl mb-3">{rec.image}</div>
                <h4 className="font-bold mb-2">{rec.title}</h4>
                <p className="text-sm opacity-90">{rec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}