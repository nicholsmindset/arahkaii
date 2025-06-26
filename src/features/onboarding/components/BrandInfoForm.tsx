import { useState } from 'react';
import { BrandInfo } from '../types';

interface BrandInfoFormProps {
  data: BrandInfo;
  onChange: (data: BrandInfo) => void;
}

export const BrandInfoForm = ({ data, onChange }: BrandInfoFormProps) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (field: keyof BrandInfo, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    onChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Brand Name
        </label>
        <input
          type="text"
          value={formData.brandName}
          onChange={(e) => handleChange('brandName', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          placeholder="Your brand name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Brand Description
        </label>
        <textarea
          value={formData.brandDescription}
          onChange={(e) => handleChange('brandDescription', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          placeholder="Tell us about your brand"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Brand Logo
        </label>
        <input
          type="url"
          value={formData.brandLogo}
          onChange={(e) => handleChange('brandLogo', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          placeholder="URL to your brand logo"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Brand Website
        </label>
        <input
          type="url"
          value={formData.brandWebsite}
          onChange={(e) => handleChange('brandWebsite', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          placeholder="Your brand website"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Social Media</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Instagram
            </label>
            <input
              type="url"
              value={formData.brandSocialMedia.instagram || ''}
              onChange={(e) =>
                handleChange('brandSocialMedia', { ...formData.brandSocialMedia, instagram: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              placeholder="Instagram profile URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Facebook
            </label>
            <input
              type="url"
              value={formData.brandSocialMedia.facebook || ''}
              onChange={(e) =>
                handleChange('brandSocialMedia', { ...formData.brandSocialMedia, facebook: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              placeholder="Facebook page URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Twitter
            </label>
            <input
              type="url"
              value={formData.brandSocialMedia.twitter || ''}
              onChange={(e) =>
                handleChange('brandSocialMedia', { ...formData.brandSocialMedia, twitter: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              placeholder="Twitter profile URL"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
