'use client';
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PatientSearch() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const input = document.getElementById('patient-search-input') as HTMLInputElement | null;
    const q = input?.value || '';
    setLoading(true);
    try {
      const res = await fetch(`/api/patients?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Search error', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Patient Search</h1>
      <Input id="patient-search-input" placeholder="Enter Patient Name" />
      <Button className="mt-2" onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching…' : 'Search'}
      </Button>

      {results.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-medium mb-2">Results</h2>
          <ul className="list-disc pl-5">
            {results.map((r: any, i: number) => (
              <li key={i}>{r.name ?? JSON.stringify(r)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}