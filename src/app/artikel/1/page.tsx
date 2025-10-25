'use client'

import React, { useState } from 'react';
import { BookOpen, Search, Calendar, User, Clock, ArrowLeft, Home, NotebookText, Menu, X, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function ArtikelReadPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <div className="hidden lg:block lg:col-span-1">
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
      </div>

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
          <Link href="/artikel" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            Kembali ke Artikel
          </Link>
        </div>

        {/* Header Section with Background Image */}
        <div
          className="relative px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16 text-white overflow-hidden"
          style={{
            backgroundImage: "url('/components/placeholder/image1.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <span className="px-2 md:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm font-semibold">
                Tips Essay
              </span>
              <span className="px-2 md:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm font-semibold">
                ⭐ Artikel Unggulan
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              10 Tips Menulis Essay Beasiswa yang Menarik Perhatian Reviewer
            </h1>
            <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm md:text-base text-white/90">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 md:w-5 md:h-5" />
                <span>8 menit baca</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                <span>15 Oktober 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 md:w-5 md:h-5" />
                <span>Tim BeasiswaKu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 md:gap-8">
              {/* Main Article */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-4 md:p-6 lg:p-8 border border-gray-200 mb-6">
                  {/* Introduction */}
                  <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none mb-6 md:mb-8">
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      Essay adalah salah satu komponen terpenting dalam aplikasi beasiswa. Sebuah essay yang baik dapat membedakan Anda dari ratusan atau bahkan ribuan kandidat lainnya. Essay memberikan kesempatan bagi reviewer untuk mengenal Anda secara personal motivasi, pengalaman, dan visi masa depan Anda.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      Namun, menulis essay yang menarik perhatian reviewer bukanlah hal yang mudah. Dibutuhkan strategi, persiapan, dan pemahaman yang baik tentang apa yang dicari oleh pemberi beasiswa. Berikut adalah 10 tips yang akan membantu Anda menulis essay beasiswa yang powerful dan memorable.
                    </p>
                  </div>

                  {/* Tips Section */}
                  <div className="space-y-6 md:space-y-8">
                    {/* Tip 1 */}
                    <div>
                      <div className="flex items-start gap-3 md:gap-4 mb-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm md:text-base">1</span>
                        </div>
                        <div>
                          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">Pahami Pertanyaan dengan Benar</h2>
                          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                            Sebelum mulai menulis, luangkan waktu untuk benar-benar memahami apa yang ditanyakan. Baca pertanyaan berkali-kali dan identifikasi kata kunci penting. Apakah mereka meminta Anda menjelaskan motivasi, pengalaman, atau rencana masa depan? Pastikan essay Anda menjawab pertanyaan dengan tepat dan tidak keluar dari topik.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tip 2 */}
                    <div>
                      <div className="flex items-start gap-3 md:gap-4 mb-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm md:text-base">2</span>
                        </div>
                        <div>
                          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">Buat Opening yang Kuat</h2>
                          <p className="text-gray-700 leading-relaxed mb-3 text-sm md:text-base">
                            {'Paragraf pertama adalah kesempatan Anda untuk menarik perhatian reviewer. Mulailah dengan sesuatu yang menarik—bisa berupa anekdot personal, pertanyaan retoris, atau pernyataan yang mengejutkan. Hindari opening yang klise seperti "Sejak kecil saya bermimpi..." atau "Saya tertarik untuk..."'}
                          </p>
                          <div className="bg-blue-50 border-l-4 border-blue-600 p-3 md:p-4 rounded">
                            <p className="text-xs md:text-sm text-gray-700 italic">
                              <strong>Contoh Opening yang Baik:</strong><br/>
                              Ketika saya melihat ibu saya menangis karena tidak mampu membayar biaya pengobatan adik saya, saat itulah saya memutuskan untuk menjadi dokter yang tidak hanya mengobati penyakit, tetapi juga memberikan akses kesehatan yang terjangkau bagi masyarakat.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tip 3 */}
                    <div>
                      <div className="flex items-start gap-3 md:gap-4 mb-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm md:text-base">3</span>
                        </div>
                        <div>
                          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">Ceritakan Kisah yang Autentik</h2>
                          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                            Reviewer membaca ratusan essay setiap hari. Apa yang membuat essay Anda berbeda adalah keaslian cerita Anda. Jangan mencoba menjadi orang lain atau menulis apa yang Anda pikir mereka ingin dengar. Ceritakan pengalaman nyata Anda, tantangan yang Anda hadapi, dan bagaimana hal tersebut membentuk diri Anda.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tip 4 */}
                    <div>
                      <div className="flex items-start gap-3 md:gap-4 mb-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm md:text-base">4</span>
                        </div>
                        <div>
                          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">Tunjukkan, Jangan Hanya Memberitahu</h2>
                          <p className="text-gray-700 leading-relaxed mb-3 text-sm md:text-base">
                            {'Alih-alih menulis "Saya adalah orang yang gigih," tunjukkan kegigihan Anda melalui contoh konkret. Misalnya, ceritakan bagaimana Anda bekerja paruh waktu sambil kuliah untuk membiayai pendidikan, atau bagaimana Anda terus mencoba meskipun gagal berkali-kali.'}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            <div className="bg-red-50 border border-red-200 p-3 md:p-4 rounded">
                              <p className="text-xs font-semibold text-red-700 mb-2">❌ JANGAN:</p>
                              <p className="text-xs md:text-sm text-gray-700">Saya sangat termotivasi dan pekerja keras.</p>
                            </div>
                            <div className="bg-green-50 border border-green-200 p-3 md:p-4 rounded">
                              <p className="text-xs font-semibold text-green-700 mb-2">✅ LAKUKAN:</p>
                              <p className="text-xs md:text-sm text-gray-700">Saya bangun pukul 4 pagi setiap hari untuk belajar sebelum bekerja 8 jam di toko keluarga.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tip 5 */}
                    <div>
                      <div className="flex items-start gap-3 md:gap-4 mb-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm md:text-base">5</span>
                        </div>
                        <div>
                          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">Hubungkan dengan Tujuan Beasiswa</h2>
                          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                            Setiap beasiswa memiliki visi dan misi tertentu. Lakukan riset tentang pemberi beasiswa dan pahami nilai-nilai yang mereka junjung. Tunjukkan bagaimana latar belakang, pengalaman, dan tujuan Anda sejalan dengan misi mereka. Ini menunjukkan bahwa Anda serius dan telah mempersiapkan diri dengan baik.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tip 6 */}
                    <div>
                      <div className="flex items-start gap-3 md:gap-4 mb-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm md:text-base">6</span>
                        </div>
                        <div>
                          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">Fokus pada Dampak dan Kontribusi</h2>
                          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                            Pemberi beasiswa ingin tahu bahwa investasi mereka akan memberikan dampak positif. Jelaskan bagaimana pendidikan yang Anda terima akan digunakan untuk memberikan kontribusi kepada masyarakat, negara, atau bidang studi Anda. Tunjukkan visi jangka panjang Anda dengan konkret dan realistis.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tip 7 */}
                    <div>
                      <div className="flex items-start gap-3 md:gap-4 mb-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm md:text-base">7</span>
                        </div>
                        <div>
                          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">Perhatikan Struktur dan Flow</h2>
                          <p className="text-gray-700 leading-relaxed mb-3 text-sm md:text-base">
                            Essay yang baik memiliki struktur yang jelas: opening yang menarik, body yang informatif, dan closing yang kuat. Pastikan setiap paragraf terhubung dengan baik dan ada transisi yang smooth. Gunakan struktur berikut:
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2 md:ml-4 text-sm md:text-base">
                            <li><strong>Introduction:</strong> Hook pembaca dengan opening yang menarik</li>
                            <li><strong>Body 1:</strong> Latar belakang dan pengalaman yang relevan</li>
                            <li><strong>Body 2:</strong> Motivasi dan alasan memilih program/bidang studi</li>
                            <li><strong>Body 3:</strong> Tujuan masa depan dan kontribusi</li>
                            <li><strong>Conclusion:</strong> Rangkum dan tinggalkan kesan yang kuat</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Tip 8 */}
                    <div>
                      <div className="flex items-start gap-3 md:gap-4 mb-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm md:text-base">8</span>
                        </div>
                        <div>
                          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">Gunakan Bahasa yang Jelas dan Profesional</h2>
                          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                            Hindari bahasa yang terlalu formal atau bertele-tele. Gunakan kalimat yang clear, concise, dan easy to understand. Hindari juga penggunaan jargon yang berlebihan kecuali jika memang diperlukan. Tulis dengan gaya yang mencerminkan kepribadian Anda, tetapi tetap profesional.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tip 9 */}
                    <div>
                      <div className="flex items-start gap-3 md:gap-4 mb-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm md:text-base">9</span>
                        </div>
                        <div>
                          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">Edit, Edit, dan Edit Lagi</h2>
                          <p className="text-gray-700 leading-relaxed mb-3 text-sm md:text-base">
                            Draft pertama tidak akan pernah sempurna. Setelah menulis, sisihkan essay Anda selama beberapa hari, lalu baca kembali dengan mata segar. Perhatikan grammar, typo, dan flow. Minta feedback dari teman, dosen, atau mentor yang Anda percaya. Revisi adalah kunci untuk menghasilkan essay yang berkualitas.
                          </p>
                          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-3 md:p-4 rounded">
                            <p className="text-xs md:text-sm text-gray-700">
                              <strong>💡 Pro Tip:</strong> Baca essay Anda dengan suara keras. Ini membantu Anda mendeteksi kalimat yang awkward atau tidak natural.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tip 10 */}
                    <div>
                      <div className="flex items-start gap-3 md:gap-4 mb-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm md:text-base">10</span>
                        </div>
                        <div>
                          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">Tutup dengan Impact</h2>
                          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                            Paragraf terakhir Anda harus meninggalkan kesan yang lasting. Jangan hanya merangkum apa yang sudah Anda tulis. Tutup dengan statement yang powerful yang menunjukkan determinasi, passion, dan komitmen Anda. Buat reviewer mengingat essay Anda bahkan setelah membaca ratusan essay lainnya.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Conclusion */}
                  <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-200">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">Kesimpulan</h2>
                    <p className="text-gray-700 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                      Menulis essay beasiswa yang menarik membutuhkan waktu, usaha, dan introspeksi. Tetapi dengan mengikuti tips di atas, Anda dapat menghasilkan essay yang tidak hanya informatif, tetapi juga inspiring dan memorable. Ingat, essay Anda adalah kesempatan untuk menunjukkan siapa diri Anda yang sebenarnya dan mengapa Anda layak mendapatkan beasiswa tersebut.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      Jangan takut untuk menunjukkan kerentanan dan kejujuran Anda. Reviewer mencari kandidat yang autentik, passionate, dan memiliki visi yang jelas. Mulai menulis dari sekarang, dan ingat—setiap kata yang Anda tulis adalah investasi untuk masa depan Anda.
                    </p>
                    <div className="mt-4 md:mt-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 md:p-6 text-white">
                      <p className="font-semibold mb-2 text-sm md:text-base">🚀 Siap Mulai Menulis Essay Beasiswa Anda?</p>
                      <p className="text-xs md:text-sm text-white/90 mb-3 md:mb-4">
                        Gunakan tips ini sebagai panduan dan mulai draft essay Anda hari ini. Semakin cepat Anda mulai, semakin banyak waktu untuk revisi dan penyempurnaan!
                      </p>
                      <button className="px-4 md:px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition text-sm md:text-base">
                        Cari Beasiswa Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - Table of Contents */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-8 space-y-6">
                  {/* Table of Contents */}
                  <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-3 md:mb-4 text-base md:text-lg">Daftar Isi</h3>
                    <nav className="space-y-2">
                      <p className="block text-xs md:text-sm text-gray-600">1. Pahami Pertanyaan dengan Benar</p>
                      <p className="block text-xs md:text-sm text-gray-600">2. Buat Opening yang Kuat</p>
                      <p className="block text-xs md:text-sm text-gray-600">3. Ceritakan Kisah yang Autentik</p>
                      <p className="block text-xs md:text-sm text-gray-600">4. Tunjukkan, Jangan Hanya Memberitahu</p>
                      <p className="block text-xs md:text-sm text-gray-600">5. Hubungkan dengan Tujuan Beasiswa</p>
                      <p className="block text-xs md:text-sm text-gray-600">6. Fokus pada Dampak dan Kontribusi</p>
                      <p className="block text-xs md:text-sm text-gray-600">7. Perhatikan Struktur dan Flow</p>
                      <p className="block text-xs md:text-sm text-gray-600">8. Gunakan Bahasa yang Jelas</p>
                      <p className="block text-xs md:text-sm text-gray-600">9. Edit, Edit, dan Edit Lagi</p>
                      <p className="block text-xs md:text-sm text-gray-600">10. Tutup dengan Impact</p>
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