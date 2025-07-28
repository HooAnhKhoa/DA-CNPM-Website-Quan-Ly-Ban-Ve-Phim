import React from 'react';
import AddShowtime from '../components/AddShowtime'; // Giả sử bạn để component AddShowtime ở components/
import Header from '../components/Header';
import Banner from '../components/Banner';

export default function AddShowtimePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Header />
      <AddShowtime />
        <Banner />
    </div>
  );
}
