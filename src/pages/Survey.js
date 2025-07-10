import React, { useEffect, useState } from 'react';

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

function Survey() {
  const [identitas, setIdentitas] = useState({});
  const [responses, setResponses] = useState(Array(10).fill(null));
  const [score, setScore] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('identitas');
    if (data) setIdentitas(JSON.parse(data));
  }, []);

  const handleChange = (i, value) => {
    const newRes = [...responses];
    newRes[i] = parseInt(value);
    setResponses(newRes);
  };

  const calculateSUS = () => {
    let total = 0;
    for (let i = 0; i < 10; i++) {
      const val = responses[i];
      if ((i + 1) % 2 === 1) total += val - 1;
      else total += 5 - val;
    }
    return total * 2.5;
  };

  const handleSubmit = () => {
    if (responses.includes(null)) {
      alert("Mohon isi semua pertanyaan!");
      return;
    }
    const susScore = calculateSUS();
    setScore(susScore);

    const payload = {
      ...identitas,
      responses,
      susScore
    };

    fetch("https://script.google.com/macros/s/AKfycbxuAXfTGnmhW9bf-kfjNHSlHICXgQ8GlRVXWZR45SR0eVQad4i8d73KJD1LzftXODzl/exec", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.text())
    .then(msg => console.log("Berhasil kirim:", msg))
    .catch(err => console.error("Gagal kirim:", err));
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      <h2>Halo, {identitas.nama}</h2>
      <p>Divisi: {identitas.divisi} | Lama kerja: {identitas.lamaKerja} tahun | Pakai XP8: {identitas.lamaPakaiXP8} bulan</p>
      <h3>Kuesioner SUS</h3>
      {susQuestions.map((q, i) => (
        <div key={i} style={{ marginBottom: 15 }}>
          <label>{i + 1}. {q}</label><br />
          <select value={responses[i] ?? ''} onChange={e => handleChange(i, e.target.value)}>
            <option value="">Pilih skor (1–5)</option>
            {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>

      {score !== null && (
        <div style={{ marginTop: 30 }}>
          <h3>Skor SUS: {score}</h3>
          <p>Terima kasih atas partisipasi Anda.</p>
        </div>
      )}
    </div>
  );
}

export default Survey;
