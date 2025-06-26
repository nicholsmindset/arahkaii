import { useState } from 'react';
import { BusinessDetails } from '../types';

interface BusinessDetailsFormProps {
  data: BusinessDetails;
  onChange: (data: BusinessDetails) => void;
}

export const BusinessDetailsForm = ({ data, onChange }: BusinessDetailsFormProps) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (field: keyof BusinessDetails, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    onChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Business Name
        </label>
        <input
          type="text"
          value={formData.businessName}
          onChange={(e) => handleChange('businessName', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          placeholder="Your business name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Business Type
        </label>
        <select
          value={formData.businessType}
          onChange={(e) => handleChange('businessType', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          required
        >
          <option value="">Select business type</option>
          <option value="fashion">Fashion & Apparel</option>
          <option value="beauty">Beauty & Cosmetics</option>
          <option value="lifestyle">Lifestyle & Accessories</option>
          <option value="home">Home & Living</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Business Location
        </label>
        <input
          type="text"
          value={formData.businessLocation}
          onChange={(e) => handleChange('businessLocation', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          placeholder="City, Country"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Business Email
        </label>
        <input
          type="email"
          value={formData.businessEmail}
          onChange={(e) => handleChange('businessEmail', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          placeholder="Your business email"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Business Phone
        </label>
        <input
          type="tel"
          value={formData.businessPhone}
          onChange={(e) => handleChange('businessPhone', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          placeholder="Your business phone number"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Business Established
        </label>
        <input
          type="date"
          value={formData.businessEstablished}
          onChange={(e) => handleChange('businessEstablished', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          required
        />
      </div>
    </div>
  );
};
