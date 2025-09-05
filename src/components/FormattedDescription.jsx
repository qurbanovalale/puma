// FormattedDescription.jsx (yeni bir fayl yaradın
import React from 'react';
import { useMemo } from 'react';

// Bu funksiya HTML string-i emal edəcək
const formatHtmlContent = (htmlString) => {
  if (!htmlString) return '';

  // 1. Bir DOM elementi yaradırıq ki, string-i HTML kimi oxuya bilək
  const wrapper = document.createElement('div');
  wrapper.innerHTML = htmlString;

  // 2. Bütün başlıqları (h3) və onların qonşu elementlərini (p, ul) tapırıq
  const sections = [];
  let currentSection = null;

  wrapper.childNodes.forEach(node => {
    // Hər yeni h3 yeni bir section-dır
    if (node.nodeName === 'H3') {
      if (currentSection) sections.push(currentSection);
      currentSection = { title: node.outerHTML, content: [] };
    } 
    // h3 olmayan elementləri mövcud section-a əlavə edirik
    else if (currentSection && node.textContent.trim()) {
      currentSection.content.push(node.outerHTML);
    }
  });
  if (currentSection) sections.push(currentSection);

  // 3. Tapdığımız section-ları Tailwind class-ları ilə yenidən qururuq
  const productStory = sections.find(sec => sec.title.includes('PRODUCT STORY'));
  const otherSections = sections.filter(sec => !sec.title.includes('PRODUCT STORY'));

  let finalHtml = '';

  // PRODUCT STORY hissəsini tam enli edirik
  if (productStory) {
    finalHtml += `
      <div class="col-span-1 md:col-span-2">
        ${productStory.title}
        ${productStory.content.join('')}
      </div>
    `;
  }
  
  // Digər section-ları grid-in elementləri kimi əlavə edirik
  otherSections.forEach(section => {
    finalHtml += `
      <div>
        ${section.title}
        ${section.content.join('')}
      </div>
    `;
  });

  return finalHtml;
};


const FormattedDescription = ({ htmlContent }) => {
  // `useMemo` istifadə edirik ki, bu ağır əməliyyat hər render-də təkrarlanmasın
  const formattedHtml = useMemo(() => formatHtmlContent(htmlContent), [htmlContent]);

  return (
    // Bu div Tailwind Grid layout-unu yaradır
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4"
      dangerouslySetInnerHTML={{ __html: formattedHtml }}
    />
  );
};

export default FormattedDescription;