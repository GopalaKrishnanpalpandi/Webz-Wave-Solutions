import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedCard from "@/components/AnimatedCard";
import WaveAnimation from "@/components/WaveAnimation";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useEffect } from "react";

interface ServiceDetailProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  features: string[];
  process: {
    title: string;
    description: string;
  }[];
  benefits: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  relatedServices: {
    id: string;
    title: string;
    path: string;
  }[];
  categoryId: string;
  categoryTitle: string;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({
  id,
  title,
  description,
  icon,
  image,
  features,
  process,
  benefits,
  faq,
  relatedServices,
  categoryId,
  categoryTitle,
}) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background blobs */}
        <div className="blob animate-blob bg-brand-purple/30 w-96 h-96 top-20 -left-10 absolute"></div>
        <div className="blob animate-blob bg-brand-blue/20 w-80 h-80 top-40 right-20 absolute animation-delay-2000"></div>
        
        {/* Wave animation at the bottom of the hero */}
        <div className="absolute bottom-0 left-0 w-full z-10">
          <WaveAnimation height={80} color="#F9FAFB" speed={0.0005} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4 animate-fade-in">
              <Link 
                to={`/services#${categoryId}`} 
                className="text-brand-purple hover:text-brand-purple/80 transition-colors flex items-center"
              >
                <ArrowLeft size={16} className="mr-1" />
                {categoryTitle}
              </Link>
            </div>
            <div className="flex items-center justify-center mb-6">
              <div className="inline-flex items-center justify-center p-3 rounded-lg bg-brand-purple/10 text-brand-purple">
                {icon}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">{title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <AnimatedCard className="p-0 overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </AnimatedCard>
            <div>
              <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Our {title} service is designed to help your business thrive in the digital landscape. 
                We combine industry expertise with cutting-edge technology to deliver exceptional results.
              </p>
              <ul className="space-y-4">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle size={20} className="text-brand-purple mr-3 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Process */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Process</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We follow a structured approach to ensure the successful delivery of your {title} project.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {process.map((step, idx) => (
                <AnimatedCard key={idx} delay={idx * 100}>
                  <div className="text-3xl font-bold text-brand-purple mb-4">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </AnimatedCard>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Benefits</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Here's how our {title} service can benefit your business.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, idx) => (
                <AnimatedCard key={idx} delay={idx * 100} className="h-full">
                  <div className="flex items-start">
                    <CheckCircle size={20} className="text-brand-purple mr-3 mt-1 flex-shrink-0" />
                    <p>{benefit}</p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>

          {/* FAQ */}
          {faq.length > 0 && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Get answers to common questions about our {title} service.
                </p>
              </div>
              <div className="max-w-4xl mx-auto">
                {faq.map((item, idx) => (
                  <AnimatedCard key={idx} delay={idx * 100} className="mb-4">
                    <h3 className="text-xl font-bold mb-3">{item.question}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          )}

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Related Services</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Explore other services that complement {title}.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedServices.map((service, idx) => (
                  <AnimatedCard key={idx} delay={idx * 100} className="h-full flex flex-col">
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <Button asChild variant="outline" className="mt-auto self-start">
                      <Link to={service.path} className="flex items-center">
                        Learn More <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </Button>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              Contact us today to discuss how our {title} service can help your business grow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-brand-purple hover:bg-brand-purple/90">
                <Link to="/contact">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/services">Explore Other Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
