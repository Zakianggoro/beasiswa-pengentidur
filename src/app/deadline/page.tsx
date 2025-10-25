'use client'

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, DollarSign, GraduationCap, BookOpen, Search, User, Home, NotebookText, Menu, X } from 'lucide-react';

interface Scholarship {
  id: number;
  title: string;
  provider: string;
  deadline: Date;
  amount: string;
  location: string;
  category: string;
  color: string;
  path: string;
}

export default function DeadlinePage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // October 2025
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock scholarships data
  const scholarships: Scholarship[] = [
    {
      id: 1,
      title: "Beasiswa Unggulan Kemendikbud",
      provider: "Kementerian Pendidikan",
      deadline: new Date(2025, 9, 15),
      amount: "Full Funded",
      location: "Indonesia",
      category: "S1",
      color: "from-purple-500 to-indigo-600",
      path: "#"
    },
    {
      id: 2,
      title: "LPDP Scholarship",
      provider: "LPDP Indonesia",
      deadline: new Date(2025, 9, 22),
      amount: "Full Funded",
      location: "Global",
      category: "S2",
      color: "from-blue-500 to-blue-700",
      path: "#"
    },
    {
      id: 3,
      title: "Chevening Scholarship",
      provider: "UK Government",
      deadline: new Date(2025, 9, 8),
      amount: "£18,000/year",
      location: "United Kingdom",
      category: "S2",
      color: "from-orange-400 to-red-500",
      path: "#"
    },
    {
      id: 4,
      title: "Fulbright Program",
      provider: "US Government",
      deadline: new Date(2025, 9, 28),
      amount: "Full Funded",
      location: "United States",
      category: "S3",
      color: "from-green-500 to-teal-600",
      path: "#"
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
    return scholarships.filter(scholarship => 
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
    } else {
      setSelectedDate(null);
    }
  };

  const getDaysUntilDeadline = (deadline: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    
    const diffTime = deadlineDate.getTime() - today.getTime();
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
        <div key={`empty-${i}`} className="aspect-square p-1 md:p-2"></div>
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
      
      const today = new Date();
      const isToday = today.getDate() === day &&
                      today.getMonth() === currentDate.getMonth() &&
                      today.getFullYear() === currentDate.getFullYear();

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`aspect-square p-1 md:p-2 border border-gray-200 rounded-lg transition cursor-pointer relative
            ${hasScholarships ? 'bg-blue-50 hover:bg-blue-100 border-blue-200' : 'bg-white hover:bg-gray-50'}
            ${isSelected ? 'ring-2 ring-blue-500 bg-blue-100' : ''}
            ${isToday ? 'border-blue-500 border-2' : ''}
          `}
        >
          <div className="flex flex-col h-full">
            <span className={`text-xs md:text-sm font-semibold ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
              {day}
            </span>
            {hasScholarships && (
              <div className="flex-1 flex flex-col gap-0.5 md:gap-1 mt-0.5 md:mt-1 overflow-hidden">
                {scholarships.slice(0, 2).map((scholarship, idx) => (
                  <div
                    key={idx}
                    className="text-[8px] md:text-xs px-1 md:px-1.5 py-0.5 bg-blue-500 text-white rounded truncate"
                    title={scholarship.title}
                  >
                    {scholarship.title}
                  </div>
                ))}
                {scholarships.length > 2 && (
                  <div className="text-[8px] md:text-xs text-blue-600 font-semibold">
                    +{scholarships.length - 2}
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
          <a href="/" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Home className="w-5 h-5" />
            <span>Beranda</span>
          </a>
          <a href="/cari-beasiswa" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Search className="w-5 h-5" />
            <span>Cari Beasiswa</span>
          </a>
          <a href="/artikel" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <NotebookText className="w-5 h-5" />
            <span>Artikel</span>
          </a>
          <a href="/deadline" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
            <Calendar className="w-5 h-5" />
            <span>Deadline</span>
          </a>
          <a href="/bebot" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <User className="w-5 h-5" />
            <span>Beasiswa Bot (BEBOT)</span>
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
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Kalender Deadline Beasiswa</h1>
            <p className="text-sm md:text-base text-gray-600">Pantau deadline beasiswa yang akan datang</p>
          </div>

          {/* Calendar and Selected Date - Mobile: Stack, Desktop: Side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
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
                <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
                  {dayNames.map(day => (
                    <div key={day} className="text-center text-xs md:text-sm font-semibold text-gray-600 p-1 md:p-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 md:gap-2">
                  {renderCalendarDays()}
                </div>

                {/* Legend */}
                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm">
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

            {/* Selected Date Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 lg:sticky lg:top-8">
                {selectedDate ? (
                  <>
                    <div className="mb-4 md:mb-6">
                      <div className="flex items-center gap-2 text-blue-600 mb-2">
                        <Calendar className="w-5 h-5" />
                        <span className="font-semibold text-sm md:text-base">Deadline Terpilih</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                        {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600">{selectedDate.getFullYear()}</p>
                    </div>

                    <div className="space-y-3 max-h-[50vh] lg:max-h-[60vh] overflow-y-auto pr-2">
                      <h4 className="font-semibold text-sm md:text-base text-gray-800 mb-3">
                        {selectedScholarships.length} Beasiswa Deadline
                      </h4>
                      {selectedScholarships.map(scholarship => {
                        const daysLeft = getDaysUntilDeadline(scholarship.deadline);
                        const isUrgent = daysLeft <= 30 && daysLeft >= 0;
                        
                        return (
                          <div key={scholarship.id} className="p-3 md:p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-bold text-gray-800 text-xs md:text-sm">{scholarship.title}</h5>
                              {isUrgent && (
                                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full whitespace-nowrap ml-2">
                                  Segera!
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mb-3">{scholarship.provider}</p>
                            
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <BookOpen className="w-3 h-3 text-gray-500 flex-shrink-0" />
                                <span className="text-xs text-gray-600">{scholarship.category}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3 text-gray-500 flex-shrink-0" />
                                <span className="text-xs text-gray-600">{scholarship.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-3 h-3 text-gray-500 flex-shrink-0" />
                                <span className="text-xs text-gray-600 font-semibold">{scholarship.amount}</span>
                              </div>
                            </div>
                            
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <p className={`text-xs font-semibold ${daysLeft < 0 ? 'text-gray-500' : isUrgent ? 'text-red-600' : 'text-green-600'}`}>
                                {daysLeft >= 0 ? `${daysLeft} hari lagi` : 'Telah berakhir'}
                              </p>
                            </div>
                            
                            <a href={scholarship.path} className="block w-full text-center mt-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition">
                              Lihat Detail
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 md:py-12">
                    <Calendar className="w-10 h-10 md:w-12 md:h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-xs md:text-sm">Pilih tanggal untuk melihat deadline beasiswa</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Deadline Terdekat</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {scholarships
                .filter(s => getDaysUntilDeadline(s.deadline) >= 0)
                .sort((a, b) => a.deadline.getTime() - b.deadline.getTime())
                .slice(0, 4)
                .map(scholarship => {
                  const daysLeft = getDaysUntilDeadline(scholarship.deadline);
                  const isUrgent = daysLeft <= 30;
                  
                  return (
                    <div key={scholarship.id} className={`bg-white rounded-xl p-4 md:p-5 border-2 ${isUrgent ? 'border-red-200' : 'border-gray-200'} hover:shadow-lg transition`}>
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
                        <Calendar className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{formatDeadline(scholarship.deadline)}</span>
                      </div>
                      <p className={`text-sm font-bold ${isUrgent ? 'text-red-600' : 'text-green-600'}`}>
                        {daysLeft} hari lagi
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}