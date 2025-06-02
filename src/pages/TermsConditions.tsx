import AnimatedCard from "@/components/AnimatedCard";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const TermsConditions = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pb-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="blob animate-blob bg-brand-purple/20 w-96 h-96 top-0 -right-20 absolute"></div>
        <div className="blob animate-blob bg-brand-teal/10 w-80 h-80 bottom-10 left-10 absolute animation-delay-2000"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold animate-fade-in">Terms & Conditions</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-6 mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Terms & Conditions Content */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedCard>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                These terms and conditions outline the rules and regulations for the use of WebZ Wave Solutions' website. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use WebZ Wave Solutions' website if you do not accept all of the terms and conditions stated on this page.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and any or all Agreements: "Client", "You" and "Your" refers to you, the person accessing this website and accepting the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves, or either the Client or ourselves.
              </p>
            </AnimatedCard>

            <AnimatedCard delay={100} className="mt-8">
              <h2 className="text-2xl font-bold mb-4">License</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Unless otherwise stated, WebZ Wave Solutions and/or its licensors own the intellectual property rights for all material on WebZ Wave Solutions. All intellectual property rights are reserved. You may view and/or print pages from the website for your own personal use subject to restrictions set in these terms and conditions.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You must not:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Republish material from this website</li>
                <li>Sell, rent or sub-license material from this website</li>
                <li>Reproduce, duplicate or copy material from this website</li>
                <li>Redistribute content from WebZ Wave Solutions (unless content is specifically made for redistribution)</li>
              </ul>
            </AnimatedCard>

            <AnimatedCard delay={200} className="mt-8">
              <h2 className="text-2xl font-bold mb-4">User Content</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                In these terms and conditions, "User Content" shall mean any audio, video, text, images or other material you choose to display on this website. By displaying your User Content, you grant WebZ Wave Solutions a non-exclusive, worldwide, irrevocable, royalty-free, sublicensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your User Content must be your own and must not be infringing on any third party's rights. WebZ Wave Solutions reserves the right to remove any of your content from this website at any time without notice.
              </p>
            </AnimatedCard>

            <AnimatedCard delay={300} className="mt-8">
              <h2 className="text-2xl font-bold mb-4">No Warranties</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This website is provided "as is," with all faults, and WebZ Wave Solutions makes no express or implied representations or warranties, of any kind related to this website or the materials contained on this website. Additionally, nothing contained on this website shall be construed as providing advice to you.
              </p>
            </AnimatedCard>

            <AnimatedCard delay={400} className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                In no event shall WebZ Wave Solutions, nor any of its officers, directors and employees, be liable to you for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort or otherwise, and WebZ Wave Solutions, including its officers, directors and employees shall not be liable for any indirect, consequential or special liability arising out of or in any way related to your use of this website.
              </p>
            </AnimatedCard>

            <AnimatedCard delay={500} className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You hereby indemnify to the fullest extent WebZ Wave Solutions from and against any and all liabilities, costs, demands, causes of action, damages and expenses (including reasonable attorney's fees) arising out of or in any way related to your breach of any of the provisions of these Terms.
              </p>
            </AnimatedCard>

            <AnimatedCard delay={600} className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Severability</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                If any provision of these Terms is found to be unenforceable or invalid under any applicable law, such unenforceability or invalidity shall not render these Terms unenforceable or invalid as a whole, and such provisions shall be deleted without affecting the remaining provisions herein.
              </p>
            </AnimatedCard>

            <AnimatedCard delay={700} className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Variation of Terms</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                WebZ Wave Solutions is permitted to revise these Terms at any time as it sees fit, and by using this website you are expected to review such Terms on a regular basis to ensure you understand all terms and conditions governing use of this website.
              </p>
            </AnimatedCard>

            <AnimatedCard delay={800} className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Governing Law & Jurisdiction</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                These Terms will be governed by and construed in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.
              </p>
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

export default TermsConditions;
