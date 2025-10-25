'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Search, Calendar, User, Send, Bot, Sparkles, RefreshCw, ThumbsUp, ThumbsDown, NotebookText, Home } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from "react-markdown";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content:
        'Halo! Saya BEBOT, asisten virtual untuk membantu Anda menemukan beasiswa yang tepat. Ada yang bisa saya bantu hari ini?',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { id: 1, text: 'Cari beasiswa S1', icon: '🎓' },
    { id: 2, text: 'Tips menulis essay', icon: '📝' },
    { id: 3, text: 'Deadline terdekat', icon: '⏰' },
    { id: 4, text: 'Beasiswa luar negeri', icon: '✈️' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ Correctly handle sending messages
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: inputMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await res.json();
      const botReply = data.reply || 'Maaf, saya tidak menemukan jawaban yang sesuai.';

      const botResponse = {
        id: messages.length + 2,
        type: 'bot' as const,
        content: botReply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error calling BEBOT API:', error);

      const errorResponse = {
        id: messages.length + 2,
        type: 'bot' as const,
        content:
          'Maaf, saya mengalami kendala teknis. Silakan coba lagi dalam beberapa saat. Anda juga bisa mencari beasiswa melalui menu "Cari Beasiswa" atau membaca artikel tips beasiswa di menu "Artikel".',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (actionText: string) => {
    setInputMessage(actionText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content:
          'Halo! Saya BEBOT, asisten virtual untuk membantu Anda menemukan beasiswa yang tepat. Ada yang bisa saya bantu hari ini?',
        timestamp: new Date(),
      },
    ]);
  };

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
          <Link href="/artikel" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <NotebookText className="w-5 h-5" />
            Artikel
          </Link>
          <Link href="/deadline" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5" />
            Deadline
          </Link>
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
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
      <main className="ml-64 flex-1 flex flex-col h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">BEBOT - Beasiswa Bot</h1>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={handleNewChat}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <RefreshCw className="w-4 h-4" />
              Chat Baru
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-6 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'bot'
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                        : 'bg-blue-600'
                    }`}
                  >
                    {message.type === 'bot' ? (
                      <Bot className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>

                  <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.type === 'bot'
                          ? 'bg-white border border-gray-200'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                    <div
                      className={`prose prose-sm max-w-none ${
                        message.type === 'bot'
                          ? 'text-gray-800 prose-p:my-1 prose-li:my-0 prose-strong:text-blue-700'
                          : 'text-white'
                      }`}
                    >
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 px-2">
                      {message.timestamp.toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>

                    {message.type === 'bot' && message.id !== 1 && (
                      <div className="flex items-center gap-2 mt-2 px-2">
                        <button className="p-1 hover:bg-gray-100 rounded transition">
                          <ThumbsUp className="w-3 h-3 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded transition">
                          <ThumbsDown className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-3xl">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.4s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Actions */}
        {messages.length === 1 && (
          <div className="px-8 py-4 bg-white border-t border-gray-200">
            <div className="max-w-4xl mx-auto">
              <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Coba tanyakan:
              </p>
              <div className="grid grid-cols-4 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.text)}
                    className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition text-left"
                  >
                    <span className="text-2xl">{action.icon}</span>
                    <span className="text-sm text-gray-800 font-medium">{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-8 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ketik pertanyaan Anda disini..."
                  rows={1}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-800"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className={`p-3 rounded-xl transition flex-shrink-0 ${
                  inputMessage.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              BEBOT dapat membuat kesalahan. Mohon verifikasi informasi penting.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
