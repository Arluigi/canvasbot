'use client';

import { useState } from 'react';
import { LTIContext } from '@/types';

interface SetupWizardProps {
  ltiContext: LTIContext;
  onSetupComplete: () => void;
}

export default function SetupWizard({ ltiContext, onSetupComplete }: SetupWizardProps) {
  const [botAdded, setBotAdded] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = () => {
    if (!botAdded) return;
    
    setIsCompleting(true);
    
    // Store setup completion in localStorage
    const setupData = {
      botAdded: true,
      timestamp: Date.now()
    };
    localStorage.setItem(`uiuc-chat-setup-${ltiContext.courseId}`, JSON.stringify(setupData));
    
    // Small delay for UX smoothness
    setTimeout(() => {
      onSetupComplete();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="shadow-lg" style={{backgroundColor: '#13294B'}}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-12">
              <img 
                src="/illinois-block-i.svg" 
                alt="Illinois Block I" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Illinois Chat Setup
              </h1>
              <p className="text-sm text-blue-200">
                {ltiContext.courseName}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Setup Required</h2>
            <p className="text-gray-600">
              Before using Illinois Chat, you need to add the AI bot to your Canvas course.
            </p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Canvas Permission Required</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    Before proceeding, you <strong>MUST</strong> add the UIUC Chatbot as a student to your Canvas course at{' '}
                    <a href="https://canvas.illinois.edu" target="_blank" rel="noopener noreferrer" className="underline">
                      canvas.illinois.edu
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Bot Student Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <div>
                    <span className="text-sm font-medium text-blue-800">Email:</span>
                    <span className="ml-2 font-mono text-blue-900 bg-white px-2 py-1 rounded border">
                      uiuc.chat@ad.uillinois.edu
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <span className="text-sm font-medium text-blue-800">Name:</span>
                    <span className="ml-2 text-blue-900">UIUC Course AI</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Step-by-Step Instructions</h3>
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span>Go to your Canvas course at <a href="https://canvas.illinois.edu" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">canvas.illinois.edu</a></span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span>Navigate to <strong>People</strong> in your course menu</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span>Click <strong>+ People</strong> button</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <span>Enter the email: <strong>uiuc.chat@ad.uillinois.edu</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                  <span>Set role to <strong>Student</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span>
                  <span>Click <strong>Add Users</strong></span>
                </li>
              </ol>
              
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>Why is this required?</strong> The AI can only access content that students/TAs can see. 
                  Adding the bot as a student gives it permission to read course materials, assignments, and announcements.
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center space-x-3 mb-4">
                <input
                  type="checkbox"
                  id="bot-added"
                  checked={botAdded}
                  onChange={(e) => setBotAdded(e.target.checked)}
                  className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                />
                <label htmlFor="bot-added" className="text-sm font-medium text-gray-700">
                  I have successfully added <strong>uiuc.chat@ad.uillinois.edu</strong> as a student to my Canvas course
                </label>
              </div>
              
              <div className="flex justify-between items-center">
                <a 
                  href="https://canvas.illinois.edu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-500 text-sm underline"
                >
                  Open Canvas in New Tab →
                </a>
                
                <button
                  onClick={handleComplete}
                  disabled={!botAdded || isCompleting}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    botAdded && !isCompleting
                      ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isCompleting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Starting Chat...</span>
                    </div>
                  ) : (
                    'Continue to Chat'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}