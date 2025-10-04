import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { reviews } from '../data/reviews';

export function ReviewSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Clone reviews for infinite effect
    const reviewsToAdd = Array.from(scrollContainer.children);
    reviewsToAdd.forEach(review => {
      const clone = review.cloneNode(true);
      scrollContainer.appendChild(clone);
    });

    // Automatic scrolling animation
    const scroll = () => {
      if (!scrollContainer) return;
      
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);

    // Pause on hover
    const handleMouseEnter = () => clearInterval(interval);
    const handleMouseLeave = () => setInterval(scroll, 30);

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(interval);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Patients Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real experiences from people who have used our platform
          </p>
        </div>

        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10" />

          {/* Scrolling container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-hidden gap-6 py-4 scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {reviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="flex-none w-[350px] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{review.author}</h4>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}