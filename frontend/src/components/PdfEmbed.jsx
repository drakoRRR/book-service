import React from 'react';

const PdfEmbed = () => {
  const pdfUrl = '/books/my-book.pdf';  // Вказуємо шлях до PDF-файлу у папці public

  return (
    <div style={{ width: '70%', height: '100vh', margin: '0 auto' }}>
      <iframe
        src={pdfUrl}
        width="100%"  // 100% від ширини батьківського елемента
        height="100%" // 100% від висоти батьківського елемента
        frameBorder="0"
        allowFullScreen
        title="PDF Viewer"
      ></iframe>
    </div>
  );
};

export default PdfEmbed;