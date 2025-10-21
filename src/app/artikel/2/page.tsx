'use client'

import React from 'react';
import { BookOpen, Search, Bell, Calendar, User, Clock, ArrowLeft, Home, NotebookText } from 'lucide-react';
import Link from 'next/link';

export default function ArtikelInterviewPage() {
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
            <p className="text-xs opacity-90">Siapkan diri sebelum interview dimulai!</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        {/* Back Button */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <Link href="/artikel" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Artikel
          </Link>
        </div>
        {/* Header Section with Background Image */}
        <div
          className="relative px-8 py-16 text-white overflow-hidden"
          style={{
            backgroundImage: "url('/components/placeholder/image2.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                Persiapan Beasiswa
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                💼 Panduan Lengkap
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Cara Mempersiapkan Interview Beasiswa: Dari Riset hingga Follow-up
            </h1>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>10 menit baca</span>
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
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-8">
              {/* Main Article */}
              <div className="col-span-2">
                <div className="bg-white rounded-xl p-8 border border-gray-200 mb-6">
                  {/* Introduction */}
                  <div className="prose prose-lg max-w-none mb-8">
                    <p className="text-gray-700 leading-relaxed">
                      Tahap interview adalah momen krusial dalam proses seleksi beasiswa. Setelah berhasil melewati tahap administrasi dan essay, kini saatnya Anda meyakinkan reviewer secara langsung bahwa Anda memang layak mendapatkan kesempatan tersebut.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Banyak kandidat merasa gugup atau tidak tahu harus mulai dari mana. Padahal, dengan persiapan yang matang, sesi interview bisa menjadi ajang untuk menunjukkan kepribadian, visi, dan potensi Anda dengan cara yang paling autentik.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Berikut panduan lengkap untuk membantu Anda mempersiapkan interview beasiswa dari awal hingga tahap follow-up.
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
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">Pahami Profil dan Nilai Pemberi Beasiswa</h2>
                          <p className="text-gray-700 leading-relaxed">
                            Sebelum menjawab satu pun pertanyaan, pastikan Anda benar-benar mengenal siapa yang memberikan beasiswa tersebut.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            Pelajari hal-hal berikut:
                          </p>
                          <ul className="list-disc ml-5 text-gray-700 leading-relaxed">
                            <li>Apa visi dan misi lembaga atau universitasnya?</li>
                            <li>Apa tujuan program beasiswa ini dibentuk?</li>
                            <li>Siapa tipe penerima beasiswa yang mereka cari?</li>
                          </ul>
                          <p className="text-gray-700 leading-relaxed">
                            💡 Contoh:
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            Jika beasiswa fokus pada kepemimpinan sosial, siapkan contoh konkret bagaimana Anda memimpin tim atau membuat dampak sosial di lingkungan Anda. Jika program menekankan riset ilmiah, soroti proyek penelitian Anda dan bagaimana hal itu berkontribusi bagi bidang studi tertentu.
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
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">Buat Opening yang Kuat</h2>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            Paragraf pertama adalah kesempatan Anda untuk menarik perhatian reviewer. Mulailah dengan sesuatu yang menarik—bisa berupa anekdot personal, pertanyaan retoris, atau pernyataan yang mengejutkan. Hindari opening yang klise seperti "Sejak kecil saya bermimpi..." atau "Saya tertarik untuk..."
                          </p>
                          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                            <p className="text-sm text-gray-700 italic">
                              <strong>Contoh Opening yang Baik:</strong><br/>
                              "Ketika saya melihat ibu saya menangis karena tidak mampu membayar biaya pengobatan adik saya, saat itulah saya memutuskan untuk menjadi dokter yang tidak hanya mengobati penyakit, tetapi juga memberikan akses kesehatan yang terjangkau bagi masyarakat."
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
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ceritakan Kisah yang Autentik</h2>
                          <p className="text-gray-700 leading-relaxed">
                            Reviewer membaca ratusan essay setiap hari. Apa yang membuat essay Anda berbeda adalah keaslian cerita Anda. Jangan mencoba menjadi orang lain atau menulis apa yang Anda pikir mereka ingin dengar. Ceritakan pengalaman nyata Anda, tantangan yang Anda hadapi, dan bagaimana hal tersebut membentuk diri Anda.
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
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tunjukkan, Jangan Hanya Memberitahu</h2>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            Alih-alih menulis "Saya adalah orang yang gigih," tunjukkan kegigihan Anda melalui contoh konkret. Misalnya, ceritakan bagaimana Anda bekerja paruh waktu sambil kuliah untuk membiayai pendidikan, atau bagaimana Anda terus mencoba meskipun gagal berkali-kali.
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-red-50 border border-red-200 p-4 rounded">
                              <p className="text-xs font-semibold text-red-700 mb-2">❌ JANGAN:</p>
                              <p className="text-sm text-gray-700">"Saya sangat termotivasi dan pekerja keras."</p>
                            </div>
                            <div className="bg-green-50 border border-green-200 p-4 rounded">
                              <p className="text-xs font-semibold text-green-700 mb-2">✅ LAKUKAN:</p>
                              <p className="text-sm text-gray-700">"Saya bangun pukul 4 pagi setiap hari untuk belajar sebelum bekerja 8 jam di toko keluarga."</p>
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
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">Hubungkan dengan Tujuan Beasiswa</h2>
                          <p className="text-gray-700 leading-relaxed">
                            Setiap beasiswa memiliki visi dan misi tertentu. Lakukan riset tentang pemberi beasiswa dan pahami nilai-nilai yang mereka junjung. Tunjukkan bagaimana latar belakang, pengalaman, dan tujuan Anda sejalan dengan misi mereka. Ini menunjukkan bahwa Anda serius dan telah mempersiapkan diri dengan baik.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tip 6 */}
                    <div>
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">6</span>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">Fokus pada Dampak dan Kontribusi</h2>
                          <p className="text-gray-700 leading-relaxed">
                            Pemberi beasiswa ingin tahu bahwa investasi mereka akan memberikan dampak positif. Jelaskan bagaimana pendidikan yang Anda terima akan digunakan untuk memberikan kontribusi kepada masyarakat, negara, atau bidang studi Anda. Tunjukkan visi jangka panjang Anda dengan konkret dan realistis.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tip 7 */}
                    <div>
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">7</span>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">Perhatikan Struktur dan Flow</h2>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            Essay yang baik memiliki struktur yang jelas: opening yang menarik, body yang informatif, dan closing yang kuat. Pastikan setiap paragraf terhubung dengan baik dan ada transisi yang smooth. Gunakan struktur berikut:
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
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
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">8</span>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">Gunakan Bahasa yang Jelas dan Profesional</h2>
                          <p className="text-gray-700 leading-relaxed">
                            Hindari bahasa yang terlalu formal atau bertele-tele. Gunakan kalimat yang clear, concise, dan easy to understand. Hindari juga penggunaan jargon yang berlebihan kecuali jika memang diperlukan. Tulis dengan gaya yang mencerminkan kepribadian Anda, tetapi tetap profesional.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tip 9 */}
                    <div>
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">9</span>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">Edit, Edit, dan Edit Lagi</h2>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            Draft pertama tidak akan pernah sempurna. Setelah menulis, sisihkan essay Anda selama beberapa hari, lalu baca kembali dengan mata segar. Perhatikan grammar, typo, dan flow. Minta feedback dari teman, dosen, atau mentor yang Anda percaya. Revisi adalah kunci untuk menghasilkan essay yang berkualitas.
                          </p>
                          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                            <p className="text-sm text-gray-700">
                              <strong>💡 Pro Tip:</strong> Baca essay Anda dengan suara keras. Ini membantu Anda mendeteksi kalimat yang awkward atau tidak natural.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tip 10 */}
                    <div>
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">10</span>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tutup dengan Impact</h2>
                          <p className="text-gray-700 leading-relaxed">
                            Paragraf terakhir Anda harus meninggalkan kesan yang lasting. Jangan hanya merangkum apa yang sudah Anda tulis. Tutup dengan statement yang powerful yang menunjukkan determinasi, passion, dan komitmen Anda. Buat reviewer mengingat essay Anda bahkan setelah membaca ratusan essay lainnya.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Conclusion */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Kesimpulan</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Menulis essay beasiswa yang menarik membutuhkan waktu, usaha, dan introspeksi. Tetapi dengan mengikuti tips di atas, Anda dapat menghasilkan essay yang tidak hanya informatif, tetapi juga inspiring dan memorable. Ingat, essay Anda adalah kesempatan untuk menunjukkan siapa diri Anda yang sebenarnya dan mengapa Anda layak mendapatkan beasiswa tersebut.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Jangan takut untuk menunjukkan kerentanan dan kejujuran Anda. Reviewer mencari kandidat yang autentik, passionate, dan memiliki visi yang jelas. Mulai menulis dari sekarang, dan ingat—setiap kata yang Anda tulis adalah investasi untuk masa depan Anda.
                    </p>
                    <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                      <p className="font-semibold mb-2">🚀 Siap Mulai Menulis Essay Beasiswa Anda?</p>
                      <p className="text-sm text-white/90 mb-4">
                        Gunakan tips ini sebagai panduan dan mulai draft essay Anda hari ini. Semakin cepat Anda mulai, semakin banyak waktu untuk revisi dan penyempurnaan!
                      </p>
                      <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition">
                        Cari Beasiswa Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Table of Contents */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">Daftar Isi</h3>
                    <nav className="space-y-2">
                      <p className="block text-sm text-gray-600">1. Pahami Pertanyaan dengan Benar</p>
                      <p className="block text-sm text-gray-600">2. Buat Opening yang Kuat</p>
                      <p className="block text-sm text-gray-600">3. Ceritakan Kisah yang Autentik</p>
                      <p className="block text-sm text-gray-600">4. Tunjukkan, Jangan Hanya Memberitahu</p>
                      <p className="block text-sm text-gray-600">5. Hubungkan dengan Tujuan Beasiswa</p>
                      <p className="block text-sm text-gray-600">6. Fokus pada Dampak dan Kontribusi</p>
                      <p className="block text-sm text-gray-600">7. Perhatikan Struktur dan Flow</p>
                      <p className="block text-sm text-gray-600">8. Gunakan Bahasa yang Jelas</p>
                      <p className="block text-sm text-gray-600">9. Edit, Edit, dan Edit Lagi</p>
                      <p className="block text-sm text-gray-600">10. Tutup dengan Impact</p>
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