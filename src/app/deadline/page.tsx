'use client'

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, DollarSign, GraduationCap, BookOpen, Search, Bell, User, Home, NotebookText} from 'lucide-react';
import Link from 'next/link';

export default function DeadlinePage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // October 2025
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const scholarshipsData = [
    {
      id: 1,
      title: "Chevening Scholarship UK",
      provider: "UK Government",
      deadline: new Date(2025, 10, 8), // November 8, 2025
      amount: "£18,000/year",
      location: "United Kingdom",
      category: "S2",
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: 2,
      title: "Beasiswa Kemitraan Universitas",
      provider: "Kerjasama Bilateral",
      deadline: new Date(2025, 10, 30), // November 30, 2025
      amount: "Tuition Coverage",
      location: "Indonesia",
      category: "S1",
      color: "from-blue-500 to-blue-700"
    },
    {
      id: 3,
      title: "Fulbright Indonesia",
      provider: "US Embassy Indonesia",
      deadline: new Date(2025, 9, 31), // October 31, 2025
      amount: "Full Funded",
      location: "United States",
      category: "S2",
      color: "from-orange-400 to-red-500"
    },
    {
      id: 4,
      title: "Erasmus Mundus Joint Masters",
      provider: "European Commission",
      deadline: new Date(2025, 11, 15), // December 15, 2025
      amount: "€24,000/year",
      location: "Europe",
      category: "S2",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 5,
      title: "Beasiswa Unggulan Kemendikbud 2025",
      provider: "Kementerian Pendidikan",
      deadline: new Date(2025, 11, 31), // December 31, 2025
      amount: "Full Tuition + Living Cost",
      location: "Indonesia",
      category: "S1",
      color: "from-orange-400 to-red-500"
    },
    {
      id: 6,
      title: "LPDP Scholarship Program",
      provider: "LPDP Indonesia",
      deadline: new Date(2026, 0, 15), // January 15, 2026
      amount: "Full Funded",
      location: "Global",
      category: "S2",
      color: "from-blue-500 to-blue-700"
    },
    {
      id: 7,
      title: "ADB-JSP Scholarship",
      provider: "Asian Development Bank",
      deadline: new Date(2026, 0, 31), // January 31, 2026
      amount: "Full Tuition + Allowance",
      location: "Asia",
      category: "S2",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 8,
      title: "Coimbra Group Scholarship",
      provider: "Coimbra Group",
      deadline: new Date(2026, 1, 28), // February 28, 2026
      amount: "€1,000-€2,000/month",
      location: "Europe",
      category: "S3",
      color: "from-indigo-500 to-purple-600"
    }
  ];

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getScholarshipsForDate = (date: Date) => {
    return scholarshipsData.filter(scholarship => 
      scholarship.deadline.getDate() === date.getDate() &&
      scholarship.deadline.getMonth() === date.getMonth() &&
      scholarship.deadline.getFullYear() === date.getFullYear()
    );
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const scholarships = getScholarshipsForDate(clickedDate);
    if (scholarships.length > 0) {
      setSelectedDate(clickedDate);
    }
  };

  const getDaysUntilDeadline = (deadline: Date) => {
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDeadline = (deadline: Date) => {
    return deadline.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const renderCalendarDays = () => {
    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square p-2"></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const scholarships = getScholarshipsForDate(date);
      const hasScholarships = scholarships.length > 0;
      const isSelected = selectedDate && 
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();
      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`aspect-square p-2 border border-gray-200 rounded-lg transition cursor-pointer relative
            ${hasScholarships ? 'bg-blue-50 hover:bg-blue-100 border-blue-200' : 'bg-white hover:bg-gray-50'}
            ${isSelected ? 'ring-2 ring-blue-500 bg-blue-100' : ''}
            ${isToday ? 'border-blue-500 border-2' : ''}
          `}
        >
          <div className="flex flex-col h-full">
            <span className={`text-sm font-semibold ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
              {day}
            </span>
            {hasScholarships && (
              <div className="flex-1 flex flex-col gap-1 mt-1 overflow-hidden">
                {scholarships.slice(0, 2).map((scholarship, idx) => (
                  <div
                    key={idx}
                    className="text-xs px-1.5 py-0.5 bg-blue-500 text-white rounded truncate"
                    title={scholarship.title}
                  >
                    {scholarship.title}
                  </div>
                ))}
                {scholarships.length > 2 && (
                  <div className="text-xs text-blue-600 font-semibold">
                    +{scholarships.length - 2} lagi
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const selectedScholarships = selectedDate ? getScholarshipsForDate(selectedDate) : [];

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Kalender Deadline Beasiswa</h1>
          <p className="text-gray-600">Pantau deadline beasiswa yang akan datang</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="col-span-2">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={previousMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-sm font-semibold text-gray-600 p-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {renderCalendarDays()}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-500 rounded"></div>
                    <span className="text-gray-600">Hari Ini</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
                    <span className="text-gray-600">Ada Deadline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 ring-2 ring-blue-500 bg-blue-100 rounded"></div>
                    <span className="text-gray-600">Dipilih</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Selected Date Details */}
          <div className="col-span-1">
            <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-8">
              {selectedDate ? (
                <>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                      <Calendar className="w-5 h-5" />
                      <span className="font-semibold">Deadline Terpilih</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}
                    </h3>
                    <p className="text-sm text-gray-600">{selectedDate.getFullYear()}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      {selectedScholarships.length} Beasiswa Deadline
                    </h4>
                    {selectedScholarships.map(scholarship => {
                      const daysLeft = getDaysUntilDeadline(scholarship.deadline);
                      const isUrgent = daysLeft <= 30 && daysLeft > 0;
                      
                      return (
                        <div key={scholarship.id} className="p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-bold text-gray-800 text-sm">{scholarship.title}</h5>
                            {isUrgent && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                                Segera!
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mb-3">{scholarship.provider}</p>
                          
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-3 h-3 text-gray-500" />
                              <span className="text-xs text-gray-600">{scholarship.category}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3 text-gray-500" />
                              <span className="text-xs text-gray-600">{scholarship.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-3 h-3 text-gray-500" />
                              <span className="text-xs text-gray-600 font-semibold">{scholarship.amount}</span>
                            </div>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className={`text-xs font-semibold ${isUrgent ? 'text-red-600' : 'text-green-600'}`}>
                              {daysLeft > 0 ? `${daysLeft} hari lagi` : 'Sudah lewat'}
                            </p>
                          </div>
                          
                          <button className="w-full mt-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition">
                            Lihat Detail
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Pilih tanggal untuk melihat deadline beasiswa</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Deadline Terdekat</h3>
          <div className="grid grid-cols-4 gap-4">
            {scholarshipsData
              .filter(s => getDaysUntilDeadline(s.deadline) > 0)
              .sort((a, b) => a.deadline.getTime() - b.deadline.getTime())
              .slice(0, 4)
              .map(scholarship => {
                const daysLeft = getDaysUntilDeadline(scholarship.deadline);
                const isUrgent = daysLeft <= 30;
                
                return (
                  <div key={scholarship.id} className={`bg-white rounded-xl p-5 border-2 ${isUrgent ? 'border-red-200' : 'border-gray-200'} hover:shadow-lg transition`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${scholarship.color} rounded-lg flex items-center justify-center`}>
                        <GraduationCap className="w-5 h-5 text-white" />
                      </div>
                      {isUrgent && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                          Segera!
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1 text-sm">{scholarship.title}</h4>
                    <p className="text-xs text-gray-600 mb-3">{scholarship.provider}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDeadline(scholarship.deadline)}</span>
                    </div>
                    <p className={`text-sm font-bold ${isUrgent ? 'text-red-600' : 'text-green-600'}`}>
                      {daysLeft} hari lagi
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
}