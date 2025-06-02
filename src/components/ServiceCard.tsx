
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedCard from "./AnimatedCard";
import { useState } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  delay?: number;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  link,
  delay = 0,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <AnimatedCard
      delay={delay}
      className={cn(
        "h-full flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wave decoration on hover */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 w-full h-20 transition-opacity duration-3000 opacity-0", // Increased duration from 1500 to 3000ms
          isHovered && "opacity-100"
        )}
        style={{
          background: "linear-gradient(to right, rgba(108, 60, 233, 0.1), rgba(66, 133, 244, 0.1), rgba(29, 233, 182, 0.1))",
          clipPath: isHovered 
            ? "polygon(0% 100%, 10% 85%, 20% 90%, 30% 95%, 40% 80%, 50% 85%, 60% 75%, 70% 85%, 80% 80%, 90% 90%, 100% 95%, 100% 100%)"
            : "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 100% 100%)",
          transition: "clip-path 5s ease-in-out" // Extremely slow transition - 2.5s to 5s
        }}
      />

      <div>
        <div className={cn(
          "mb-4 inline-flex items-center justify-center p-3 rounded-lg text-brand-purple transition-all duration-1500", // Increased from 800 to 1500
          isHovered 
            ? "bg-brand-purple text-white" 
            : "bg-brand-purple/10 text-brand-purple"
        )}>
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      </div>
      <Button asChild variant="outline" className={cn(
        "mt-auto self-start transition-colors duration-1500", // Increased from 800 to 1500
        isHovered && "bg-brand-purple text-white hover:bg-brand-purple/90 border-brand-purple"
      )}>
        <Link to={link}>Learn More</Link>
      </Button>
    </AnimatedCard>
  );
};

export default ServiceCard;
