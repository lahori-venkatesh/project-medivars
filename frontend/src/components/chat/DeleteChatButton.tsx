import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteChatButtonProps {
  onDelete: () => void;
  threadId: string;
}

export function DeleteChatButton({ onDelete, threadId }: DeleteChatButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowConfirm(true)}
        className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
        title="Delete chat"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      {showConfirm && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50">
          <p className="text-sm text-gray-600 mb-3">
            Are you sure you want to delete this chat? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}