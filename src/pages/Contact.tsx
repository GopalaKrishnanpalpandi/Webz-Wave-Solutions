
import AnimatedCard from "@/components/AnimatedCard";
import GoogleFormContact from "@/components/GoogleFormContact";
import GoogleMapsLocator from "@/components/GoogleMapsLocator";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-brand-purple" />,
      title: "Phone",
      details: "+91 9342336959",
      link: "tel:+91 9342336959",
      delay: 100,
    },
    {
      icon: <Mail className="w-6 h-6 text-brand-purple" />,
      title: "Email",
      details: "webzwavesolutions@gmail.com",
      link: "mailto:webzwavesolutions@gmail.com",
      delay: 200,
    },
    {
      icon: <MapPin className="w-6 h-6 text-brand-purple" />,
      title: "Office",
      details: "395 ,Sarojini Naidu Street ,Siddhapudur ,Coimbatore - 641044",
      link: "https://maps.google.com",
      delay: 300,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="section bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="blob animate-blob bg-brand-purple/20 w-64 sm:w-96 h-64 sm:h-96 top-0 -right-10 sm:-right-20 absolute"></div>
        <div className="blob animate-blob bg-brand-teal/10 w-56 sm:w-80 h-56 sm:h-80 bottom-10 left-5 sm:left-10 absolute animation-delay-2000"></div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 animate-fade-in">Get in Touch</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Have a question or project in mind? We'd love to hear from you.
              Fill out the form below, and our team will get back to you shortly.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div>
              <AnimatedCard className="p-6 rounded-xl">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Contact Us</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Fill out the form below, and our team will get back to you within 24 hours.
                  If you experience any issues with the form, you can also <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSe7YPcqqARfC4VyQ3q1fJ5U0xT70_diTEBMJx3o7l9Zd1XZAw/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-purple hover:underline"
                  >
                    access it directly here
                  </a>.
                </p>
                <GoogleFormContact />
              </AnimatedCard>
            </div>
            <div className="space-y-6 mt-4 lg:mt-0">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Feel free to reach out to us through any of our contact channels below.
                We're always here to help with your digital needs.
              </p>

              {contactInfo.map((info, index) => (
                <AnimatedCard
                  key={index}
                  delay={info.delay}
                  className="flex items-start p-4 sm:p-5 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="bg-brand-purple/10 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1">{info.title}</h3>
                    <a
                      href={info.link}
                      className="text-gray-600 dark:text-gray-300 hover:text-brand-purple transition-colors text-sm sm:text-base break-words"
                      target={info.title === "Office" ? "_blank" : undefined}
                      rel={info.title === "Office" ? "noopener noreferrer" : undefined}
                    >
                      {info.details}
                    </a>
                  </div>
                </AnimatedCard>
              ))}

              <AnimatedCard delay={400} className="p-4 sm:p-5 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
                <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Business Hours</h3>
                <div className="space-y-2 text-sm sm:text-base">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Saturday:</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={500} className="p-4 sm:p-5 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
                <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Follow Us</h3>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="facebook.com"
                    className="text-gray-600 dark:text-gray-300 hover:text-brand-purple transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="x.com"
                    className="text-gray-600 dark:text-gray-300 hover:text-brand-purple transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Twitter"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/webzwave_solutions?igsh=MWFhdm1maTZvNHZ6Mw=="
                    className="text-gray-600 dark:text-gray-300 hover:text-brand-purple transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="github.com"
                    className="text-gray-600 dark:text-gray-300 hover:text-brand-purple transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="GitHub"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="youtube.com"
                    className="text-gray-600 dark:text-gray-300 hover:text-brand-purple transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="YouTube"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Our Location</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Visit us at our office in Coimbatore. We're conveniently located and easily accessible.
            </p>
          </div>

          <GoogleMapsLocator
            apiKey="YOUR_API_KEY_HERE"
            className="h-64 md:h-96 rounded-lg overflow-hidden shadow-lg"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions about our services and process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            <AnimatedCard delay={100} className="p-4 sm:p-6 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">What types of businesses do you work with?</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                We work with businesses of all sizes across various industries, from startups to established enterprises.
                Our solutions are tailored to meet the specific needs of each client.
              </p>
            </AnimatedCard>
            <AnimatedCard delay={200} className="p-4 sm:p-6 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">How long does a typical project take?</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Project timelines vary depending on complexity and scope. A simple website might take 4-6 weeks,
                while more complex digital solutions can take 3-6 months. We'll provide a detailed timeline during the consultation.
              </p>
            </AnimatedCard>
            <AnimatedCard delay={300} className="p-4 sm:p-6 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">What is your pricing structure?</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Our pricing is customized based on project requirements, complexity, and timeline.
                We provide detailed proposals with transparent pricing after our initial consultation.
              </p>
            </AnimatedCard>
            <AnimatedCard delay={400} className="p-4 sm:p-6 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Do you offer ongoing support and maintenance?</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Yes, we offer various support and maintenance packages to ensure your digital solutions
                continue to perform optimally after launch.
              </p>
            </AnimatedCard>
            <AnimatedCard delay={500} className="p-4 sm:p-6 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Can you work with our existing systems?</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Absolutely. We have experience integrating with a wide range of existing systems and can
                develop solutions that work seamlessly with your current technology stack.
              </p>
            </AnimatedCard>
            <AnimatedCard delay={600} className="p-4 sm:p-6 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">How do we get started?</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Simply contact us through our form, email, or phone. We'll schedule an initial consultation to
                discuss your needs and how we can help you achieve your digital goals.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
