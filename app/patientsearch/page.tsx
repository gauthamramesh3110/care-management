'use client';
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PatientSearchResults from '@/components/patient-search-results';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';

export default function PatientSearch() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const name = document.getElementById('patient-name-input') as HTMLInputElement | null;
    const zipcode = document.getElementById('patient-zipcode-input') as HTMLInputElement | null;
    const dob = document.getElementById('patient-dob-input') as HTMLInputElement | null;

    const nameString = name?.value || '';
    const zipcodeString = zipcode?.value || '';
    const dobString = dob?.value || '';

    if (!nameString && !zipcodeString && !dobString) {
      alert('Please enter at least one search criteria');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/patients?name=${encodeURIComponent(nameString)}&zipcode=${encodeURIComponent(zipcodeString)}&dob=${encodeURIComponent(dobString)}`);
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

      <form>
        <div className="flex flex-row gap-2 items-end">
          <Field>
            <FieldLabel htmlFor="patient-name-input">Name</FieldLabel>
            <Input id="patient-name-input" placeholder="John Doe" />
          </Field>
          <Field>
            <FieldLabel htmlFor="patient-zipcode-input">Zip Code</FieldLabel>
            <Input id="patient-zipcode-input" placeholder="1001" />
          </Field>
          <Field>
            <FieldLabel htmlFor="patient-dob-input">Date of Birth</FieldLabel>
            <Input id="patient-dob-input" placeholder="YYYY-MM-DD" type="date" />
          </Field>
          <Button type='submit' onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching…' : 'Search'}
          </Button>
        </div>
      </form>


      {results.length > 0 && (
        <PatientSearchResults results={results} />
      )}
    </div>
  );
}