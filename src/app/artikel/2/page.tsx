'use client'

import React from 'react';
import { BookOpen, Search, Calendar, User, Clock, ArrowLeft, Home, NotebookText, Menu, X, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function ArtikelInterviewPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

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
            <p className="text-xs opacity-90">Siapkan diri sebelum interview dimulai!</p>
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
        <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
          <Link href="/artikel" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Artikel
          </Link>
        </div>

        {/* Header Section with Background Image */}
        <div
          className="relative px-4 md:px-8 py-12 md:py-16 text-white overflow-hidden"
          style={{
            backgroundImage: "url('/components/placeholder/image2.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                Persiapan Beasiswa
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                💼 Panduan Lengkap
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              Cara Mempersiapkan Interview Beasiswa: Dari Riset hingga Follow-up
            </h1>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 md:w-5 md:h-5" />
                <span>10 menit baca</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                <span>18 Oktober 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 md:w-5 md:h-5" />
                <span>Tim BeasiswaKu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="px-4 md:px-8 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Main Article */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-4 md:p-8 border border-gray-200 mb-6">
                  {/* Introduction */}
                  <div className="prose prose-lg max-w-none mb-8">
                    <p className="text-gray-700 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                    </p>
                  </div>

                  {/* Tips Section */}
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Lorem Ipsum Dolor Sit Amet</h2>
                          <p className="text-gray-700 leading-relaxed">
                            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            Quis nostrud exercitation ullamco laboris:
                          </p>
                          <ul className="list-disc ml-5 text-gray-700 leading-relaxed">
                            <li>Nisi ut aliquip ex ea commodo consequat</li>
                            <li>Duis aute irure dolor in reprehenderit</li>
                            <li>Voluptate velit esse cillum dolore</li>
                          </ul>
                          <p className="text-gray-700 leading-relaxed">
                            💡 Contoh:
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">2</span>
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Nemo Enim Ipsam Voluptatem</h2>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            Quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                          </p>
                          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                            <p className="text-sm text-gray-700 italic">
                              <strong>Contoh:</strong><br/>
                              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">3</span>
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Ut Labore et Dolore Magnam</h2>
                          <p className="text-gray-700 leading-relaxed">
                            Aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">4</span>
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Quis Autem Vel Eum Iure</h2>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            Reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-red-50 border border-red-200 p-4 rounded">
                              <p className="text-xs font-semibold text-red-700 mb-2">❌ JANGAN:</p>
                              <p className="text-sm text-gray-700">At vero eos et accusamus et iusto odio.</p>
                            </div>
                            <div className="bg-green-50 border border-green-200 p-4 rounded">
                              <p className="text-xs font-semibold text-green-700 mb-2">✅ LAKUKAN:</p>
                              <p className="text-sm text-gray-700">Dignissimos ducimus qui blanditiis praesentium voluptatum.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">5</span>
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Deleniti Atque Corrupti</h2>
                          <p className="text-gray-700 leading-relaxed">
                            Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">6</span>
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Temporibus Autem Quibusdam</h2>
                          <p className="text-gray-700 leading-relaxed">
                            Et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">7</span>
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Itaque Earum Rerum Hic</h2>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            Tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li><strong>Nam libero tempore:</strong> Cum soluta nobis est eligendi optio</li>
                            <li><strong>Cumque nihil impedit:</strong> Quo minus id quod maxime placeat</li>
                            <li><strong>Facere possimus:</strong> Omnis voluptas assumenda est</li>
                            <li><strong>Omnis dolor:</strong> Repellendus temporibus autem quibusdam</li>
                            <li><strong>Et aut officiis:</strong> Debitis aut rerum necessitatibus</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">8</span>
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Hanc Ego Cum Teneam</h2>
                          <p className="text-gray-700 leading-relaxed">
                            Sentiam quid idem sentiant? An nisi populari fama? Sine molestia? Itaque hoc frequenter dici solet a vobis, non intellegere nos.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">9</span>
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Sed Ut Perspiciatis Unde</h2>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            Omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
                          </p>
                          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                            <p className="text-sm text-gray-700">
                              <strong>💡 Pro Tip:</strong> Quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">10</span>
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Neque Porro Quisquam Est</h2>
                          <p className="text-gray-700 leading-relaxed">
                            Qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Conclusion */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Kesimpulan</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                      <p className="font-semibold mb-2">🚀 Lorem Ipsum Dolor Sit Amet?</p>
                      <p className="text-sm text-white/90 mb-4">
                        Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam!
                      </p>
                      <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition">
                        Cari Beasiswa Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-8 space-y-6">
                  {/* Table of Contents */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">Daftar Isi</h3>
                    <nav className="space-y-2">
                      <p className="block text-sm text-gray-600">1. Lorem Ipsum Dolor Sit Amet</p>
                      <p className="block text-sm text-gray-600">2. Nemo Enim Ipsam Voluptatem</p>
                      <p className="block text-sm text-gray-600">3. Ut Labore et Dolore Magnam</p>
                      <p className="block text-sm text-gray-600">4. Quis Autem Vel Eum Iure</p>
                      <p className="block text-sm text-gray-600">5. Deleniti Atque Corrupti</p>
                      <p className="block text-sm text-gray-600">6. Temporibus Autem Quibusdam</p>
                      <p className="block text-sm text-gray-600">7. Itaque Earum Rerum Hic</p>
                      <p className="block text-sm text-gray-600">8. Hanc Ego Cum Teneam</p>
                      <p className="block text-sm text-gray-600">9. Sed Ut Perspiciatis Unde</p>
                      <p className="block text-sm text-gray-600">10. Neque Porro Quisquam Est</p>
                    </nav>
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