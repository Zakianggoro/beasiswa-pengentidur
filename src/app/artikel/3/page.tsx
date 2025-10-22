'use client'

import React from 'react';
import { BookOpen, Search, Calendar, User, Clock, ArrowLeft, Home, NotebookText } from 'lucide-react';
import Link from 'next/link';

export default function ChecklistDokumenPage() {
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
            <Home className="w-5 h-5" />
            Beranda
          </Link>
          <Link href="/cari-beasiswa" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Search className="w-5 h-5" />
            Cari Beasiswa
          </Link>
          <Link href="/artikel" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
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
            <p className="text-sm font-semibold mb-1">📂 Tips Hari Ini</p>
            <p className="text-xs opacity-90">Pastikan semua dokumenmu sudah lengkap!</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        {/* Back Button */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <Link
            href="/artikel"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Artikel
          </Link>
        </div>

        {/* Header Section with Background Image */}
        <div
          className="relative px-8 py-16 text-white overflow-hidden"
          style={{
            backgroundImage: "url('/components/placeholder/image3.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                Panduan Beasiswa
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                🧾 Dokumen Wajib
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Checklist Dokumen Beasiswa Lengkap: Jangan Sampai Ada yang Terlewat
            </h1>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>8 menit baca</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>18 Oktober 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>Tim BeasiswaKu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="px-8 py-12">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
            {/* Main Article */}
            <div className="col-span-2">
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Salah satu kesalahan paling umum dalam pendaftaran beasiswa adalah kelalaian dalam menyiapkan dokumen. Padahal, dokumen yang rapi dan lengkap adalah kunci untuk memberikan kesan profesional kepada reviewer. Artikel ini membantu kamu memastikan tidak ada satu pun dokumen penting yang terlewat.
                  </p>
                </div>

                {/* Steps */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">1. Dokumen Identitas Diri</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Siapkan KTP, paspor, atau kartu pelajar yang masih berlaku. Pastikan data diri sesuai dengan dokumen lain seperti ijazah atau transkrip nilai.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">2. Ijazah dan Transkrip Nilai</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Dokumen akademik ini menjadi bukti prestasi kamu. Gunakan versi legalisir untuk menunjukkan keaslian dokumen.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                      <p className="text-sm text-gray-700">
                        💡 <strong>Tip:</strong> Jika masih kuliah, mintalah surat keterangan aktif kuliah dari kampusmu.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">3. Curriculum Vitae (CV)</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Buat CV singkat, padat, dan profesional. Tampilkan pengalaman akademik, organisasi, dan prestasi relevan yang mendukung profil beasiswa kamu.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">4. Motivation Letter / Personal Statement</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Tulis alasan kuat mengapa kamu layak mendapatkan beasiswa. Ceritakan tujuan akademik dan dampak yang ingin kamu ciptakan setelah lulus.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">5. Surat Rekomendasi</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Minta rekomendasi dari dosen, pembimbing, atau atasan yang mengenal kinerjamu dengan baik. Pastikan surat ditandatangani dan berstempel resmi.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">6. Sertifikat Pendukung</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Lampirkan sertifikat pelatihan, seminar, atau lomba yang relevan untuk memperkuat portofolio kamu.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">7. Bukti Kemampuan Bahasa</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Untuk beasiswa internasional, lampirkan hasil TOEFL, IELTS, atau sertifikasi bahasa resmi lainnya.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">8. Portofolio (Jika Diperlukan)</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Untuk jurusan kreatif atau profesional tertentu, siapkan portofolio yang mencerminkan kemampuan dan gaya kerja kamu.
                    </p>
                  </div>
                </div>

                {/* Conclusion */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Kesimpulan</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Dokumen bukan hanya formalitas, tapi representasi dari kesiapan dan profesionalitas kamu sebagai calon penerima beasiswa. Gunakan checklist ini untuk memastikan semuanya siap sebelum tenggat waktu.
                  </p>
                  <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                    <p className="font-semibold mb-2">📎 Siap Mengirim Dokumen?</p>
                    <p className="text-sm text-white/90 mb-4">
                      Lengkapi semua berkasmu dan pastikan tidak ada yang terlewat — satu kesalahan kecil bisa berdampak besar!
                    </p>
                    <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition">
                      Cek Beasiswa Aktif
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Table of Contents */}
            <div className="col-span-1">
              <div className="sticky top-8 space-y-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-4">Daftar Isi</h3>
                  <nav className="space-y-2 text-sm text-gray-600">
                    <p>1. Dokumen Identitas Diri</p>
                    <p>2. Ijazah dan Transkrip Nilai</p>
                    <p>3. Curriculum Vitae (CV)</p>
                    <p>4. Motivation Letter / Personal Statement</p>
                    <p>5. Surat Rekomendasi</p>
                    <p>6. Sertifikat Pendukung</p>
                    <p>7. Bukti Kemampuan Bahasa</p>
                    <p>8. Portofolio (Jika Diperlukan)</p>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
