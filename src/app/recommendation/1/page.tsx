'use client'

import React, { useState } from 'react';
import { BookOpen, Search, Calendar, User, MapPin, DollarSign, Building2, ArrowLeft, Clock, GraduationCap, Share2, Bookmark, Home, NotebookText, Menu, X} from 'lucide-react';
import Link from 'next/link';

export default function BeasiswaDetailPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data - this will come from your database
  const beasiswaDetail = {
    name: "Beasiswa Unggulan Kemendikbud 2025",
    organizer: "Kementerian Pendidikan",
    deadline: "2025-12-31",
    type: "Full Funded",
    location: "Indonesia",
    description: "Beasiswa Unggulan adalah program beasiswa yang diberikan oleh Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia untuk mahasiswa berprestasi. Program ini bertujuan untuk meningkatkan kualitas sumber daya manusia Indonesia melalui pendidikan tinggi berkualitas.\n\nBeasiswa ini mencakup biaya pendidikan penuh dan biaya hidup selama masa studi. Penerima beasiswa akan mendapatkan dukungan finansial yang komprehensif untuk fokus pada pencapaian akademik mereka.\n\nProgram ini terbuka untuk mahasiswa yang ingin melanjutkan studi di dalam negeri maupun luar negeri dengan berbagai pilihan bidang studi yang tersedia."
  };

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

  const daysLeft = getDaysUntilDeadline(beasiswaDetail.deadline);
  const isUrgent = daysLeft <= 30 && daysLeft > 0;

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

        {/* Back Button */}
        <div className="bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 py-3 md:py-4">
          <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-orange-400 to-red-500 px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12 text-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <span className="px-2 md:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm font-semibold">
                    {beasiswaDetail.type}
                  </span>
                  {isUrgent && (
                    <span className="px-2 md:px-3 py-1 bg-red-600 rounded-full text-xs md:text-sm font-semibold">
                      ⚠️ Deadline Segera!
                    </span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">{beasiswaDetail.name}</h1>
                <p className="text-base md:text-lg lg:text-xl text-white/90 mb-4 md:mb-6">{beasiswaDetail.organizer}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-6 text-sm md:text-base text-white/90">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-sm md:text-base">Deadline: {formatDeadline(beasiswaDetail.deadline)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 md:w-5 md:h-5" />
                    <span className={`text-sm md:text-base ${isUrgent ? 'text-yellow-300 font-semibold' : ''}`}>
                      {daysLeft > 0 ? `${daysLeft} hari lagi` : 'Sudah ditutup'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 md:gap-3">
                <button className="p-2 md:p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition">
                  <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button className="p-2 md:p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition">
                  <Bookmark className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                {/* Description */}
                <div className="bg-white rounded-xl p-4 md:p-6 lg:p-8 border border-gray-200">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">Deskripsi Beasiswa</h2>
                  <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none">
                    {beasiswaDetail.description.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-white rounded-xl p-4 md:p-6 lg:p-8 border border-gray-200">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">Informasi Tambahan</h2>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">Persyaratan</h3>
                        <p className="text-xs md:text-sm text-gray-600">
                          Persyaratan lengkap akan tersedia di website resmi penyelenggara beasiswa.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">Cakupan Beasiswa</h3>
                        <p className="text-xs md:text-sm text-gray-600">
                          Tipe beasiswa ini biasanya mencakup biaya pendidikan dan biaya hidup.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 md:p-8 text-white text-center">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Tertarik dengan Beasiswa Ini?</h3>
                  <p className="text-sm md:text-base text-white/90 mb-4 md:mb-6">
                    Jangan lewatkan kesempatan emas ini! Segera siapkan dokumen aplikasi Anda.
                  </p>
                  <a 
                    href="https://www.kemdikbud.go.id" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-6 md:px-8 py-2.5 md:py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition text-sm md:text-base"
                  >
                    Daftar Sekarang
                  </a>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 lg:sticky lg:top-8">
                  <h3 className="font-bold text-gray-800 mb-4 text-base md:text-lg">Informasi Detail</h3>
                  
                  <div className="space-y-3 md:space-y-4">
                    {/* Name */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm mb-1">
                        <GraduationCap className="w-3 h-3 md:w-4 md:h-4" />
                        <span>Nama Beasiswa</span>
                      </div>
                      <p className="font-semibold text-gray-800 text-sm md:text-base">{beasiswaDetail.name}</p>
                    </div>

                    <div className="border-t border-gray-200"></div>

                    {/* Organizer */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm mb-1">
                        <Building2 className="w-3 h-3 md:w-4 md:h-4" />
                        <span>Penyelenggara</span>
                      </div>
                      <p className="font-semibold text-gray-800 text-sm md:text-base">{beasiswaDetail.organizer}</p>
                    </div>

                    <div className="border-t border-gray-200"></div>

                    {/* Deadline */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm mb-1">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                        <span>Deadline</span>
                      </div>
                      <p className="font-semibold text-gray-800 text-sm md:text-base">{formatDeadline(beasiswaDetail.deadline)}</p>
                      <p className={`text-xs md:text-sm mt-1 font-semibold ${isUrgent ? 'text-red-600' : 'text-green-600'}`}>
                        {daysLeft > 0 ? `${daysLeft} hari lagi` : 'Sudah ditutup'}
                      </p>
                    </div>

                    <div className="border-t border-gray-200"></div>

                    {/* Type */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm mb-1">
                        <DollarSign className="w-3 h-3 md:w-4 md:h-4" />
                        <span>Tipe Beasiswa</span>
                      </div>
                      <span className="inline-block px-2 md:px-3 py-1 bg-blue-100 text-blue-700 text-xs md:text-sm font-semibold rounded-full">
                        {beasiswaDetail.type}
                      </span>
                    </div>

                    <div className="border-t border-gray-200"></div>

                    {/* Location */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm mb-1">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                        <span>Lokasi</span>
                      </div>
                      <p className="font-semibold text-gray-800 text-sm md:text-base">{beasiswaDetail.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}