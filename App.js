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

  const handleChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = parseInt(value);
    setResponses(newResponses);
  };

  const calculateSUS = () => {
    let total = 0;
    for (let i = 0; i < 10; i++) {
      const value = responses[i];
      if (value === null) return null;
      if ((i + 1) % 2 === 1) {
        total += value - 1;
      } else {
        total += 5 - value;
      }
    }
    return total * 2.5;
  };

  const handleSubmit = () => {
    if (responses.includes(null)) {
      alert("Mohon isi semua pertanyaan sebelum submit.");
      return;
    }
    const susScore = calculateSUS();
    setScore(susScore);
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Survei Usability (SUS)</h1>
      {!submitted ? (
        <>
          {susQuestions.map((q, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <label>{i + 1}. {q}</label>
              <select
                value={responses[i] ?? ''}
                onChange={(e) => handleChange(i, e.target.value)}
              >
                <option value="" disabled>Pilih skor (1–5)</option>
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
          <p>Terima kasih! Skor SUS Anda adalah:</p>
          <h2>{score}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
