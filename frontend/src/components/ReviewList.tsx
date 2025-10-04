import React, { useState } from 'react';
import { Star, ThumbsUp, Flag } from 'lucide-react';
import { Review } from '../types';
import { format } from 'date-fns';

interface ReviewListProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
}

export function ReviewList({ reviews, onAddReview }: ReviewListProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReview({
      doctorId: 'current_doctor_id',
      patientId: 'current_user_id',
      author: 'Current User',
      rating,
      comment,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100'
    });
    setComment('');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <div className="flex gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-6 h-6 ${
                    value <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Your Review</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Share your experience..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit Review
        </button>
      </form>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <h4 className="font-medium">{review.author}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {format(new Date(review.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <ThumbsUp className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <Flag className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="mt-3 text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}