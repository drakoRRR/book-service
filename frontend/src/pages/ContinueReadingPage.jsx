// /src/pages/ContinueReadingPage.jsx
import React from 'react';
import PdfEmbed from '../components/PdfEmbed'; // Імпортуємо PdfEmbed

const ContinueReadingPage = () => {
  return (
    <div>
      <h2>Continue Reading</h2>
      <p>Here you can continue reading your saved books.</p>
      
      {/* Вставляємо компонент PdfEmbed для відображення PDF */}
      <PdfEmbed />
    </div>
  );
};

export default ContinueReadingPage;