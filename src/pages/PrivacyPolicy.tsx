import AnimatedCard from "@/components/AnimatedCard";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pb-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="blob animate-blob bg-brand-purple/20 w-96 h-96 top-0 -right-20 absolute"></div>
        <div className="blob animate-blob bg-brand-teal/10 w-80 h-80 bottom-10 left-10 absolute animation-delay-2000"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold animate-fade-in">Privacy Policy</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-6 mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedCard>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                At WebZ Wave Solutions, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This privacy policy applies to all information collected through our website, as well as any related services, sales, marketing, or events.
              </p>
            </AnimatedCard>

            <AnimatedCard delay={100} className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We collect several types of information from and about users of our website, including:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Personal identifiers such as name, email address, phone number, and company name.</li>
                <li>Information that you provide by filling in forms on our website, including information provided at the time of requesting services.</li>
                <li>Records and copies of your correspondence if you contact us.</li>
                <li>Details of transactions you carry out through our website and of the fulfillment of your orders.</li>
                <li>Usage details, IP addresses, browser type, and other technology on the devices you use to access our website.</li>
              </ul>
            </AnimatedCard>

            <AnimatedCard delay={200} className="mt-8">
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We use information that we collect about you or that you provide to us:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>To present our website and its contents to you.</li>
                <li>To provide you with information, products, or services that you request from us.</li>
                <li>To fulfill any other purpose for which you provide it.</li>
                <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
                <li>To notify you about changes to our website or any products or services we offer.</li>
                <li>To improve our website, products or services, marketing, or customer relationships.</li>
                <li>In any other way we may describe when you provide the information.</li>
                <li>For any other purpose with your consent.</li>
              </ul>
            </AnimatedCard>

            <AnimatedCard delay={300} className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on secure servers behind firewalls.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our website. Any transmission of personal information is at your own risk.
              </p>
            </AnimatedCard>

            <AnimatedCard delay={400} className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We use cookies and similar tracking technologies to track the activity on our website and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </AnimatedCard>

            <AnimatedCard delay={500} className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>The right to access your personal data.</li>
                <li>The right to rectification of your personal data.</li>
                <li>The right to erasure of your personal data.</li>
                <li>The right to restrict processing of your personal data.</li>
                <li>The right to data portability.</li>
                <li>The right to object to processing of your personal data.</li>
                <li>Rights in relation to automated decision making and profiling.</li>
              </ul>
            </AnimatedCard>

            <AnimatedCard delay={600} className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-300">Email: webzwavesolutions@gmail.com</p>
                <p className="text-gray-600 dark:text-gray-300">Phone: +91 9342336959</p>
                <p className="text-gray-600 dark:text-gray-300">Address: 395, Sarojini Naidu Street, Siddhapudur, Coimbatore - 641044</p>
              </div>
            </AnimatedCard>

            <div className="mt-12 text-center">
              <Button asChild variant="outline" className="inline-flex items-center">
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
