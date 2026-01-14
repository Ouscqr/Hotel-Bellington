import React from 'react';
import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../components/Button';

export function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Professional Email Formatting
    const body = `
New Contact Inquiry / Booking Request
================================

GUEST DETAILS
--------------------------------
Name:    ${formData.name}
Email:   ${formData.email}
Phone:   ${formData.phone || 'Not provided'}
Subject: ${formData.subject}

MESSAGE
--------------------------------
${formData.message}

================================
Sent from Hotel Bellington Website
    `.trim();

    const mailtoLink = `mailto:info@hotel-bellington.com?subject=${encodeURIComponent(`Website Inquiry: ${formData.subject}`)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-32 pb-24 bg-[#09090b] min-h-screen">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-heading mb-4 text-white">{t('contact.title')}</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-heading mb-8 text-white">Get in Touch</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Whether you have a question about our rooms, amenities, or anything else, our team is ready to answer all your questions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-[#18181b] border border-zinc-800 hover:border-primary/50 transition-colors">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Address</h3>
                  <p className="text-gray-400">Pieter Cornelisz Hooftstraat 78-B</p>
                  <p className="text-gray-400">Amsterdam, Netherlands</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-[#18181b] border border-zinc-800 hover:border-primary/50 transition-colors">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Phone</h3>
                  <p className="text-gray-400">020 671 6478</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-[#18181b] border border-zinc-800 hover:border-primary/50 transition-colors">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Email</h3>
                  <p className="text-gray-400">info@hotel-bellington.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#18181b] p-8 rounded-lg border border-zinc-800 shadow-xl">
            <h2 className="text-2xl font-heading mb-6 text-white">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md bg-[#27272a] border border-zinc-700 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md bg-[#27272a] border border-zinc-700 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md bg-[#27272a] border border-zinc-700 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="+31 6 12345678"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md bg-[#27272a] border border-zinc-700 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="Booking Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-md bg-[#27272a] border border-zinc-700 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <Button type="submit" fullWidth size="lg" className="flex items-center justify-center gap-2">
                <Send size={20} />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

