import React, { useState } from 'react';

const susQuestions = [
  "Saya merasa sistem ini mudah digunakan.",
  "Saya merasa sistem ini tidak perlu banyak dukungan teknis.",
  "Saya merasa fitur-fitur sistem ini terintegrasi dengan baik.",
  "Saya merasa sistem ini mudah dipelajari.",
  "Saya merasa percaya diri saat menggunakan sistem ini.",
  "Saya merasa sistem ini terlalu rumit untuk digunakan.",
  "Saya merasa konsisten dalam penggunaan sistem ini.",
  "Saya merasa harus belajar banyak sebelum bisa menggunakan sistem ini.",
  "Saya merasa sistem ini memiliki banyak kekurangan.",
  "Saya ingin sering menggunakan sistem ini."
];

function App() {
  const [responses, setResponses] = useState(Array(10).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const [form, setForm] = useState({
    nama: '',
    divisi: '',
    lamaKerja: '',
    lamaPakaiXP8: ''
  });

  const handleChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = parseInt(value);
    setResponses(newResponses);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateSUS = () => {
    let total = 0;
    for (let i = 0; i < 10; i++) {
      const value = responses[i];
      if ((i + 1) % 2 === 1) {
        total += value - 1;
      } else {
        total += 5 - value;
      }
    }
    return total * 2.5;
  };

  const handleSubmit = () => {
    if (Object.values(form).some((v) => v.trim() === '')) {
      alert("Mohon isi semua data responden terlebih dahulu.");
      return;
    }

    if (responses.includes(null)) {
      alert("Mohon isi semua pertanyaan SUS sebelum submit.");
      return;
    }

    const susScore = calculateSUS();
    setScore(susScore);
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Survei Usability (SUS)</h1>

      {!submitted ? (
        <>
          <h3>Informasi Responden</h3>
          <div style={{ marginBottom: 10 }}>
            <label>Nama Lengkap:</label><br />
            <input type="text" name="nama" value={form.nama} onChange={handleFormChange} />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Divisi / Departemen:</label><br />
            <input type="text" name="divisi" value={form.divisi} onChange={handleFormChange} />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Lama Bekerja (tahun):</label><br />
            <input type="number" name="lamaKerja" value={form.lamaKerja} onChange={handleFormChange} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label>Lama Menggunakan HPE XP8 (bulan):</label><br />
            <input type="number" name="lamaPakaiXP8" value={form.lamaPakaiXP8} onChange={handleFormChange} />
          </div>

          <h3>Pertanyaan SUS</h3>
          {susQuestions.map((q, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <label>{i + 1}. {q}</label><br />
              <select
                value={responses[i] ?? ''}
                onChange={(e) => handleChange(i, e.target.value)}
              >
                <option value="">Pilih skor (1–5)</option>
                {[1, 2, 3, 4, 5].map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          ))}

          <button onClick={handleSubmit}>Kirim Jawaban</button>
        </>
      ) : (
        <div>
          <h2>Terima kasih, {form.nama}!</h2>
          <p>Skor SUS Anda adalah:</p>
          <h1>{score}</h1>
          <p>Divisi: {form.divisi}</p>
          <p>Lama bekerja: {form.lamaKerja} tahun</p>
          <p>Lama pakai HPE XP8: {form.lamaPakaiXP8} bulan</p>
        </div>
      )}
    </div>
  );
}

export default App;
