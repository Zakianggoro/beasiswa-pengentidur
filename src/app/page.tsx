// app/page.tsx
'use client';

import React, { useState } from 'react';
import { Search, Bell, User, BookOpen, GraduationCap, TrendingUp, Calendar, MapPin, DollarSign, Home, NotebookText } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const featuredScholarships = [
    {
      id: 1,
      title: "Beasiswa Unggulan Kemendikbud 2025",
      provider: "Kementerian Pendidikan",
      deadline: "31 Desember 2025",
      amount: "Full Tuition + Living Cost",
      location: "Indonesia",
      color: "from-orange-400 to-red-500"
    },
    // {
    //   id: 2,
    //   title: "LPDP Scholarship Program",
    //   provider: "LPDP Indonesia",
    //   deadline: "15 Januari 2026",
    //   amount: "Full Funded",
    //   location: "Global",
    //   color: "from-blue-500 to-blue-700"
    // },
    // {
    //   id: 3,
    //   title: "Chevening Scholarship UK",
    //   provider: "UK Government",
    //   deadline: "8 November 2025",
    //   amount: "£18,000/year",
    //   location: "United Kingdom",
    //   color: "from-purple-500 to-indigo-600"
    // }
  ];

  const categories = [
    { name: "S1 / Sarjana", icon: BookOpen, count: 127, color: "bg-blue-500" },
    { name: "S2 / Master", icon: GraduationCap, count: 89, color: "bg-purple-500" },
    { name: "S3 / Doktor", icon: TrendingUp, count: 45, color: "bg-orange-500" },
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
          <a href="/" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
            <Home className="w-5 h-5" />
            Beranda
          </a>
          <a href="/cari-beasiswa" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Search className="w-5 h-5" />
            Cari Beasiswa
          </a>
          <a href="/artikel" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <NotebookText className="w-5 h-5" />
            Artikel
          </a>
          <a href="/deadline" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5" />
            Deadline
          </a>
          <a href="/bebot" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
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

        {/* Hero Banner */}
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

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Kategori Beasiswa</h3>
          <div className="grid grid-cols-4 gap-4">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 hover:shadow-lg transition cursor-pointer border border-gray-200">
                <div className={`w-12 h-12 ${cat.color} rounded-lg flex items-center justify-center mb-4`}>
                  <cat.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{cat.name}</h4>
                <p className="text-sm text-gray-500">{cat.count} Beasiswa</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Scholarships */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Beasiswa Unggulan</h3>
            <Link href="/cari-beasiswa" className="text-blue-600 font-semibold hover:text-blue-700">
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {featuredScholarships.map((scholarship, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition border border-gray-200">
                <div className={`h-32 bg-gradient-to-r ${scholarship.color} p-6 flex items-center justify-center`}>
                  <GraduationCap className="w-16 h-16 text-white opacity-80" />
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-lg text-gray-800 mb-2">{scholarship.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{scholarship.provider}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline: {scholarship.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span>{scholarship.amount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{scholarship.location}</span>
                    </div>
                  </div>
                  <Link
                    href={`/recommendation/${scholarship.id}`}
                    className="block w-full py-2 bg-blue-600 text-white rounded-lg font-semibold text-center hover:bg-blue-700 transition"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
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