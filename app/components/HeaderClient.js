"use client";

import { useState, useEffect } from "react";
import Header from "./Header";

export default function HeaderClient({ posts }) {
  // Client-side state
  const [input, setInput] = useState("");
  const [filters, setFilters] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Filtering logic
  useEffect(() => {
    const tagMatches = input.match(/tag:(\w+)/gi) || [];
    const newFilters = tagMatches.map(match => match.split(':')[1].toLowerCase());
    
    const newSearchTerm = input.replace(/tag:\w+/gi, '').trim().toLowerCase();
    
    const results = posts.filter(post => {
      const tagMatch = newFilters.length === 0 || 
        newFilters.some(filter => 
          post.tags?.map(t => t.toLowerCase()).includes(filter)
        );
      const textMatch = newSearchTerm === '' ||
        post.title.toLowerCase().includes(newSearchTerm) ||
        (post.description && post.description.toLowerCase().includes(newSearchTerm));
      return tagMatch && textMatch;
    });

    setFilters(newFilters);
    setFilteredPosts(results);
  }, [input, posts]);

  const removeFilter = (tagToRemove) => {
    setInput(input.replace(`tag:${tagToRemove}`, '').trim());
  };

  const handleResultClick = () => {
    setShowResults(false);
    setInput("");
  };

  return (
    <Header 
      input={input}
      setInput={setInput}
      filters={filters}
      filteredPosts={filteredPosts}
      showResults={showResults}
      setShowResults={setShowResults}
      removeFilter={removeFilter}
      handleResultClick={handleResultClick}
    />
  );
}