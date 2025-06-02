
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import AnimatedCard from "./AnimatedCard";

interface TestimonialProps {
  name: string;
  position: string;
  company: string;
  testimonial: string;
  rating: number;
  image: string;
  delay?: number;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({
  name,
  position,
  company,
  testimonial,
  rating,
  image,
  delay = 0,
  className,
}) => {
  return (
    <AnimatedCard
      delay={delay}
      className={cn(
        "h-full flex flex-col relative",
        "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-brand-purple/50 before:to-brand-teal/50 before:rounded-t-lg",
        className
      )}
    >
      {/* Quote mark decoration */}
      <div className="absolute -top-4 -left-2 text-6xl text-brand-purple/10 font-serif">
        "
      </div>

      {/* Rating Stars */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={cn(
              "mr-1",
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            )}
          />
        ))}
      </div>

      {/* Testimonial Content */}
      <p className="text-gray-600 dark:text-gray-300 mb-6 flex-1 relative z-10">"{testimonial}"</p>

      {/* Person Info */}
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-brand-purple/30 shadow-md">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to default image if the custom image fails to load
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.src = `https://randomuser.me/api/portraits/${name.toLowerCase().includes('mrs') || name.toLowerCase().includes('ms') || position.toLowerCase().includes('woman') ? 'women' : 'men'}/${Math.floor(Math.random() * 70)}.jpg`;
            }}
          />
        </div>
        <div>
          <h4 className="font-bold text-lg">{name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {position}, {company}
          </p>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default TestimonialCard;
