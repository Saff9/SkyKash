// components/NewsletterSignup.tsx
'use client';

import { useState, useEffect } from 'react';

const PREMIUM_USERS = ['saffanakbar942@gmail.com'];

export default function NewsletterSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already subscribed (premium user)
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    
    if (storedName && storedEmail && PREMIUM_USERS.includes(storedEmail)) {
      window.location.href = '/dashboard';
      return;
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!name.trim() || !email.trim()) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (!privacyAccepted) {
      setError('Please accept the privacy policy');
      setIsLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Check if premium user
      if (PREMIUM_USERS.includes(email)) {
        localStorage.setItem('userName', name.trim());
        localStorage.setItem('userEmail', email.trim());
        window.location.href = '/dashboard';
        return;
      }

      // Regular user - submit to API
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userName', name.trim());
        localStorage.setItem('userEmail', email.trim());
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to submit. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-kashmir-gradient snow-animation flex items-center justify-center p-4">
      <div className="card max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-kashmir-dark mb-2">❄️ SkyKash</h1>
          <p className="text-kashmir-green font-semibold">Kashmir-Inspired Weather App</p>
          <p className="text-gray-600 mt-4">Subscribe to our newsletter for weather updates</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kashmir-blue focus:border-transparent transition-all duration-300"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kashmir-blue focus:border-transparent transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="privacy"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 text-kashmir-blue border-gray-300 rounded focus:ring-kashmir-blue"
              required
            />
            <label htmlFor="privacy" className="text-sm text-gray-600">
              I agree to the{' '}
              <a href="/privacy" className="text-kashmir-blue hover:underline">
                Privacy Policy
              </a>{' '}
              and want to receive weather updates
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Subscribing...' : 'Subscribe & Continue'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Already a premium user? You&apos;ll be redirected automatically</p>
        </div>
      </div>
    </div>
  );
}
