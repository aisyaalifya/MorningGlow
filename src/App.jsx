import React, { useState, useEffect } from 'react';
import './App.css';

const MOODS = [
  { id: 'happy', label: 'Gembira', emoji: '☀️', color: '#f59e0b', quote: 'Energi positifmu menyinari harimu!' },
  { id: 'calm', label: 'Tenang', emoji: '🌿', color: '#10b981', quote: 'Ketenangan adalah kunci kejelasan berpikir.' },
  { id: 'excited', label: 'Semangat', emoji: '🔥', color: '#ef4444', quote: 'Taklukkan semua tantangan hari ini!' },
  { id: 'tired', label: 'Lelah', emoji: '☕', color: '#8b5cf6', quote: 'Istirahat sejenak, kamu sudah berusaha keras.' },
  { id: 'gloomy', label: 'Butuh Semangat', emoji: '🌈', color: '#3b82f6', quote: 'Setelah hujan pasti ada pelangi.' }
];

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    mood: 'happy',
    catatan: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMoodSelect = (moodId) => {
    setFormData((prev) => ({ ...prev, mood: moodId }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ nama: '', email: '', mood: 'happy', catatan: '' });
  };

  const selectedMoodObj = MOODS.find((m) => m.id === formData.mood) || MOODS[0];

  return (
    <div className="app-container">
      {/* Tirai Pembuka */}
      <div className={`curtain-overlay ${isOpen ? 'open' : ''}`}>
        <div className="curtain-panel curtain-left">
          {!isOpen && <span className="curtain-brand">MORNING</span>}
        </div>
        <div className="curtain-panel curtain-right">
          {!isOpen && <span className="curtain-brand">GLOW</span>}
        </div>
      </div>

      {/* Kartu Utama */}
      <div className={`form-wrapper ${isOpen ? 'visible' : ''}`}>
        {!submitted ? (
          <>
            <div className="form-header">
              <span className="brand-badge">✨ Daily Morning Check-in</span>
              <h2>MorningGlow</h2>
              <p>Bagaimana kabarmu menyambut pagi ini?</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Input Nama */}
              <div className="input-group">
                <label htmlFor="nama">Nama Lengkap</label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama indahmu..."
                  required
                />
              </div>

              {/* Input Email */}
              <div className="input-group">
                <label htmlFor="email">Alamat Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nama@domain.com"
                  required
                />
              </div>

              {/* Pilihan Suasana Hati */}
              <div className="input-group">
                <label>Suasana Hati Saat Ini</label>
                <div className="mood-grid">
                  {MOODS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      className={`mood-card ${formData.mood === m.id ? 'active' : ''}`}
                      onClick={() => handleMoodSelect(m.id)}
                      style={{ '--accent-color': m.color }}
                    >
                      <span className="mood-emoji">{m.emoji}</span>
                      <span className="mood-label">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Afirmasi Pagi Otomatis */}
              <div className="affirmation-box" style={{ borderColor: selectedMoodObj.color }}>
                <p className="affirmation-text">"{selectedMoodObj.quote}"</p>
              </div>

              {/* Input Catatan Hari Ini */}
              <div className="input-group">
                <label htmlFor="catatan">Pesan atau Harapan Hari Ini</label>
                <textarea
                  id="catatan"
                  name="catatan"
                  rows="3"
                  value={formData.catatan}
                  onChange={handleChange}
                  placeholder="Ceritakan singkat harapanmu untuk hari ini..."
                ></textarea>
              </div>

              <button type="submit" className="btn-submit">
                Simpan Refleksi Pagi 🌅
              </button>
            </form>
          </>
        ) : (
          <div className="success-card">
            <div className="success-emoji">{selectedMoodObj.emoji}</div>
            <h3>Selamat Pagi, {formData.nama}!</h3>
            <p className="success-desc">
              Refleksi suasana hati (<strong>{selectedMoodObj.label}</strong>) telah tersimpan.
            </p>
            <div className="success-quote">
              <p>"{selectedMoodObj.quote}"</p>
            </div>
            <button onClick={handleReset} className="btn-reset">
              Isi Kembali
            </button>
          </div>
        )}
      </div>
    </div>
  );
}