import React, { useState, useRef } from 'react';
import { Send, Image, X } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string, file?: File) => void;
  disabled?: boolean;
}

export function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        alert('Please select an image file');
      }
    }
  };

  const clearSelectedFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || selectedFile) {
      onSendMessage(message.trim(), selectedFile || undefined);
      setMessage('');
      clearSelectedFile();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      {previewUrl && (
        <div className="mb-2 relative inline-block">
          <img src={previewUrl} alt="Preview" className="h-20 rounded-md" />
          <button
            type="button"
            onClick={clearSelectedFile}
            className="absolute -top-2 -right-2 p-1 bg-gray-800 rounded-full text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-500 hover:text-gray-700"
          disabled={disabled}
        >
          <Image className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={(!message.trim() && !selectedFile) || disabled}
          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}