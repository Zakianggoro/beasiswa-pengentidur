'use client'

import React, { useState } from 'react';
import { BookOpen, Search, Bell, Calendar, User, Clock, ArrowRight, Tag, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function ArtikelPage() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Tips Essay', 'Interview', 'Dokumen', 'Motivasi', 'Strategi'];

  const articles = [
    {
      id: 1,
      title: "10 Tips Menulis Essay Beasiswa yang Menarik Perhatian Reviewer",
      excerpt: "Essay adalah salah satu komponen terpenting dalam aplikasi beasiswa. Pelajari cara menulis essay yang powerful dan memorable untuk meningkatkan peluang Anda diterima.",
      category: "Tips Essay",
      readTime: "8 menit",
      date: "15 Oktober 2025",
      image: "📝",
      color: "from-yellow-400 to-orange-500"
    },
    {
      id: 2,
      title: "Cara Mempersiapkan Interview Beasiswa: Dari Riset hingga Follow-up",
      excerpt: "Interview adalah tahap krusial yang menentukan. Temukan strategi lengkap untuk mempersiapkan diri menghadapi interview beasiswa, mulai dari riset hingga tips menjawab pertanyaan sulit.",
      category: "Interview",
      readTime: "10 menit",
      date: "12 Oktober 2025",
      image: "💼",
      color: "from-purple-400 to-pink-500"
    },
    {
      id: 3,
      title: "Checklist Dokumen Beasiswa Lengkap: Jangan Sampai Ada yang Terlewat",
      excerpt: "Dokumen yang tidak lengkap bisa membuat aplikasi Anda ditolak. Gunakan checklist ini untuk memastikan semua dokumen yang dibutuhkan sudah disiapkan dengan baik.",
      category: "Dokumen",
      readTime: "6 menit",
      date: "10 Oktober 2025",
      image: "📋",
      color: "from-green-400 to-teal-500"
    },
    {
      id: 4,
      title: "Strategi Memilih Beasiswa yang Tepat Sesuai Profil Anda",
      excerpt: "Tidak semua beasiswa cocok untuk semua orang. Pelajari cara menganalisis profil Anda dan memilih beasiswa yang paling sesuai untuk meningkatkan peluang sukses.",
      category: "Strategi",
      readTime: "7 menit",
      date: "8 Oktober 2025",
      image: "🎯",
      color: "from-blue-400 to-blue-600"
    },
    {
      id: 5,
      title: "Motivation Letter vs Personal Statement: Apa Bedanya dan Bagaimana Menulisnya",
      excerpt: "Banyak yang bingung membedakan motivation letter dan personal statement. Artikel ini menjelaskan perbedaan keduanya dan tips menulis masing-masing dengan efektif.",
      category: "Tips Essay",
      readTime: "9 menit",
      date: "5 Oktober 2025",
      image: "✍️",
      color: "from-indigo-400 to-purple-600"
    },
    {
      id: 6,
      title: "Cara Mendapatkan Surat Rekomendasi yang Kuat untuk Beasiswa",
      excerpt: "Surat rekomendasi yang baik bisa menjadi game-changer dalam aplikasi beasiswa Anda. Pelajari cara memilih pemberi rekomendasi yang tepat dan tips meminta surat rekomendasi.",
      category: "Dokumen",
      readTime: "7 menit",
      date: "3 Oktober 2025",
      image: "📨",
      color: "from-pink-400 to-red-500"
    },
    {
      id: 7,
      title: "5 Kesalahan Fatal yang Harus Dihindari Saat Apply Beasiswa",
      excerpt: "Hindari kesalahan umum yang sering membuat aplikasi beasiswa ditolak. Dari deadline hingga format dokumen, pelajari apa saja yang harus dihindari.",
      category: "Strategi",
      readTime: "5 menit",
      date: "1 Oktober 2025",
      image: "⚠️",
      color: "from-red-400 to-orange-500"
    },
    {
      id: 8,
      title: "Membangun Track Record untuk Memperkuat Aplikasi Beasiswa",
      excerpt: "Track record yang solid adalah aset berharga dalam aplikasi beasiswa. Temukan cara membangun prestasi akademik dan non-akademik yang relevan.",
      category: "Motivasi",
      readTime: "8 menit",
      date: "28 September 2025",
      image: "🏆",
      color: "from-yellow-500 to-amber-600"
    }
  ];

  const filteredArticles = selectedCategory === 'Semua' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticle = articles[0];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 fixed h-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-800">BeasiswaKu</span>
        </div>

        <nav className="space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <BookOpen className="w-5 h-5" />
            Beranda
          </Link>
          <Link href="/cari-beasiswa" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Search className="w-5 h-5" />
            Cari Beasiswa
          </Link>
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Artikel & Tips Beasiswa</h1>
          <p className="text-gray-600">Pelajari tips dan strategi untuk meningkatkan peluang mendapatkan beasiswa</p>
        </div>

        {/* Featured Article */}
        <div className={`bg-gradient-to-r ${featuredArticle.color} rounded-2xl p-8 mb-8 text-white relative overflow-hidden`}>
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-white text-gray-800 text-xs font-semibold rounded-full">
              ⭐ Artikel Unggulan
            </span>
          </div>
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4" />
              <span className="text-sm font-semibold">{featuredArticle.category}</span>
            </div>
            <h2 className="text-3xl font-bold mb-3">{featuredArticle.title}</h2>
            <p className="text-white/90 mb-6 text-lg">
              {featuredArticle.excerpt}
            </p>
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{featuredArticle.readTime} baca</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{featuredArticle.date}</span>
              </div>
            </div>
            <Link href={`/artikel/${featuredArticle.id}`} className="px-6 py-3 bg-white text-gray-800 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2 inline-flex">
              Baca Artikel
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 opacity-20 text-8xl">
            {featuredArticle.image}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{articles.length}</p>
                <p className="text-sm text-gray-600">Total Artikel</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">1.2K</p>
                <p className="text-sm text-gray-600">Pembaca</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Tag className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{categories.length - 1}</p>
                <p className="text-sm text-gray-600">Kategori</p>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {selectedCategory === 'Semua' ? 'Semua Artikel' : `Artikel ${selectedCategory}`}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {filteredArticles.slice(1).map(article => (
            <div key={article.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition group">
              <div className={`h-48 bg-gradient-to-r ${article.color} p-6 flex items-center justify-center relative overflow-hidden`}>
                <div className="text-7xl opacity-80">{article.image}</div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 text-gray-800 text-xs font-semibold rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition">
                  {article.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                </div>
                <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}