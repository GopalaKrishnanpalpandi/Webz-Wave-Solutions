
import AnimatedCard from "@/components/AnimatedCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FloatingShapes from "@/components/3d/FloatingShapes";
import RotatingCube from "@/components/3d/RotatingCube";
import FloatingCard from "@/components/3d/FloatingCard";
import AnimatedBackground from "@/components/3d/AnimatedBackground";
import ProtectedImage from "@/components/ProtectedImage";

const About = () => {
  const team = [
    {
      name: "Gopalakrishnan P",
      position: "Founder",
      image: "/Profile Images/gopal.jpg",
      bio: "Expert in digital transformation and tech leadership.",
      delay: 100,
    },
    {
      name: "Anurag",
      position: "Creative Director & Co-Founder",
      image: "/Profile Images/anurag.jpg",
      bio: "Award-winning designer with expertise in brand identity and UX/UI.",
      delay: 200,
    },
    {
      name: "Harivenkat",
      position: "Technical Lead & Co-Founder",
      image: "/Profile Images/harivenkat.jpg",
      bio: "Full-stack developer specializing in scalable web applications.",
      delay: 300,
    },
    {
      name: "Assumpta Renina",
      position: "CEO & Data Analyst",
      image: "/Profile Images/renina.jpg",
      bio: "Expert in Computer Science with focus on machine learning and AI.",
      delay: 400,
    },
    {
      name: "Sheba Samuel",
      position: "Marketing Strategist",
      image: "/Profile Images/sheba.jpg",
      bio: "Digital marketing expert with experience across multiple industries.",
      delay: 500,
    },
    {
      name: "Kaniskha C",
      position: "Client Manager",
      image: "/Profile Images/kaniskha.jpg",
      bio: "Dedicated to ensuring client satisfaction and project success.",
      delay: 600,
    },
    {
      name: "Tamilarasu",
      position: "DevOps Engineer",
      image: "/Profile Images/tamilarasu.jpg",
      bio: "Cloud infrastructure specialist with expertise in CI/CD pipelines and automation.",
      delay: 700,
    },
    {
      name: "Bhuvaneshwaran",
      position: "UX Researcher",
      image: "/Profile Images/bhuvi.png",
      bio: "Human-centered design expert focused on creating intuitive user experiences.",
      delay: 800,
    },
    {
      name: "Barathvikraman S K",
      position: "Mobile Development Lead",
      image: "/Profile Images/barath.jpg",
      bio: "Specialized in native and cross-platform mobile application development.",
      delay: 900,
    },
  ];

  const milestones = [
    {
      year: "2024",
      title: "Company Founded",
      description: "WebZ Wave Solutions was established with a mission to provide innovative digital solutions.",
      delay: 100,
    },
    {
      year: "2024",
      title: "Expanded Services",
      description: "Added data science and advanced analytics to our service offerings.",
      delay: 200,
    },
    {
      year: "2024",
      title: "International Expansion",
      description: "Opened our first international office and expanded our client base globally.",
      delay: 300,
    },
    {
      year: "2025",
      title: "Industry Recognition",
      description: "Received multiple awards for our innovative approach to digital solutions.",
      delay: 400,
    },
    {
      year: "2025",
      title: "Strategic Partnerships",
      description: "Formed strategic partnerships with leading technology providers.",
      delay: 500,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pb-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="blob animate-blob bg-brand-purple/20 w-96 h-96 top-0 -right-20 absolute"></div>
        <div className="blob animate-blob bg-brand-teal/10 w-80 h-80 bottom-10 left-10 absolute animation-delay-2000"></div>

        {/* 3D Floating Shapes */}
        <FloatingShapes
          count={12}
          colors={['#6d28d9', '#0ea5e9', '#10b981']}
          speed={0.3}
          size={20}
        />

        {/* 3D Rotating Cube */}
        <div className="absolute top-1/3 left-10 hidden lg:block">
          <RotatingCube size={50} color="#6d28d9" speed={1.5} />
        </div>

        {/* Animated Background */}
        <AnimatedBackground
          color1="rgba(109, 40, 217, 0.03)"
          color2="rgba(14, 165, 233, 0.03)"
          speed={0.3}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-white rounded-lg p-2 flex items-center justify-center mb-4">
                <ProtectedImage
                  src="/wws logo.png"
                  alt="WebZ Wave Solutions Logo"
                  className="h-16 w-auto"
                  watermarkText="© WebZ Wave Solutions"
                  blurOnRightClick={true}
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold animate-fade-in">About Us</h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              We are a team of passionate digital experts committed to delivering exceptional results
              and driving digital transformation for businesses worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedCard className="p-0 overflow-hidden">
              <ProtectedImage
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Our Team"
                className="w-full h-full object-cover rounded-xl"
                watermarkText="© WebZ Wave Solutions"
                blurOnRightClick={true}
              />
            </AnimatedCard>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Founded in 2024, WebZ Wave Solutions began as a small web development agency with a big vision:
                to help businesses harness the power of digital technology to grow and thrive in an increasingly
                connected world.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Over the years, we've evolved into a comprehensive digital solutions provider, adding expertise
                in digital marketing, data science, graphic design, and CRM implementations. Our growth has been
                driven by our commitment to excellence, innovation, and client success.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Today, we serve clients across various industries, from startups to established enterprises,
                helping them navigate the digital landscape and achieve their business objectives through
                strategic digital solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedCard>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300">
                To empower businesses with innovative digital solutions that drive growth, efficiency, and
                competitive advantage in an ever-evolving digital landscape.
              </p>
            </AnimatedCard>
            <AnimatedCard delay={100}>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-300">
                To be a global leader in digital transformation, recognized for our expertise, innovation,
                and commitment to delivering exceptional value to our clients.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These principles guide our work and define our culture at WebZ Wave Solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedCard delay={100}>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We embrace new technologies and creative approaches to solve complex problems and deliver
                cutting-edge solutions.
              </p>
            </AnimatedCard>
            <AnimatedCard delay={200}>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We strive for the highest quality in everything we do, from code to design to client communication.
              </p>
            </AnimatedCard>
            <AnimatedCard delay={300}>
              <h3 className="text-xl font-bold mb-3">Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We work closely with our clients and within our team, leveraging diverse perspectives to create better outcomes.
              </p>
            </AnimatedCard>
            <AnimatedCard delay={400}>
              <h3 className="text-xl font-bold mb-3">Integrity</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We operate with honesty, transparency, and ethical behavior in all our business dealings.
              </p>
            </AnimatedCard>
            <AnimatedCard delay={500}>
              <h3 className="text-xl font-bold mb-3">Client-Centric</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We put our clients' needs first, focusing on delivering solutions that address their unique challenges and objectives.
              </p>
            </AnimatedCard>
            <AnimatedCard delay={600}>
              <h3 className="text-xl font-bold mb-3">Continuous Learning</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We invest in ongoing education and skill development to stay at the forefront of digital innovation.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our diverse team of 9 experts brings together a wealth of knowledge and experience across various digital disciplines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <FloatingCard key={index} depth={15} maxTilt={10} glareOpacity={0.1}>
                <AnimatedCard delay={member.delay} className="text-center">
                  <div className="mb-4">
                    <ProtectedImage
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                      watermarkText={`© WebZ Wave Solutions - ${member.name}`}
                      blurOnRightClick={true}
                      onError={(e) => {
                        // Fallback to default image if the custom image fails to load
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // Prevent infinite loop
                        target.src = `https://randomuser.me/api/portraits/${member.name.toLowerCase().includes('mrs') || member.name.toLowerCase().includes('ms') || member.position.toLowerCase().includes('woman') ? 'women' : 'men'}/${Math.floor(Math.random() * 70) + 1}.jpg`;
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-brand-purple font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                </AnimatedCard>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section relative overflow-hidden">
        {/* 3D Rotating Cube */}
        <div className="absolute bottom-20 right-10 hidden lg:block">
          <RotatingCube size={60} color="#10b981" speed={1.8} />
        </div>

        {/* Floating Shapes */}
        <FloatingShapes
          count={10}
          colors={['#6d28d9', '#0ea5e9']}
          speed={0.25}
          size={18}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Key milestones in our company's growth and evolution.
            </p>
          </div>

          <div className="relative border-l border-gray-200 dark:border-gray-700 ml-3 md:ml-6 pl-6 md:pl-10">
            {milestones.map((milestone, index) => (
              <div key={index} className="mb-10 ml-4" style={{ animationDelay: `${milestone.delay}ms` }}>
                <div className="absolute w-5 h-5 bg-brand-purple rounded-full -left-2.5 border border-white dark:border-gray-900"></div>
                <div className="absolute w-3 h-3 bg-white dark:bg-gray-800 rounded-full -left-1.5 top-1 border border-brand-purple"></div>
                <time className="mb-1 text-sm font-normal leading-none text-brand-purple">{milestone.year}</time>
                <h3 className="text-xl font-bold mt-2 mb-1">{milestone.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Journey</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              Partner with WebZ Wave Solutions and let's create digital success together.
              We're ready to help your business achieve its digital transformation goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-brand-purple hover:bg-brand-purple/90">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="inline-flex items-center">
                <Link to="/services">
                  Our Services <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
