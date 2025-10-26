'use client'

import React, { useState } from 'react';
import { BookOpen, Search, Calendar, User, Clock, ArrowRight, Tag, Home, NotebookText, Menu, X, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ArtikelPage() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      imageUrl: "/components/placeholder/image1.jpg",
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
      imageUrl: "/components/placeholder/image2.jpg",
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
      imageUrl: "/components/placeholder/image3.jpg",
      color: "from-green-400 to-teal-500"
    }
  ];

  const filteredArticles = selectedCategory === 'Semua' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticle = articles[0];

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
          <Link href="/cari-beasiswa" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Search className="w-5 h-5" />
            <span>Cari Beasiswa</span>
          </Link>
          <Link href="/artikel" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Artikel & Tips Beasiswa</h1>
            <p className="text-gray-600 text-sm md:text-base">Pelajari tips dan strategi untuk meningkatkan peluang mendapatkan beasiswa</p>
          </div>

          {/* Featured Article */}
          <div className="relative rounded-xl md:rounded-2xl overflow-hidden mb-6 md:mb-8 h-64 md:h-80 lg:h-96">
            <Image 
              src={featuredArticle.imageUrl} 
              alt={featuredArticle.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            <div className="absolute inset-0 p-4 md:p-6 lg:p-8 flex items-center">
              <div className="relative z-10 max-w-3xl text-white">
                <div className="mb-3">
                  <span className="px-3 py-1 bg-white text-gray-800 text-xs font-semibold rounded-full">
                    ⭐ Artikel Unggulan
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <Tag className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm font-semibold">{featuredArticle.category}</span>
                </div>
                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3">{featuredArticle.title}</h2>
                <p className="hidden md:block text-white/90 mb-4 md:mb-6 text-sm md:text-base lg:text-lg">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center gap-3 md:gap-6 mb-4 md:mb-6 text-xs md:text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{featuredArticle.readTime} baca</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{featuredArticle.date}</span>
                  </div>
                </div>
                <Link href={`/artikel/${featuredArticle.id}`} className="px-4 md:px-6 py-2 md:py-3 bg-white text-gray-800 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2 inline-flex text-sm md:text-base">
                  Baca Artikel
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-medium transition text-sm md:text-base ${
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-gray-800">{articles.length}</p>
                  <p className="text-xs md:text-sm text-gray-600">Total Artikel</p>
                </div>
              </div>
            </div>
          </div>
        
          {/* Articles Grid */}
          <div className="mb-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
              {selectedCategory === 'Semua' ? 'Semua Artikel' : `Artikel ${selectedCategory}`}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {filteredArticles.slice(1).map(article => (
              <div key={article.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition group">
                <div className={`h-40 md:h-48 bg-gradient-to-r ${article.color} p-4 md:p-6 flex items-center justify-center relative overflow-hidden`}>
                  <Image 
                    src={article.imageUrl} 
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 md:top-4 right-3 md:right-4">
                    <span className="px-2 md:px-3 py-1 bg-white/90 text-gray-800 text-xs font-semibold rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h4 className="font-bold text-base md:text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition">
                    {article.title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3 md:mb-4">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <Clock className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <Link href={`/artikel/${article.id}`} className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm md:text-base">
                    Baca Selengkapnya
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {filteredArticles.length > 6 && (
            <div className="mt-6 md:mt-8 text-center">
              <button className="px-6 md:px-8 py-2.5 md:py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition text-sm md:text-base">
                Muat Lebih Banyak Artikel
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}