// app/request/page.tsx - Screen 2: Form (fixed contrast + updated text)
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const coloradoCounties = [
  "Adams", "Alamosa", "Arapahoe", "Archuleta", "Baca", "Bent", "Boulder", "Broomfield",
  "Chaffee", "Cheyenne", "Clear Creek", "Conejos", "Costilla", "Crowley", "Custer",
  "Delta", "Denver", "Dolores", "Douglas", "Eagle", "El Paso", "Elbert", "Fremont",
  "Garfield", "Gilpin", "Grand", "Gunnison", "Hinsdale", "Huerfano", "Jackson",
  "Jefferson", "Kiowa", "Kit Carson", "Lake", "La Plata", "Larimer", "Las Animas",
  "Lincoln", "Logan", "Mesa", "Mineral", "Moffat", "Montezuma", "Montrose", "Morgan",
  "Otero", "Ouray", "Park", "Phillips", "Pitkin", "Prowers", "Pueblo", "Rio Blanco",
  "Rio Grande", "Routt", "Saguache", "San Juan", "San Miguel", "Sedgwick", "Summit",
  "Teller", "Washington", "Weld", "Yuma"
];

export default function RequestForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    motherName: '',
    fatherName: '',
    birthCounty: '',
    mailingAddress1: '',
    mailingAddress2: '',
    mailingCityStateZip: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    window.location.href = '/id-upload';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-black text-white flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-zinc-900 border-white/20">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-white">Birth Certificate Request</CardTitle>
          <p className="text-center text-zinc-400 text-lg">
            Colorado only • More states soon • California next
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* State (locked) */}
            <div>
              <Label className="text-zinc-300">State</Label>
              <Select defaultValue="CO" disabled>
                <SelectTrigger className="bg-zinc-950 border-zinc-700 text-white">
                  <SelectValue placeholder="Colorado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CO">Colorado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-zinc-300">Full name at birth</Label>
                <Input 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  required 
                  className="bg-zinc-950 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>
              <div>
                <Label className="text-zinc-300">Date of birth</Label>
                <Input 
                  type="date" 
                  name="dateOfBirth" 
                  value={formData.dateOfBirth} 
                  onChange={handleChange} 
                  required 
                  className="bg-zinc-950 border-zinc-700 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-zinc-300">Mother's full name</Label>
                <Input 
                  name="motherName" 
                  value={formData.motherName} 
                  onChange={handleChange} 
                  required 
                  className="bg-zinc-950 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>
              <div>
                <Label className="text-zinc-300">Father's full name</Label>
                <Input 
                  name="fatherName" 
                  value={formData.fatherName} 
                  onChange={handleChange} 
                  required 
                  className="bg-zinc-950 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>
            </div>

            <div>
              <Label className="text-zinc-300">Birth county</Label>
              <Select name="birthCounty" onValueChange={(value) => setFormData({ ...formData, birthCounty: value })}>
                <SelectTrigger className="bg-zinc-950 border-zinc-700 text-white">
                  <SelectValue placeholder="Select county" />
                </SelectTrigger>
                <SelectContent>
                  {coloradoCounties.map((county) => (
                    <SelectItem key={county} value={county}>{county}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-zinc-300">Current mailing address</Label>
              <Input 
                name="mailingAddress1" 
                placeholder="Address line 1" 
                value={formData.mailingAddress1} 
                onChange={handleChange} 
                required 
                className="bg-zinc-950 border-zinc-700 text-white placeholder:text-zinc-500"
              />
              <Input 
                name="mailingAddress2" 
                placeholder="Address line 2 (optional)" 
                value={formData.mailingAddress2} 
                onChange={handleChange} 
                className="bg-zinc-950 border-zinc-700 text-white placeholder:text-zinc-500"
              />
              <Input 
                name="mailingCityStateZip" 
                placeholder="City, State, ZIP" 
                value={formData.mailingCityStateZip} 
                onChange={handleChange} 
                required 
                className="bg-zinc-950 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>

            <Button type="submit" size="lg" className="w-full text-lg py-7 rounded-full bg-white text-black hover:bg-zinc-200">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}