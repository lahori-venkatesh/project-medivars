
import { HeroSection } from '../components/HeroSection';
import { ValueProposition } from '../components/ValueProposition';
import { ReviewSection } from '../components/ReviewSection';
import { FAQSection } from '../components/FAQSection';

export function HomePage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <HeroSection />
      <ValueProposition />
      <ReviewSection />
      <FAQSection />
    </div>
  );
}