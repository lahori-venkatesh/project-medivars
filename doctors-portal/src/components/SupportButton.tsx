import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export function SupportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle support message submission
      console.log('Support message:', message);
      setMessage('');
      setIsOpen(false);
      // Show success message
    }
  };

  return (
    <>
      {/* Support Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Support Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Doctor Support
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Need help with your doctor portal? Send us a message and we'll get back to you shortly.
            </p>
            
            <form onSubmit={handleSubmit}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue or question..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                rows={4}
                required
              />
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  We typically respond within 2 hours
                </span>
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Send className="h-4 w-4" />
                  <span>Send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}