import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Identitas() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: '',
    divisi: '',
    lamaKerja: '',
    lamaPakaiXP8: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (Object.values(form).some(v => v.trim() === '')) {
      alert('Mohon isi semua data terlebih dahulu.');
      return;
    }
    localStorage.setItem('identitas', JSON.stringify(form));
    navigate('/survey');
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Form Identitas Responden</h1>
      <input name="nama" placeholder="Nama Lengkap" value={form.nama} onChange={handleChange} /><br/><br/>
      <input name="divisi" placeholder="Divisi / Departemen" value={form.divisi} onChange={handleChange} /><br/><br/>
      <input name="lamaKerja" type="number" placeholder="Lama Bekerja (tahun)" value={form.lamaKerja} onChange={handleChange} /><br/><br/>
      <input name="lamaPakaiXP8" type="number" placeholder="Lama Pakai HPE XP8 (bulan)" value={form.lamaPakaiXP8} onChange={handleChange} /><br/><br/>
      <button onClick={handleNext}>Lanjut ke Survei</button>
    </div>
  );
}

export default Identitas;
