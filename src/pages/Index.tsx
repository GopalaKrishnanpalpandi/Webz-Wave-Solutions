import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import AnimatedCard from "@/components/AnimatedCard";
import WaveAnimation from "@/components/WaveAnimation";
import { ArrowRight, Code, Globe, BarChart3, Pencil, LineChart, Waves } from "lucide-react";
import FloatingShapes from "@/components/3d/FloatingShapes";
import RotatingCube from "@/components/3d/RotatingCube";
import AnimatedBackground from "@/components/3d/AnimatedBackground";
import SplineViewer from "@/components/3d/SplineViewer";
import SplineEmbed from "@/components/3d/SplineEmbed";
import SplineIframe from "@/components/3d/SplineIframe";
import SplineAlternative from "@/components/3d/SplineAlternative";
import SplineLocal from "@/components/3d/SplineLocal";

const Index = () => {
  const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with cutting-edge technologies.",
      icon: <Code size={24} />,
      link: "/services/web-development/custom-website-development",
      delay: 100,
    },
    {
      title: "Digital Marketing",
      description: "Strategic digital marketing campaigns to boost your online presence.",
      icon: <Globe size={24} />,
      link: "/services/digital-marketing/search-engine-optimization",
      delay: 200,
    },
    {
      title: "Data Science",
      description: "Harness the power of data with our advanced analytics solutions.",
      icon: <BarChart3 size={24} />,
      link: "/services/data-science/data-analysis-visualization",
      delay: 300,
    },
    {
      title: "Graphic Design",
      description: "Eye-catching visual designs that bring your brand to life.",
      icon: <Pencil size={24} />,
      link: "/services/graphic-design/brand-identity-design",
      delay: 400,
    },
    {
      title: "CRM Solutions",
      description: "Optimize customer relationships with tailored CRM implementations.",
      icon: <LineChart size={24} />,
      link: "/services/crm/crm-strategy-development",
      delay: 500,
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO",
      company: "TechStart Inc.",
      testimonial: "WebZ Wave transformed our digital presence completely. Their team delivered a stunning website that exceeded our expectations and has significantly increased our conversions.",
      rating: 5,
      image: "/testimonials/client1.jpg",
      delay: 100,
    },
    {
      name: "Michael Chen",
      position: "Marketing Director",
      company: "Innovate Solutions",
      testimonial: "Their digital marketing strategies have been game-changing for us. Within three months, we saw a 140% increase in qualified leads and our social engagement doubled.",
      rating: 5,
      image: "/testimonials/client2.jpg",
      delay: 200,
    },
    {
      name: "Alicia Rodriguez",
      position: "Product Manager",
      company: "DataViz Corp",
      testimonial: "The data visualization tools created by WebZ Wave helped us make sense of complex datasets and make better business decisions. Their data science team is truly outstanding.",
      rating: 5,
      image: "/testimonials/client3.jpg",
      delay: 300,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-4 pb-20 overflow-hidden">
        {/* Background blobs */}
        <div className="blob animate-blob bg-brand-purple/30 w-96 h-96 top-20 -left-10 absolute"></div>
        <div className="blob animate-blob bg-brand-blue/20 w-80 h-80 top-40 right-20 absolute animation-delay-2000"></div>
        <div className="blob animate-blob bg-brand-teal/20 w-72 h-72 bottom-10 left-1/4 absolute animation-delay-4000"></div>

        {/* 3D Floating Shapes */}
        <FloatingShapes
          count={15}
          colors={['#6d28d9', '#0ea5e9', '#10b981']}
          speed={0.3}
          size={25}
        />

        {/* 3D Rotating Cube */}
        <div className="absolute top-1/4 right-10 hidden lg:block">
          <RotatingCube size={60} color="#6d28d9" speed={1.5} />
        </div>

        {/* Wave animation at the bottom of the hero */}
        <div className="absolute bottom-0 left-0 w-full z-10">
          <WaveAnimation height={80} color="#6C3CE9" speed={0.0005} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                Transforming Ideas Into <span className="text-gradient">Digital Excellence</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                WebZ Wave Solutions delivers cutting-edge web development, digital marketing, data science, and design solutions to help your business thrive in the digital landscape.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Button asChild size="lg" className="bg-brand-purple hover:bg-brand-purple/90">
                  <Link to="/contact">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/services">Our Services</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 mt-10 lg:mt-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="relative">
                <SplineLocal
                  fileName="celestial_flow_abstract_digital_form.spline"
                  className="relative rounded-lg shadow-2xl w-full h-96"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Add curved wave animation at the top of the section */}
        <div className="absolute top-0 left-0 w-full rotate-180 z-0">
          <WaveAnimation height={60} color="#F6F6F7" speed={0.0003} />
        </div>

        {/* Animated Background */}
        <AnimatedBackground
          color1="rgba(109, 40, 217, 0.05)"
          color2="rgba(14, 165, 233, 0.05)"
          speed={0.5}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We provide end-to-end solutions designed to transform your business in the digital world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
                delay={service.delay}
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button asChild size="lg" variant="outline" className="inline-flex items-center">
              <Link to="/services">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Add wave animation at the bottom of this section */}
        <div className="absolute bottom-0 left-0 w-full z-0">
          <WaveAnimation height={60} color="#FFFFFF" speed={0.0004} amplitude={15} />
        </div>
      </section>

      {/* About Section */}
      <section className="section relative overflow-hidden">
        {/* 3D Rotating Cube */}
        <div className="absolute bottom-10 left-10 hidden lg:block">
          <RotatingCube size={80} color="#10b981" speed={2} />
        </div>

        {/* Floating Shapes */}
        <FloatingShapes
          count={8}
          colors={['#10b981', '#0ea5e9']}
          speed={0.2}
          size={20}
        />

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedCard className="p-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Our Team"
                className="w-full h-full object-cover rounded-xl"
              />
            </AnimatedCard>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">We're more than just a digital agency</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                WebZ Wave Solutions is a team of passionate digital experts committed to delivering exceptional
                results for our clients. We blend creativity with technical expertise to create solutions that drive
                real business growth.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-brand-purple/10 p-3 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-brand-purple"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Innovation</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We stay at the forefront of digital technologies
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-brand-purple/10 p-3 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-brand-purple"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Quality</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Excellence is our standard in everything we deliver
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-brand-purple/10 p-3 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-brand-purple"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Results</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We focus on outcomes that drive your business forward
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-brand-purple/10 p-3 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-brand-purple"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Partnership</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We build long-term relationships with our clients
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild size="lg" className="bg-brand-purple hover:bg-brand-purple/90">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Add wave animation at the top */}
        <div className="absolute top-0 left-0 w-full rotate-180 z-0">
          <WaveAnimation height={50} color="#FFFFFF" speed={0.0002} />
        </div>

        {/* Background decoration */}
        <div className="blob animate-blob bg-brand-purple/10 w-96 h-96 top-20 -right-20 absolute"></div>
        <div className="blob animate-blob bg-brand-teal/10 w-80 h-80 bottom-20 left-20 absolute animation-delay-2000"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We take pride in delivering exceptional results and building lasting relationships with our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
              Join our growing list of satisfied clients and experience the WebZ Wave difference for yourself.
            </p>
            <Button asChild size="lg" className="bg-brand-purple hover:bg-brand-purple/90">
              <Link to="/contact">Get Started Today</Link>
            </Button>
          </div>
        </div>

        {/* Add wave at the bottom */}
        <div className="absolute bottom-0 left-0 w-full z-0">
          <WaveAnimation height={50} color="#FFFFFF" speed={0.0003} amplitude={18} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section relative overflow-hidden">
        {/* Add a stylized wave animation background */}
        <div className="absolute inset-0 z-0">
          <WaveAnimation className="h-full" color="#f3f4f6" speed={0.0001} amplitude={30} />
        </div>

        <div className="blob animate-blob bg-brand-purple/20 w-96 h-96 -bottom-20 -right-20 absolute"></div>
        <div className="blob animate-blob bg-brand-blue/10 w-80 h-80 top-10 left-10 absolute animation-delay-2000"></div>

        {/* 3D Rotating Cubes */}
        <div className="absolute top-1/4 left-1/4 hidden lg:block">
          <RotatingCube size={40} color="#6d28d9" speed={1.2} />
        </div>
        <div className="absolute bottom-1/4 right-1/4 hidden lg:block">
          <RotatingCube size={50} color="#0ea5e9" speed={1.5} />
        </div>

        {/* Floating Shapes */}
        <FloatingShapes
          count={12}
          colors={['#6d28d9', '#0ea5e9', '#10b981']}
          speed={0.4}
          size={15}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              Partner with WebZ Wave Solutions and start your journey towards digital excellence today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-brand-purple hover:bg-brand-purple/90">
                <Link to="/contact">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
