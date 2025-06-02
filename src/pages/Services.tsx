
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedCard from "@/components/AnimatedCard";
import {
  Globe, Code, BarChart3, Pencil, LineChart, CheckCircle,
  MonitorSmartphone, Search, BarChart, PieChart, DollarSign, FileCode,
  Layers, Database, ArrowRight
} from "lucide-react";
import { serviceCategories } from "@/data/servicesData";

const Services = () => {

  const processSteps = [
    {
      title: "Discovery",
      description: "We start by understanding your business needs, goals, and challenges.",
      number: "01",
      delay: 100,
    },
    {
      title: "Strategy",
      description: "We develop a tailored strategy to address your specific requirements.",
      number: "02",
      delay: 200,
    },
    {
      title: "Execution",
      description: "Our team of experts implements the strategy with precision and care.",
      number: "03",
      delay: 300,
    },
    {
      title: "Optimization",
      description: "We continuously refine our approach to maximize results and ROI.",
      number: "04",
      delay: 400,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pb-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="blob animate-blob bg-brand-blue/20 w-96 h-96 top-0 -right-20 absolute"></div>
        <div className="blob animate-blob bg-brand-teal/10 w-80 h-80 bottom-10 left-10 absolute animation-delay-2000"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Our Services</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              We offer a comprehensive range of digital solutions designed to transform your business
              and help you achieve your goals in the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section">
        <div className="container mx-auto px-6">
          {serviceCategories.map((category, index) => (
            <div key={index} id={category.id} className="mb-24 last:mb-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {index % 2 === 0 ? (
                  <>
                    <AnimatedCard delay={category.delay} className="p-0 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover"
                      />
                    </AnimatedCard>
                    <div>
                      <div className="flex items-center mb-4">
                        {category.icon}
                        <h2 className="text-3xl md:text-4xl font-bold ml-3">{category.title}</h2>
                      </div>
                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                        {category.description}
                      </p>
                      <ul className="space-y-4 mb-8">
                        {category.services.map((service, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="text-brand-purple mr-3">{service.icon}</div>
                            <Link
                              to={`/services/${category.id}/${service.id}`}
                              className="hover:text-brand-purple transition-colors"
                            >
                              {service.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="bg-brand-purple hover:bg-brand-purple/90">
                        <Link to="/contact">Get Started</Link>
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="flex items-center mb-4">
                        {category.icon}
                        <h2 className="text-3xl md:text-4xl font-bold ml-3">{category.title}</h2>
                      </div>
                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                        {category.description}
                      </p>
                      <ul className="space-y-4 mb-8">
                        {category.services.map((service, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="text-brand-purple mr-3">{service.icon}</div>
                            <Link
                              to={`/services/${category.id}/${service.id}`}
                              className="hover:text-brand-purple transition-colors"
                            >
                              {service.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="bg-brand-purple hover:bg-brand-purple/90">
                        <Link to="/contact">Get Started</Link>
                      </Button>
                    </div>
                    <AnimatedCard delay={category.delay} className="p-0 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover"
                      />
                    </AnimatedCard>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Process */}
      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We follow a structured approach to ensure the successful delivery of all our projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <AnimatedCard key={index} delay={step.delay}>
                <div className="text-3xl md:text-4xl font-bold text-brand-purple mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose WebZ Wave Solutions?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We combine expertise, innovation, and a client-centric approach to deliver exceptional digital solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCard delay={100}>
              <div className="mb-4 inline-flex items-center justify-center p-3 bg-brand-purple/10 rounded-lg text-brand-purple">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Expertise</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our team brings together specialists across various digital disciplines, ensuring comprehensive solutions.
              </p>
            </AnimatedCard>
            <AnimatedCard delay={200}>
              <div className="mb-4 inline-flex items-center justify-center p-3 bg-brand-purple/10 rounded-lg text-brand-purple">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Custom Solutions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We tailor our services to your specific needs, ensuring solutions that address your unique challenges.
              </p>
            </AnimatedCard>
            <AnimatedCard delay={300}>
              <div className="mb-4 inline-flex items-center justify-center p-3 bg-brand-purple/10 rounded-lg text-brand-purple">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Results-Driven</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our focus is on delivering measurable results that drive business growth and ROI.
              </p>
            </AnimatedCard>
            <AnimatedCard delay={400}>
              <div className="mb-4 inline-flex items-center justify-center p-3 bg-brand-purple/10 rounded-lg text-brand-purple">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovative Approach</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We stay at the forefront of digital trends and technologies to provide cutting-edge solutions.
              </p>
            </AnimatedCard>
            <AnimatedCard delay={500}>
              <div className="mb-4 inline-flex items-center justify-center p-3 bg-brand-purple/10 rounded-lg text-brand-purple">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Assurance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We maintain rigorous quality standards across all our services, ensuring excellence in everything we deliver.
              </p>
            </AnimatedCard>
            <AnimatedCard delay={600}>
              <div className="mb-4 inline-flex items-center justify-center p-3 bg-brand-purple/10 rounded-lg text-brand-purple">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Client Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We work closely with you throughout the project, ensuring transparency and alignment with your goals.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              Contact us today to discuss your project and discover how we can help you achieve your digital goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-brand-purple hover:bg-brand-purple/90">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="inline-flex items-center">
                <Link to="/about">
                  Learn About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
