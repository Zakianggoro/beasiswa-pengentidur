'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import {
  LogOut,
  Plus,
  Clock,
  ShieldCheck,
  Save,
  X,
  Menu,
} from 'lucide-react';

interface Beasiswa {
  nama: string;
  organizer: string;
  deadline: string;
  tipe: string;
  lokasi: string;
  deskripsi: string;
  path: string;
  tingkat: string;
}

export default function AdminDashboard() {
  const [timeLeft, setTimeLeft] = useState(600);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<Beasiswa>({
    nama: '',
    organizer: '',
    deadline: '',
    tipe: 'Full Funded',
    lokasi: '',
    deskripsi: '',
    path: '',
    tingkat: 'S1',
  });

  // ✅ Session validation + countdown
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('adminLoggedIn');
      const loginTime = localStorage.getItem('adminLoginTime');
      if (!isLoggedIn || !loginTime) {
        window.location.href = '/admin';
        return;
      }
      const elapsed = Date.now() - parseInt(loginTime);
      const sessionLength = 10 * 60 * 1000;
      if (elapsed >= sessionLength) handleLogout();
      else setTimeLeft(Math.floor((sessionLength - elapsed) / 1000));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    window.location.href = '/';
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setSaving(true);
    setSuccess(false);

    const { error } = await supabase.from('Beasiswa').insert([
      {
        nama: formData.nama,
        organizer: formData.organizer,
        deadline: formData.deadline,
        tipe: formData.tipe,
        lokasi: formData.lokasi,
        deskripsi: formData.deskripsi,
        path: formData.path,
        tingkat: formData.tingkat,
        created_at: new Date(),
      },
    ]);

    if (error) {
      console.error('Error inserting:', error.message);
      setSaving(false);
      return;
    }

    setSuccess(true);
    setSaving(false);
    setFormData({
      nama: '',
      organizer: '',
      deadline: '',
      tipe: 'Full Funded',
      lokasi: '',
      deskripsi: '',
      path: '',
      tingkat: 'S1',
    });
    setTimeout(() => setSuccess(false), 3000);
  };

  // Beasiswa list management
    const [beasiswaList, setBeasiswaList] = useState<(Beasiswa & { id: number })[]>([]);
    const [search, setSearch] = useState('');

    // Fetch all data
    const fetchBeasiswa = async () => {
    const { data, error } = await supabase.from('Beasiswa').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error fetching data:', error.message);
    else setBeasiswaList(data || []);
    };

    // Delete beasiswa by ID
    const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus beasiswa ini?')) return;

    const { error } = await supabase.from('Beasiswa').delete().eq('id', id);
    if (error) {
        console.error('Error deleting:', error.message);
        return;
    }

    setBeasiswaList((prev) => prev.filter((b) => b.id !== id));
    alert('Beasiswa berhasil dihapus!');
    };

    // Derived filtered list
    const filteredBeasiswa = beasiswaList.filter((b) =>
    b.nama.toLowerCase().includes(search.toLowerCase()) ||
    b.organizer.toLowerCase().includes(search.toLowerCase())
    );

    // Fetch on mount
    useEffect(() => {
    fetchBeasiswa();
    }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white border-r border-gray-200 p-6 fixed h-full z-50 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 lg:hidden hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-800">Admin Panel</span>
        </div>

        <nav className="space-y-2">
          <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
            <Plus className="w-5 h-5" />
            <span>Tambah Beasiswa</span>
          </div>
        </nav>

        {/* Session Timer */}
        <div className="absolute bottom-24 left-6 right-6">
          <div
            className={`rounded-xl p-4 text-white ${
              timeLeft <= 120
                ? 'bg-red-500'
                : 'bg-gradient-to-br from-orange-500 to-red-500'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5" />
              <p className="text-sm font-semibold">Waktu Tersisa</p>
            </div>
            <p className="text-2xl font-bold">{formatTime(timeLeft)}</p>
            {timeLeft <= 120 && (
              <p className="text-xs mt-1 opacity-90">
                ⚠️ Sesi akan segera berakhir!
              </p>
            )}
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Top Navbar for Mobile */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
            >
            <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-lg text-gray-800">Admin</span>
            </div>
            <div className="text-sm font-semibold text-red-600">
            {formatTime(timeLeft)}
            </div>
        </div>

        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-6 flex items-center justify-between flex-wrap gap-3">
            <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
                Tambah / Hapus Beasiswa
            </h1>
            <p className="text-gray-600">
                Tambahkan atau hapus data beasiswa dari database
            </p>
            </div>
            <button
            onClick={fetchBeasiswa}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
            <Clock className="w-4 h-4" />
            Refresh Data
            </button>
        </div>

        {/* Success Message */}
        {success && (
            <div className="mx-6 mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-center text-green-700 font-semibold">
            ✅ Beasiswa berhasil ditambahkan!
            </div>
        )}

        {/* Add Beasiswa Form */}
        <div className="p-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 max-w-3xl mx-auto">
            <div className="space-y-6">
                <Input label="Nama Beasiswa" name="nama" value={formData.nama} onChange={handleChange} />
                <Input label="Penyelenggara" name="organizer" value={formData.organizer} onChange={handleChange} />

                <div className="grid md:grid-cols-2 gap-6">
                <Select label="Tingkat" name="tingkat" value={formData.tingkat} onChange={handleChange} options={['S1', 'S2', 'S3']} />
                <Select label="Tipe Beasiswa" name="tipe" value={formData.tipe} onChange={handleChange} options={['Full Funded', 'Partial', 'Tuition Only']} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                <Input type="date" label="Deadline" name="deadline" value={formData.deadline} onChange={handleChange} />
                <Input label="Lokasi" name="lokasi" value={formData.lokasi} onChange={handleChange} />
                </div>

                <Input label="Link / Path" name="path" value={formData.path} onChange={handleChange} />
                <Textarea label="Deskripsi" name="deskripsi" value={formData.deskripsi} onChange={handleChange} />

                <button
                onClick={handleSubmit}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                <Save className="w-5 h-5" />
                {saving ? 'Menyimpan...' : 'Simpan Beasiswa'}
                </button>
            </div>
            </div>
        </div>

        {/* Delete Section */}
        <div className="px-6 pb-10">
            <div className="bg-white rounded-xl p-6 border border-gray-200 max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Hapus Beasiswa</h2>

            <input
                type="text"
                placeholder="Cari beasiswa..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full mb-4 px-4 py-3 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {filteredBeasiswa.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Tidak ada beasiswa ditemukan.</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                {filteredBeasiswa.map((b) => (
                    <li
                    key={b.id}
                    className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 transition"
                    >
                    <div>
                        <p className="font-semibold text-gray-800">{b.nama}</p>
                        <p className="text-sm text-gray-600">{b.organizer}</p>
                    </div>
                    <button
                        onClick={() => handleDelete(b.id)}
                        className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    >
                        <X className="w-4 h-4" />
                        Hapus
                    </button>
                    </li>
                ))}
                </ul>
            )}
            </div>
        </div>
        </main>
    </div>
  );
}

/* Reusable Inputs */
interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
}

const Input: React.FC<InputProps> = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} *
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: string[];
}

const Select: React.FC<SelectProps> = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} *
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

interface TextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} *
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={5}
      className="w-full px-4 py-3 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);