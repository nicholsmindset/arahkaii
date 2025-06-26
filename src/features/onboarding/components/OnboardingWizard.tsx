import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { OnboardingService } from './service';
import { BrandInfo, BusinessDetails, Product, OnboardingProgress } from '../types';
import { BrandInfoForm } from './BrandInfoForm';
import { BusinessDetailsForm } from './BusinessDetailsForm';
import { ProductsForm } from './ProductsForm';

const onboardingService = new OnboardingService();

const STEPS = [
  { id: 1, title: 'Brand Info', description: 'Tell us about your brand' },
  { id: 2, title: 'Business Details', description: 'Your business information' },
  { id: 3, title: 'First Products', description: 'Add your first 3 products' },
];

export const OnboardingWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState<OnboardingProgress>({
    step: 1,
    totalSteps: STEPS.length,
    completedSteps: [],
    currentStep: 'brand',
  });
  const [formData, setFormData] = useState({
    brandInfo: {
      brandName: '',
      brandDescription: '',
      brandLogo: '',
      brandWebsite: '',
      brandSocialMedia: {},
    },
    businessDetails: {
      businessName: '',
      businessType: '',
      businessLocation: '',
      businessEmail: '',
      businessPhone: '',
      businessEstablished: '',
    },
    products: [{ name: '', description: '', price: 0, category: '', images: [], stock: 0 }],
  });

  useEffect(() => {
    checkOnboardingProgress();
  }, []);

  const checkOnboardingProgress = async () => {
    try {
      const { data: { user } } = supabase.auth;
      if (!user) {
        navigate('/vendor/login');
        return;
      }

      const progress = await onboardingService.getOnboardingProgress(user.id);
      setProgress((prev) => ({
        ...prev,
        completedSteps: progress.brandCompleted ? [1] : [],
        currentStep: progress.brandCompleted ? 'business' : 'brand',
      }));
    } catch (error) {
      console.error('Error checking progress:', error);
    }
  };

  const handleNext = async () => {
    try {
      const { data: { user } } = supabase.auth;
      if (!user) return;

      switch (progress.currentStep) {
        case 'brand':
          await onboardingService.saveBrandInfo(formData.brandInfo);
          setProgress((prev) => ({
            ...prev,
            completedSteps: [...prev.completedSteps, 1],
            currentStep: 'business',
          }));
          break;

        case 'business':
          await onboardingService.saveBusinessDetails(formData.businessDetails);
          setProgress((prev) => ({
            ...prev,
            completedSteps: [...prev.completedSteps, 2],
            currentStep: 'products',
          }));
          break;

        case 'products':
          await onboardingService.saveProducts(formData.products);
          navigate('/vendor/dashboard');
          break;
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const renderStep = () => {
    switch (progress.currentStep) {
      case 'brand':
        return (
          <BrandInfoForm
            data={formData.brandInfo}
            onChange={(data) => setFormData((prev) => ({ ...prev, brandInfo: data }))}
          />
        );

      case 'business':
        return (
          <BusinessDetailsForm
            data={formData.businessDetails}
            onChange={(data) => setFormData((prev) => ({ ...prev, businessDetails: data }))}
          />
        );

      case 'products':
        return (
          <ProductsForm
            products={formData.products}
            onChange={(products) => setFormData((prev) => ({ ...prev, products }))}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-pink-600 mb-2">
              Welcome to Trendify Brand Hub
            </h1>
            <p className="text-gray-600">
              Complete your profile in just 15 minutes
            </p>
            <div className="mt-4">
              <div className="bg-pink-100 h-2 rounded-full">
                <div
                  className="bg-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(progress.completedSteps.length / STEPS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`flex items-center space-x-4 ${
                  progress.completedSteps.includes(step.id) ? 'text-pink-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    progress.completedSteps.includes(step.id)
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {progress.completedSteps.includes(step.id) ? '✓' : step.id}
                </div>
                <div>
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            {renderStep()}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={progress.completedSteps.includes(currentStep)}
            >
              {currentStep === STEPS.length ? 'Complete Onboarding' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
