// components/TocItem.jsx
"use client";

export default function TocItem({ heading }) {
  const handleClick = (e) => {
    e.preventDefault();
    const target = document.getElementById(heading.slug);
    if (target) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 80;
      window.lenis?.scrollTo(target, {
        offset: -headerHeight,
        duration: 1.5
      });
    }
  };

  return (
    <a 
      href={`#${heading.slug}`}
      className="block py-1 hover:text-blue-400"
      onClick={handleClick}
    >
      {heading.value}
    </a>
  );
}