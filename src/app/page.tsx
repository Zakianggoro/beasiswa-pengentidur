'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search,
  User,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Calendar,
  MapPin,
  DollarSign,
  Home,
  NotebookText,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../../database/supabaseClient';
import {
  scholarshipStream,
  initializeScholarshipStream,
} from '@/lib/scholarshipStream';

// ─── Helper: hitung waktu relatif dari created_at ────────────────────────────
function getTimeAgo(dateStr?: string): string {
  if (!dateStr) return 'Baru saja';
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60)   return 'Baru saja';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} menit lalu`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} jam lalu`;
  return `${Math.floor(seconds / 86400)} hari lalu`;
}

export default function Dashboard() {
  const [categoryCounts, setCategoryCounts] = useState({ S1: 0, S2: 0, S3: 0 });
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);

  // Kartu "Beasiswa Unggulan" — 3 teratas dari RxJS stream
  const [featuredScholarships, setFeaturedScholarships] = useState<any[]>([]);

  // Feed list "Realtime Beasiswa" — semua data dari RxJS stream
  const [realtimeBeasiswa, setRealtimeBeasiswa] = useState<any[]>([]);

  // Set of IDs yang baru masuk (untuk highlight sementara)
  const [newIds, setNewIds] = useState<Set<number>>(new Set());

  // Toast notifikasi
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Ref menyimpan ID yang sudah ada sebelumnya (untuk deteksi item baru)
  const prevIdsRef = useRef<Set<number>>(new Set());

  // Ticker untuk update label timeAgo tiap 30 detik
  const [tick, setTick] = useState(0);

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

  // ─── Ticker: update timeAgo label tiap 30 detik ──────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(interval);
  }, []);

  // ─── Supabase: category counts ───────────────────────────────────────────────
  useEffect(() => {
    async function fetchCategoryCounts() {
      setLoadingCategories(true);
      setErrorCategories(null);
      try {
        const [s1Data, s2Data, s3Data] = await Promise.all([
          supabase.from('Beasiswa').select('id', { count: 'exact', head: true }).eq('tingkat', 'S1'),
          supabase.from('Beasiswa').select('id', { count: 'exact', head: true }).eq('tingkat', 'S2'),
          supabase.from('Beasiswa').select('id', { count: 'exact', head: true }).eq('tingkat', 'S3')
        ]);
        if (s1Data.error) throw s1Data.error;
        if (s2Data.error) throw s2Data.error;
        if (s3Data.error) throw s3Data.error;
        setCategoryCounts({
          S1: s1Data.count || 0,
          S2: s2Data.count || 0,
          S3: s3Data.count || 0,
        });
      } catch (err) {
        console.error("Error fetching category counts:", err);
        if (err instanceof Error) {
          setErrorCategories(`Gagal memuat jumlah kategori: ${err.message}`);
        } else {
          setErrorCategories("Terjadi kesalahan tidak diketahui saat memuat jumlah kategori.");
        }
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategoryCounts();
  }, []);

  // ─── Toast helper ─────────────────────────────────────────────────────────────
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 4000);
  }, []);

  // ─── RxJS: satu stream → dua state + highlight + toast ───────────────────────
  useEffect(() => {
    initializeScholarshipStream();

    const dotColors = [
      'bg-green-400', 'bg-blue-400', 'bg-purple-400', 'bg-yellow-400', 'bg-orange-400',
    ];
    const badgeColors = [
      'bg-blue-100 text-blue-700', 'bg-purple-100 text-purple-700',
      'bg-indigo-100 text-indigo-700', 'bg-red-100 text-red-700', 'bg-orange-100 text-orange-700',
    ];

    const subscription = scholarshipStream.subscribe((data) => {
      // ── Deteksi item baru ──────────────────────────────────────────────────
      const incomingIds = new Set(data.map((d) => d.id));
      const freshIds = new Set<number>(
        [...incomingIds].filter((id) => !prevIdsRef.current.has(id))
      );

      // Hanya tampilkan highlight & toast jika sebelumnya sudah ada data
      // (skip saat initial load agar tidak semua item ke-highlight)
      if (prevIdsRef.current.size > 0 && freshIds.size > 0) {
        setNewIds(freshIds);
        setTimeout(() => setNewIds(new Set()), 3000); // hapus highlight setelah 3 detik
        showToast(`🎓 ${freshIds.size} beasiswa baru tersedia!`);
      }

      prevIdsRef.current = incomingIds;

      // ── Kartu unggulan — 3 item teratas ───────────────────────────────────
      setFeaturedScholarships(
        data.slice(0, 3).map((item) => ({
          id: item.id,
          title: item.nama,
          provider: item.organizer,
          deadline: item.deadline,
          amount: item.tipe,
          location: item.lokasi,
          imageUrl: item.imageUrl ?? "/components/placeholder/LPDP.png",
          createdAt: item.created_at,
        }))
      );

      // ── Feed list realtime — semua item ───────────────────────────────────
      setRealtimeBeasiswa(
        data.map((item, idx) => ({
          id: item.id,
          title: item.nama,
          provider: item.organizer,
          badge: item.tingkat ?? 'S1',
          badgeColor: badgeColors[idx % badgeColors.length],
          createdAt: item.created_at,  // disimpan agar ticker bisa hitung ulang
          timeColor: idx === 0 ? 'text-green-600' : 'text-gray-400',
          dotColor: dotColors[idx % dotColors.length],
          isLive: idx === 0,
          deadline: item.deadline,
          location: item.lokasi,
          status: item.status ?? 'Dibuka',
          statusColor:
            item.status === 'Ditutup'
              ? 'bg-red-100 text-red-700'
              : item.status === 'Segera Tutup'
              ? 'bg-orange-100 text-orange-700'
              : 'bg-green-100 text-green-700',
        }))
      );
    });

    return () => {
      subscription.unsubscribe();
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, [showToast]);

  // ─── Skeleton ────────────────────────────────────────────────────────────────
  const CategoryLoadingSkeleton = () => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4" />
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* ── TOAST NOTIFIKASI ─────────────────────────────────────────────────── */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white
                        px-4 py-3 rounded-xl shadow-lg text-sm font-medium
                        animate-fadeInUp flex items-center gap-2 max-w-xs">
          <span>{toast}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-gray-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
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

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-64">

        {/* MOBILE TOPBAR */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-800">BeasiswaKu</span>
          </div>
          <div className="w-10" />
        </div>

        <div className="p-4 md:p-6 lg:p-8">

          {/* HEADER */}
          <header className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Temukan Beasiswa Impianmu</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Jelajahi ribuan peluang beasiswa untuk masa depan cerah</p>
          </header>

          {/* HERO BANNER */}
          <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-xl md:rounded-2xl p-6 md:p-8 mb-6 md:mb-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3">Cari Beasiswa Anda</h2>
              <p className="text-blue-100 mb-4 md:mb-6 text-sm md:text-base max-w-2xl">
                Carilah beasiswa favorit mu, kami bantu kamu wujudkan impian mu. Mari cari beasiswa mu dan tanya chat bot kami.
              </p>
              <Link
                href="/cari-beasiswa"
                className="px-4 md:px-6 py-2 md:py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition inline-block text-sm md:text-base"
              >
                Mulai Pencarian
              </Link>
            </div>
            <div className="absolute right-0 top-0 opacity-20">
              <GraduationCap className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64" />
            </div>
          </div>

          {/* ERROR BANNER */}
          {errorCategories && (
            <div className="mb-6 md:mb-8 bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
              <p><strong>Peringatan:</strong> {errorCategories}</p>
            </div>
          )}

          {/* KATEGORI BEASISWA */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Kategori Beasiswa</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {loadingCategories ? (
                [...Array(4)].map((_, i) => <CategoryLoadingSkeleton key={i} />)
              ) : (
                categories.map((cat, idx) => {
                  const count =
                    cat.value === 'Lainnya'
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

          {/* BEASISWA UNGGULAN */}
          <div className="mb-6 md:mb-8">
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-800">Beasiswa Unggulan</h3>
              <Link href="/cari-beasiswa" className="text-blue-600 font-semibold hover:text-blue-700 text-sm md:text-base">
                Lihat Semua →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {featuredScholarships.length === 0
                ? [...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-200 animate-pulse">
                      <div className="h-40 md:h-48 bg-gray-200" />
                      <div className="p-4 md:p-6 space-y-3">
                        <div className="h-5 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                      </div>
                    </div>
                  ))
                : featuredScholarships.map((scholarship) => (
                    <div
                      key={scholarship.id}
                      className={`bg-white rounded-xl overflow-hidden hover:shadow-xl border group transition-all duration-500
                        ${newIds.has(scholarship.id)
                          ? 'border-blue-400 shadow-md shadow-blue-100 animate-fadeInDown'
                          : 'border-gray-200'
                        }`}
                    >
                      <div className="relative h-40 md:h-48 overflow-hidden bg-gray-200">
                        <Image
                          src={scholarship.imageUrl}
                          alt={scholarship.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        {/* Badge "Baru" untuk kartu yang baru masuk */}
                        {newIds.has(scholarship.id) && (
                          <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            ✨ Baru
                          </span>
                        )}
                      </div>
                      <div className="p-4 md:p-6">
                        <h4 className="font-bold text-base md:text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition">
                          {scholarship.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3 md:mb-4">{scholarship.provider}</p>
                        <div className="space-y-2 mb-3 md:mb-4">
                          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                            <Calendar className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                            <span>Deadline: {scholarship.deadline}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                            <DollarSign className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                            <span>{scholarship.amount}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                            <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                            <span>{scholarship.location}</span>
                          </div>
                        </div>
                        <Link
                          href={`/recommendation/${scholarship.id}`}
                          className="block w-full py-2 bg-blue-600 text-white rounded-lg font-semibold text-center hover:bg-blue-700 transition text-sm md:text-base"
                        >
                          Lihat Detail
                        </Link>
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          {/* REALTIME BEASISWA */}
          <div className="mb-6 md:mb-8">
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg md:text-xl font-bold text-gray-800">Realtime Beasiswa</h3>
                <span className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  LIVE
                </span>
              </div>
              <Link href="/cari-beasiswa" className="text-blue-600 font-semibold hover:text-blue-700 text-sm md:text-base">
                Lihat Semua →
              </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
              {realtimeBeasiswa.length === 0
                ? [...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 px-4 md:px-6 py-3 md:py-4 animate-pulse">
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-200 flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-1/4" />
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                      </div>
                      <div className="hidden sm:block space-y-1">
                        <div className="h-5 bg-gray-200 rounded w-20" />
                        <div className="h-3 bg-gray-200 rounded w-16" />
                      </div>
                    </div>
                  ))
                : realtimeBeasiswa.map((item) => (
                    <Link
                      key={item.id}
                      href={`/recommendation/${item.id}`}
                      className={`flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4
                                  hover:bg-gray-50 transition-all group
                                  ${newIds.has(item.id)
                                    ? 'bg-blue-50 border-l-4 border-blue-400 animate-fadeInDown'
                                    : 'border-l-4 border-transparent'
                                  }`}
                    >
                      <div className="flex-shrink-0">
                        <span className={`block w-2.5 h-2.5 rounded-full ${item.dotColor} ${item.isLive ? 'animate-pulse' : ''}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                          {/* timeAgo dihitung ulang setiap tick (tiap 30 detik) */}
                          <span className={`text-xs font-medium ${item.timeColor}`}>
                            {getTimeAgo(item.createdAt)}
                          </span>
                          {/* Tandai item yang baru masuk */}
                          {newIds.has(item.id) && (
                            <span className="text-xs font-bold text-blue-600">✨ Baru</span>
                          )}
                        </div>
                        <h4 className="font-semibold text-sm md:text-base text-gray-800 truncate group-hover:text-blue-600 transition">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                          {item.provider}
                          <span className="mx-1">·</span>
                          <MapPin className="w-3 h-3 inline" />
                          {item.location}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-right hidden sm:block">
                        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-1 ${item.statusColor}`}>
                          {item.status}
                        </span>
                        <p className="text-xs text-gray-400 flex items-center gap-1 justify-end">
                          <Calendar className="w-3 h-3" />
                          {item.deadline}
                        </p>
                      </div>
                    </Link>
                  ))}
            </div>

            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gray-400" />
              </span>
              Data diperbarui secara otomatis · Terakhir diperbarui beberapa detik lalu
            </p>
          </div>

          {/* TIPS & TRICK */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Tips & Trick</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className={`${rec.color} rounded-xl p-4 md:p-6 text-white hover:scale-105 transition cursor-pointer`}
                >
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