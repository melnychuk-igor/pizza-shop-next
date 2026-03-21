'use client';

import React, { useState } from 'react';
import { Input } from '../ui/input';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

export const AddressInput: React.FC<Props> = ({ value = '', onChange }) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const fetchSuggestions = async (query: string) => {
    onChange?.(query);

    if (!query) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(
        query
      )}`
    );

    const data = await res.json();
    setSuggestions(data);
  };

  const handleSelect = (item: any) => {
    onChange?.(item.display_name);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={(e) => fetchSuggestions(e.target.value)}
        placeholder="Enter address"
        className="h-12 text-md"
      />

      {suggestions.length > 0 && (
        <div className="absolute z-10 bg-white border w-full rounded-lg mt-1 shadow">
          {suggestions.map((item) => (
            <div
              key={item.place_id}
              onClick={() => handleSelect(item)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {item.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};