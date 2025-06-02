import {
  Code,
  FileCode,
  Layers,
  DollarSign,
  CheckCircle,
  MonitorSmartphone,
  Globe,
  Search,
  BarChart3,
  PieChart,
  Database,
  BarChart,
  LineChart,
  Pencil
} from "lucide-react";

// Service categories with their services
export const serviceCategories = [
  {
    id: "web-development",
    title: "Web Development",
    icon: <Code size={32} className="text-brand-purple" />,
    description: "Custom websites and web applications built with cutting-edge technologies.",
    services: [
      {
        id: "custom-website-development",
        name: "Custom Website Development",
        icon: <FileCode size={20} />,
        description: "Tailored websites designed to meet your specific business needs and goals.",
        features: [
          "Responsive design that works on all devices",
          "Custom UI/UX design tailored to your brand",
          "SEO-friendly architecture",
          "Content management system integration",
          "Performance optimization for fast loading times"
        ],
        process: [
          {
            title: "Discovery & Planning",
            description: "We analyze your requirements, target audience, and business goals to create a comprehensive project plan."
          },
          {
            title: "Design & Prototyping",
            description: "Our designers create wireframes and interactive prototypes to visualize the website before development."
          },
          {
            title: "Development",
            description: "Our developers build your website using the latest technologies and best practices."
          },
          {
            title: "Testing & Quality Assurance",
            description: "Rigorous testing across devices and browsers to ensure a flawless user experience."
          },
          {
            title: "Deployment & Launch",
            description: "We handle the deployment process and ensure a smooth launch of your new website."
          }
        ],
        benefits: [
          "Establish a professional online presence that reflects your brand identity",
          "Improve user engagement with intuitive navigation and compelling content",
          "Increase conversion rates with strategically placed call-to-actions",
          "Gain a competitive edge with a unique, custom-designed website",
          "Scale your website as your business grows"
        ],
        faq: [
          {
            question: "How long does it take to develop a custom website?",
            answer: "The timeline varies depending on the complexity of the project. A basic website typically takes 4-6 weeks, while more complex websites can take 8-12 weeks or more."
          },
          {
            question: "Will my website be mobile-friendly?",
            answer: "Absolutely! All our websites are built with responsive design, ensuring they look and function perfectly on all devices, from desktops to smartphones."
          },
          {
            question: "Can I update the website content myself?",
            answer: "Yes, we integrate content management systems (CMS) that allow you to easily update content without technical knowledge."
          }
        ],
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "web-application-development",
        name: "Web Application Development",
        icon: <Layers size={20} />,
        description: "Powerful, scalable web applications that solve complex business problems.",
        features: [
          "Custom functionality tailored to your business processes",
          "Scalable architecture to handle growth",
          "Secure data handling and user authentication",
          "API integrations with third-party services",
          "Real-time data processing capabilities"
        ],
        process: [
          {
            title: "Requirements Analysis",
            description: "We work closely with you to understand your business processes and application requirements."
          },
          {
            title: "Architecture Design",
            description: "Our architects design a scalable, secure application structure that meets your needs."
          },
          {
            title: "Development & Integration",
            description: "We build your application using modern frameworks and integrate it with necessary systems."
          },
          {
            title: "Testing & Quality Assurance",
            description: "Comprehensive testing to ensure functionality, performance, and security."
          },
          {
            title: "Deployment & Support",
            description: "We deploy your application and provide ongoing support and maintenance."
          }
        ],
        benefits: [
          "Automate complex business processes to increase efficiency",
          "Reduce operational costs by streamlining workflows",
          "Improve data accuracy and accessibility across your organization",
          "Enhance collaboration between teams and departments",
          "Gain valuable insights through integrated analytics"
        ],
        faq: [
          {
            question: "What technologies do you use for web application development?",
            answer: "We use modern technologies like React, Angular, Vue.js for frontend, and Node.js, Python, PHP for backend development, depending on project requirements."
          },
          {
            question: "Can you integrate my web application with existing systems?",
            answer: "Yes, we specialize in API integrations and can connect your web application with CRMs, ERPs, payment gateways, and other business systems."
          },
          {
            question: "How do you ensure the security of web applications?",
            answer: "We implement industry best practices for security, including encrypted data transmission, secure authentication, regular security audits, and protection against common vulnerabilities."
          }
        ],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "ecommerce-solutions",
        name: "E-commerce Solutions",
        icon: <DollarSign size={20} />,
        description: "Comprehensive e-commerce platforms that drive online sales and business growth.",
        features: [
          "User-friendly product catalog and shopping cart",
          "Secure payment gateway integration",
          "Inventory and order management",
          "Customer account management",
          "Mobile-optimized shopping experience"
        ],
        process: [
          {
            title: "Business Analysis",
            description: "We analyze your products, target market, and business model to determine the best e-commerce approach."
          },
          {
            title: "Platform Selection & Design",
            description: "We select the appropriate platform and design a user-friendly store that showcases your products."
          },
          {
            title: "Development & Integration",
            description: "We build your store with all necessary features and integrate payment gateways and shipping solutions."
          },
          {
            title: "Testing & Quality Assurance",
            description: "Rigorous testing of the entire purchase process to ensure a smooth customer experience."
          },
          {
            title: "Launch & Optimization",
            description: "We launch your store and continuously optimize it to improve conversion rates."
          }
        ],
        benefits: [
          "Expand your market reach beyond geographical limitations",
          "Increase sales with 24/7 availability for customers",
          "Reduce operational costs compared to physical retail",
          "Gain valuable customer insights through purchase data",
          "Scale your business more easily as demand grows"
        ],
        faq: [
          {
            question: "Which e-commerce platforms do you work with?",
            answer: "We work with leading platforms like Shopify, WooCommerce, Magento, and BigCommerce, as well as develop custom solutions when needed."
          },
          {
            question: "Can you migrate my existing online store to a new platform?",
            answer: "Yes, we offer migration services that include transferring products, customer data, and order history while minimizing disruption to your business."
          },
          {
            question: "How do you handle payment processing and security?",
            answer: "We integrate secure, PCI-compliant payment gateways and implement SSL certificates to ensure all customer data is protected during transactions."
          }
        ],
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "website-maintenance",
        name: "Website Maintenance & Support",
        icon: <CheckCircle size={20} />,
        description: "Ongoing maintenance and support to keep your website secure, up-to-date, and performing optimally.",
        features: [
          "Regular security updates and patches",
          "Performance monitoring and optimization",
          "Content updates and management",
          "Technical support and troubleshooting",
          "Regular backups and disaster recovery"
        ],
        process: [
          {
            title: "Initial Assessment",
            description: "We conduct a comprehensive audit of your website to identify areas for improvement."
          },
          {
            title: "Maintenance Plan",
            description: "We create a customized maintenance plan based on your website's specific needs."
          },
          {
            title: "Regular Updates",
            description: "We perform scheduled updates to keep your website secure and functioning optimally."
          },
          {
            title: "Monitoring & Support",
            description: "We continuously monitor your website's performance and provide support when issues arise."
          },
          {
            title: "Reporting & Recommendations",
            description: "We provide regular reports and recommendations for further improvements."
          }
        ],
        benefits: [
          "Prevent security breaches with regular updates and monitoring",
          "Maintain optimal website performance and speed",
          "Reduce downtime and quickly resolve technical issues",
          "Preserve and enhance your SEO rankings",
          "Focus on your business while we handle the technical aspects"
        ],
        faq: [
          {
            question: "What does website maintenance include?",
            answer: "Our maintenance services include security updates, performance optimization, content updates, technical support, backups, and monitoring."
          },
          {
            question: "How often will you update my website?",
            answer: "We perform security updates as soon as they're available, while content updates are done according to your maintenance plan schedule."
          },
          {
            question: "What happens if my website goes down?",
            answer: "Our monitoring system alerts us to downtime, and we work to restore your website as quickly as possible, often before you even notice an issue."
          }
        ],
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "progressive-web-apps",
        name: "Progressive Web Apps",
        icon: <MonitorSmartphone size={20} />,
        description: "Modern web applications that offer app-like experiences across all devices.",
        features: [
          "Offline functionality",
          "Fast loading speeds",
          "Push notifications",
          "Home screen installation",
          "Responsive design for all devices"
        ],
        process: [
          {
            title: "Feasibility Analysis",
            description: "We assess your requirements to determine if a PWA is the right solution for your business."
          },
          {
            title: "Architecture Planning",
            description: "We design the PWA architecture with a focus on performance and offline capabilities."
          },
          {
            title: "Development",
            description: "Our developers build your PWA using modern web technologies and best practices."
          },
          {
            title: "Testing & Optimization",
            description: "We test across devices and network conditions to ensure optimal performance."
          },
          {
            title: "Deployment & Monitoring",
            description: "We deploy your PWA and monitor its performance to ensure it meets user expectations."
          }
        ],
        benefits: [
          "Provide a seamless user experience across all devices",
          "Reduce development costs compared to native mobile apps",
          "Improve engagement with push notifications",
          "Increase conversion rates with faster loading times",
          "Reach users with limited connectivity through offline functionality"
        ],
        faq: [
          {
            question: "What's the difference between a PWA and a native mobile app?",
            answer: "PWAs run in the browser but offer many features of native apps, like offline functionality and push notifications. They don't require installation from app stores but can be added to home screens."
          },
          {
            question: "Do PWAs work on all devices and browsers?",
            answer: "PWAs work on all devices, but some features may have limited support in certain browsers. We ensure your PWA provides a good experience regardless of the browser used."
          },
          {
            question: "Can my existing website be converted to a PWA?",
            answer: "In most cases, yes. We can assess your current website and implement the necessary changes to transform it into a Progressive Web App."
          }
        ],
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    delay: 100,
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: <Globe size={32} className="text-brand-blue" />,
    description: "Strategic digital marketing campaigns to boost your online presence.",
    services: [
      {
        id: "search-engine-optimization",
        name: "Search Engine Optimization (SEO)",
        icon: <Search size={20} />,
        description: "Improve your website's visibility in search engine results to drive organic traffic.",
        features: [
          "Comprehensive website SEO audit",
          "Keyword research and strategy",
          "On-page optimization",
          "Technical SEO improvements",
          "Content strategy and creation",
          "Link building and off-page SEO"
        ],
        process: [
          {
            title: "SEO Audit & Analysis",
            description: "We analyze your website, competitors, and industry to identify opportunities for improvement."
          },
          {
            title: "Strategy Development",
            description: "We create a customized SEO strategy based on your business goals and target audience."
          },
          {
            title: "On-Page Optimization",
            description: "We optimize your website's content, structure, and technical elements for search engines."
          },
          {
            title: "Content Creation",
            description: "We develop high-quality, SEO-friendly content that engages users and ranks well."
          },
          {
            title: "Monitoring & Reporting",
            description: "We track your rankings, traffic, and conversions, providing regular reports on progress."
          }
        ],
        benefits: [
          "Increase organic traffic to your website",
          "Improve visibility for relevant search queries",
          "Build credibility and authority in your industry",
          "Generate high-quality leads at a lower cost than paid advertising",
          "Achieve sustainable, long-term results"
        ],
        faq: [
          {
            question: "How long does it take to see results from SEO?",
            answer: "SEO is a long-term strategy. While some improvements can be seen within a few months, significant results typically take 4-6 months or longer, depending on your industry, competition, and starting point."
          },
          {
            question: "Do you guarantee first-page rankings?",
            answer: "We don't guarantee specific rankings as search algorithms are constantly changing. However, we follow best practices and have a proven track record of improving search visibility for our clients."
          },
          {
            question: "How do you measure SEO success?",
            answer: "We track key metrics including organic traffic, keyword rankings, conversion rates, bounce rates, and return on investment to measure the success of our SEO campaigns."
          }
        ],
        image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "social-media-marketing",
        name: "Social Media Marketing",
        icon: <Globe size={20} />,
        description: "Build your brand and engage with your audience through strategic social media campaigns.",
        features: [
          "Social media strategy development",
          "Content creation and curation",
          "Community management and engagement",
          "Paid social media advertising",
          "Performance tracking and analytics"
        ],
        process: [
          {
            title: "Platform Analysis",
            description: "We identify the most effective social platforms for your business and target audience."
          },
          {
            title: "Strategy Development",
            description: "We create a comprehensive social media strategy aligned with your business goals."
          },
          {
            title: "Content Creation",
            description: "We develop engaging content that resonates with your audience and reflects your brand."
          },
          {
            title: "Campaign Management",
            description: "We manage your social media presence, including posting, engagement, and advertising."
          },
          {
            title: "Analysis & Optimization",
            description: "We analyze performance data and continuously optimize your social media strategy."
          }
        ],
        benefits: [
          "Build brand awareness and recognition",
          "Engage directly with your target audience",
          "Drive website traffic and generate leads",
          "Gain valuable customer insights and feedback",
          "Improve customer loyalty and retention"
        ],
        faq: [
          {
            question: "Which social media platforms should my business be on?",
            answer: "It depends on your industry, target audience, and goals. We'll help you identify the platforms where your audience is most active and engaged."
          },
          {
            question: "How often should we post on social media?",
            answer: "Posting frequency varies by platform and audience. We develop a content calendar with optimal posting schedules for each platform."
          },
          {
            question: "Do you handle social media advertising?",
            answer: "Yes, we create and manage targeted social media ad campaigns to reach specific audience segments and achieve your marketing objectives."
          }
        ],
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "content-marketing",
        name: "Content Marketing",
        icon: <FileCode size={20} />,
        description: "Create valuable, relevant content that attracts and engages your target audience.",
        features: [
          "Content strategy development",
          "Blog posts and articles",
          "Whitepapers and ebooks",
          "Infographics and visual content",
          "Video content production",
          "Content distribution and promotion"
        ],
        process: [
          {
            title: "Audience Research",
            description: "We identify your target audience's interests, pain points, and content preferences."
          },
          {
            title: "Content Strategy",
            description: "We develop a content strategy that aligns with your business goals and audience needs."
          },
          {
            title: "Content Creation",
            description: "Our team creates high-quality, engaging content in various formats."
          },
          {
            title: "Distribution & Promotion",
            description: "We distribute your content through appropriate channels to maximize reach."
          },
          {
            title: "Performance Analysis",
            description: "We track content performance and refine our strategy based on data."
          }
        ],
        benefits: [
          "Establish your brand as an industry authority",
          "Attract and engage your target audience",
          "Improve search engine rankings with quality content",
          "Generate leads and nurture prospects through the sales funnel",
          "Create long-term assets that continue to drive traffic"
        ],
        faq: [
          {
            question: "How do you determine what content to create?",
            answer: "We conduct keyword research, competitor analysis, and audience research to identify topics that will resonate with your audience and support your business goals."
          },
          {
            question: "How long does it take to see results from content marketing?",
            answer: "Content marketing is a long-term strategy. While some content may generate immediate engagement, building a substantial audience typically takes 6-12 months of consistent effort."
          },
          {
            question: "Do you help with content distribution?",
            answer: "Yes, we develop distribution strategies for each piece of content, including social media promotion, email marketing, and outreach to relevant publications."
          }
        ],
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "email-marketing",
        name: "Email Marketing Campaigns",
        icon: <CheckCircle size={20} />,
        description: "Connect with your audience through targeted, personalized email campaigns.",
        features: [
          "Email strategy development",
          "List building and segmentation",
          "Email template design",
          "Automated email sequences",
          "A/B testing and optimization",
          "Performance tracking and analytics"
        ],
        process: [
          {
            title: "Strategy Development",
            description: "We create an email marketing strategy aligned with your business goals."
          },
          {
            title: "List Management",
            description: "We help you build, segment, and maintain a high-quality email list."
          },
          {
            title: "Campaign Creation",
            description: "We design and develop engaging email campaigns that drive action."
          },
          {
            title: "Automation Setup",
            description: "We set up automated email sequences for lead nurturing and customer engagement."
          },
          {
            title: "Testing & Optimization",
            description: "We continuously test and optimize your emails to improve performance."
          }
        ],
        benefits: [
          "Maintain direct communication with your audience",
          "Generate leads and nurture prospects through the sales funnel",
          "Increase customer retention and lifetime value",
          "Drive website traffic and conversions",
          "Achieve high ROI compared to other marketing channels"
        ],
        faq: [
          {
            question: "How often should we send emails to our list?",
            answer: "Email frequency depends on your audience, industry, and content quality. We'll help you find the right balance to maintain engagement without overwhelming subscribers."
          },
          {
            question: "How do you measure email marketing success?",
            answer: "We track key metrics including open rates, click-through rates, conversion rates, list growth, and ROI to measure the success of your email campaigns."
          },
          {
            question: "Can you help with email compliance (GDPR, CAN-SPAM)?",
            answer: "Yes, we ensure all email campaigns comply with relevant regulations and follow best practices for permission-based marketing."
          }
        ],
        image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "ppc-advertising",
        name: "Pay-Per-Click Advertising",
        icon: <DollarSign size={20} />,
        description: "Drive targeted traffic and conversions with strategic paid advertising campaigns.",
        features: [
          "PPC strategy development",
          "Campaign setup and management",
          "Keyword research and selection",
          "Ad copywriting and design",
          "Landing page optimization",
          "Bid management and budget optimization",
          "Performance tracking and reporting"
        ],
        process: [
          {
            title: "Account & Market Analysis",
            description: "We analyze your existing accounts and market to identify opportunities."
          },
          {
            title: "Strategy Development",
            description: "We create a comprehensive PPC strategy aligned with your business goals."
          },
          {
            title: "Campaign Setup",
            description: "We set up optimized campaigns with targeted keywords, compelling ads, and relevant landing pages."
          },
          {
            title: "Ongoing Management",
            description: "We actively manage your campaigns, adjusting bids, keywords, and ad copy to maximize performance."
          },
          {
            title: "Testing & Optimization",
            description: "We continuously test different elements and optimize campaigns to improve ROI."
          }
        ],
        benefits: [
          "Generate immediate traffic and leads",
          "Target specific audience segments with precision",
          "Control your budget and adjust spending as needed",
          "Gain valuable market and keyword insights",
          "Achieve measurable ROI with detailed performance tracking"
        ],
        faq: [
          {
            question: "Which PPC platforms do you work with?",
            answer: "We manage campaigns across Google Ads, Microsoft Ads, Facebook Ads, Instagram, LinkedIn, Twitter, and other platforms relevant to your business."
          },
          {
            question: "How much should I budget for PPC advertising?",
            answer: "Budget requirements vary based on your industry, competition, and goals. We'll help you determine an appropriate budget to achieve your objectives."
          },
          {
            question: "How do you measure PPC success?",
            answer: "We track key metrics including click-through rates, conversion rates, cost per click, cost per acquisition, and return on ad spend to measure campaign success."
          }
        ],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ],
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    delay: 200,
  },
  {
    id: "data-science",
    title: "Data Science",
    icon: <BarChart3 size={32} className="text-brand-green" />,
    description: "Transform your data into actionable insights and intelligent solutions.",
    services: [
      {
        id: "data-analysis-visualization",
        name: "Data Analysis & Visualization",
        icon: <BarChart size={20} />,
        description: "Extract meaningful insights from your data with advanced analysis and visualization techniques.",
        features: [
          "Comprehensive data analysis",
          "Interactive dashboards and reports",
          "Custom data visualization",
          "Trend identification and forecasting",
          "Data cleaning and preparation"
        ],
        process: [
          {
            title: "Data Assessment",
            description: "We evaluate your data sources, quality, and structure to determine the best approach."
          },
          {
            title: "Analysis Planning",
            description: "We develop a tailored analysis plan based on your business questions and goals."
          },
          {
            title: "Data Processing",
            description: "We clean, transform, and prepare your data for analysis."
          },
          {
            title: "Analysis & Visualization",
            description: "We apply statistical methods and create visualizations to uncover insights."
          },
          {
            title: "Insight Delivery",
            description: "We present findings in clear, actionable reports and dashboards."
          }
        ],
        benefits: [
          "Make data-driven decisions with confidence",
          "Identify trends and patterns that drive business growth",
          "Communicate complex data effectively through visualization",
          "Monitor key performance indicators in real-time",
          "Uncover hidden opportunities and challenges in your data"
        ],
        faq: [
          {
            question: "What types of data can you analyze?",
            answer: "We work with various data types including structured data (databases, spreadsheets), unstructured data (text, images), and semi-structured data (JSON, XML)."
          },
          {
            question: "How do you present analysis results?",
            answer: "We deliver insights through interactive dashboards, comprehensive reports, data visualizations, and presentations tailored to your audience."
          },
          {
            question: "Can you integrate with our existing data systems?",
            answer: "Yes, we can connect to your existing databases, data warehouses, and business intelligence tools to create a seamless data analysis workflow."
          }
        ],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "predictive-analytics",
        name: "Predictive Analytics",
        icon: <LineChart size={20} />,
        description: "Forecast future trends and behaviors to make proactive business decisions.",
        features: [
          "Statistical modeling and forecasting",
          "Machine learning algorithms",
          "Trend analysis and prediction",
          "Risk assessment and management",
          "Scenario planning and simulation"
        ],
        process: [
          {
            title: "Business Understanding",
            description: "We identify the key business questions and goals for prediction."
          },
          {
            title: "Data Collection & Preparation",
            description: "We gather and prepare relevant historical data for modeling."
          },
          {
            title: "Model Development",
            description: "We build and train predictive models using statistical and machine learning techniques."
          },
          {
            title: "Model Validation",
            description: "We test and validate models to ensure accuracy and reliability."
          },
          {
            title: "Implementation & Monitoring",
            description: "We deploy models and establish ongoing monitoring and refinement processes."
          }
        ],
        benefits: [
          "Anticipate customer behavior and market trends",
          "Optimize inventory and resource allocation",
          "Reduce risks through early identification of potential issues",
          "Improve strategic planning with data-backed forecasts",
          "Gain competitive advantage through proactive decision-making"
        ],
        faq: [
          {
            question: "How accurate are predictive models?",
            answer: "Model accuracy varies based on data quality, historical patterns, and the complexity of what's being predicted. We rigorously validate all models and provide accuracy metrics."
          },
          {
            question: "What business areas can benefit from predictive analytics?",
            answer: "Predictive analytics can benefit many areas including sales forecasting, customer behavior prediction, inventory management, risk assessment, and maintenance scheduling."
          },
          {
            question: "How much historical data is needed for accurate predictions?",
            answer: "The amount of data needed depends on the complexity of the prediction task. Generally, we recommend at least 1-2 years of historical data, but can work with less in some cases."
          }
        ],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "big-data-solutions",
        name: "Big Data Solutions",
        icon: <Database size={20} />,
        description: "Harness the power of large, complex datasets to drive innovation and growth.",
        features: [
          "Big data architecture design",
          "Data pipeline development",
          "Distributed computing solutions",
          "Real-time data processing",
          "Data lake and warehouse implementation"
        ],
        process: [
          {
            title: "Requirements Analysis",
            description: "We assess your data volume, variety, and velocity to determine appropriate solutions."
          },
          {
            title: "Architecture Design",
            description: "We design a scalable big data architecture tailored to your needs."
          },
          {
            title: "Infrastructure Setup",
            description: "We implement the necessary infrastructure and tools for big data processing."
          },
          {
            title: "Pipeline Development",
            description: "We build data pipelines for efficient data collection, processing, and storage."
          },
          {
            title: "Integration & Optimization",
            description: "We integrate with existing systems and optimize for performance and cost."
          }
        ],
        benefits: [
          "Process and analyze massive datasets efficiently",
          "Gain insights from diverse data sources",
          "Enable real-time data processing and decision-making",
          "Scale your data infrastructure as your business grows",
          "Unify data across your organization for comprehensive analysis"
        ],
        faq: [
          {
            question: "What big data technologies do you work with?",
            answer: "We work with a range of technologies including Hadoop, Spark, Kafka, Elasticsearch, MongoDB, and cloud-based solutions like AWS EMR, Google BigQuery, and Azure Synapse."
          },
          {
            question: "How do you handle data security in big data environments?",
            answer: "We implement comprehensive security measures including encryption, access controls, data masking, and compliance with relevant regulations like GDPR and CCPA."
          },
          {
            question: "Can you help with migrating from traditional databases to big data solutions?",
            answer: "Yes, we provide end-to-end migration services, including assessment, planning, data transfer, validation, and training to ensure a smooth transition."
          }
        ],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    delay: 300,
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    icon: <Pencil size={32} className="text-brand-yellow" />,
    description: "Captivating visual designs that communicate your brand's message effectively.",
    services: [
      {
        id: "brand-identity-design",
        name: "Brand Identity Design",
        icon: <Pencil size={20} />,
        description: "Create a cohesive visual identity that reflects your brand's values and resonates with your audience.",
        features: [
          "Logo design and variations",
          "Color palette development",
          "Typography selection",
          "Brand guidelines documentation",
          "Visual elements and iconography"
        ],
        process: [
          {
            title: "Brand Discovery",
            description: "We explore your brand values, target audience, and competitive landscape."
          },
          {
            title: "Concept Development",
            description: "We create initial design concepts based on our research and your input."
          },
          {
            title: "Design Refinement",
            description: "We refine the selected concept based on your feedback."
          },
          {
            title: "Asset Creation",
            description: "We develop all necessary brand assets in various formats."
          },
          {
            title: "Guidelines Documentation",
            description: "We create comprehensive brand guidelines for consistent application."
          }
        ],
        benefits: [
          "Build brand recognition and recall",
          "Establish credibility and professionalism",
          "Create emotional connections with your audience",
          "Ensure consistent brand representation across all touchpoints",
          "Differentiate from competitors with a unique visual identity"
        ],
        faq: [
          {
            question: "How long does the brand identity design process take?",
            answer: "A comprehensive brand identity typically takes 4-8 weeks, depending on the project scope and revision cycles."
          },
          {
            question: "What deliverables are included in brand identity design?",
            answer: "Deliverables typically include logo files in various formats, color palette specifications, typography guidelines, brand usage examples, and a comprehensive brand style guide."
          },
          {
            question: "Can you refresh our existing brand rather than creating a new one?",
            answer: "Yes, we offer brand refresh services that maintain your brand's equity while updating its visual appearance to be more contemporary and effective."
          }
        ],
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "marketing-materials",
        name: "Marketing Materials Design",
        icon: <FileCode size={20} />,
        description: "Eye-catching marketing collateral that drives engagement and conversions.",
        features: [
          "Brochure and flyer design",
          "Business card and stationery design",
          "Poster and banner design",
          "Presentation template design",
          "Social media graphics and templates"
        ],
        process: [
          {
            title: "Project Briefing",
            description: "We gather requirements and understand the marketing objectives."
          },
          {
            title: "Content Organization",
            description: "We structure the content for maximum impact and readability."
          },
          {
            title: "Design Creation",
            description: "We develop visually appealing designs that align with your brand."
          },
          {
            title: "Revision & Refinement",
            description: "We refine the designs based on your feedback."
          },
          {
            title: "Finalization & Delivery",
            description: "We prepare final files in appropriate formats for printing or digital use."
          }
        ],
        benefits: [
          "Communicate your message effectively through visual storytelling",
          "Maintain brand consistency across all marketing materials",
          "Increase engagement with professional, eye-catching designs",
          "Enhance perceived value of your products or services",
          "Stand out in competitive marketing environments"
        ],
        faq: [
          {
            question: "What file formats will I receive for my marketing materials?",
            answer: "We provide print-ready PDFs, editable source files (AI, PSD), and web-optimized versions (JPG, PNG) as appropriate for each item."
          },
          {
            question: "Can you handle printing of the materials you design?",
            answer: "While we don't offer printing services directly, we can recommend trusted printing partners and prepare all files to their exact specifications."
          },
          {
            question: "How do you ensure designs will work across different platforms?",
            answer: "We create designs with adaptability in mind, ensuring they work well across print, digital, and social media platforms, with appropriate sizing and formatting for each."
          }
        ],
        image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    delay: 400,
  },
  {
    id: "crm",
    title: "CRM Solutions",
    icon: <Database size={32} className="text-brand-red" />,
    description: "Streamline customer relationships and boost sales with tailored CRM implementations.",
    services: [
      {
        id: "crm-strategy-development",
        name: "CRM Strategy Development",
        icon: <BarChart3 size={20} />,
        description: "Develop a comprehensive CRM strategy aligned with your business goals and customer journey.",
        features: [
          "Customer journey mapping",
          "CRM needs assessment",
          "Platform selection guidance",
          "Implementation roadmap",
          "ROI projection and measurement"
        ],
        process: [
          {
            title: "Business Analysis",
            description: "We analyze your current customer management processes and business objectives."
          },
          {
            title: "Customer Journey Mapping",
            description: "We map your customer touchpoints and identify opportunities for improvement."
          },
          {
            title: "Strategy Development",
            description: "We create a tailored CRM strategy that addresses your specific needs."
          },
          {
            title: "Platform Recommendation",
            description: "We recommend the most suitable CRM platform based on your requirements."
          },
          {
            title: "Implementation Planning",
            description: "We develop a detailed roadmap for successful CRM implementation."
          }
        ],
        benefits: [
          "Align CRM initiatives with business objectives",
          "Improve customer experience across all touchpoints",
          "Increase adoption and ROI of CRM investments",
          "Create a scalable foundation for customer relationship management",
          "Avoid costly mistakes in CRM selection and implementation"
        ],
        faq: [
          {
            question: "How do you determine which CRM platform is right for our business?",
            answer: "We evaluate your specific needs, budget, team size, industry requirements, and growth plans to recommend the most suitable CRM platform from options like Salesforce, HubSpot, Microsoft Dynamics, and others."
          },
          {
            question: "How long does it take to develop a CRM strategy?",
            answer: "A comprehensive CRM strategy typically takes 3-6 weeks to develop, depending on the complexity of your business and customer journey."
          },
          {
            question: "Can you help with our existing CRM that isn't delivering results?",
            answer: "Yes, we offer CRM optimization services to evaluate your current implementation, identify issues, and develop a plan to improve adoption and effectiveness."
          }
        ],
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "crm-implementation",
        name: "CRM Implementation & Integration",
        icon: <Database size={20} />,
        description: "Expert implementation and integration of CRM systems tailored to your business processes.",
        features: [
          "CRM setup and configuration",
          "Data migration and cleaning",
          "Integration with existing systems",
          "Workflow automation",
          "Custom reporting and dashboards",
          "User training and adoption support"
        ],
        process: [
          {
            title: "Requirements Gathering",
            description: "We document detailed requirements for your CRM implementation."
          },
          {
            title: "System Configuration",
            description: "We configure the CRM platform to match your business processes."
          },
          {
            title: "Data Migration",
            description: "We clean, transform, and migrate your existing customer data."
          },
          {
            title: "Integration Development",
            description: "We connect your CRM with other business systems for seamless data flow."
          },
          {
            title: "Testing & Training",
            description: "We thoroughly test the system and train your team for successful adoption."
          }
        ],
        benefits: [
          "Centralize customer data for a 360-degree view",
          "Automate repetitive tasks to increase efficiency",
          "Improve collaboration between sales, marketing, and service teams",
          "Enhance data accuracy and reporting capabilities",
          "Increase user adoption through tailored implementation"
        ],
        faq: [
          {
            question: "How do you ensure a smooth transition to the new CRM system?",
            answer: "We follow a phased implementation approach, provide comprehensive training, create detailed documentation, and offer post-implementation support to ensure a smooth transition."
          },
          {
            question: "Can you integrate our CRM with our existing business systems?",
            answer: "Yes, we specialize in integrating CRM platforms with ERP systems, marketing automation tools, e-commerce platforms, accounting software, and custom applications."
          },
          {
            question: "How do you handle data migration from our old system?",
            answer: "We follow a structured process that includes data assessment, cleaning, mapping, migration, validation, and verification to ensure accurate and complete data transfer."
          }
        ],
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    delay: 500,
  }
];

// Helper function to get all services as a flat array
export const getAllServices = () => {
  const allServices = [];

  serviceCategories.forEach(category => {
    category.services.forEach(service => {
      allServices.push({
        ...service,
        categoryId: category.id,
        categoryTitle: category.title,
        path: `/services/${category.id}/${service.id}`
      });
    });
  });

  return allServices;
};

// Helper function to get a specific service by ID
export const getServiceById = (categoryId, serviceId) => {
  const category = serviceCategories.find(cat => cat.id === categoryId);
  if (!category) return null;

  const service = category.services.find(svc => svc.id === serviceId);
  if (!service) return null;

  return {
    ...service,
    categoryId: category.id,
    categoryTitle: category.title,
    path: `/services/${category.id}/${service.id}`
  };
};

// Helper function to get related services (other services in the same category)
export const getRelatedServices = (categoryId, currentServiceId) => {
  const category = serviceCategories.find(cat => cat.id === categoryId);
  if (!category) return [];

  return category.services
    .filter(service => service.id !== currentServiceId)
    .map(service => ({
      id: service.id,
      title: service.name,
      path: `/services/${categoryId}/${service.id}`
    }));
};
