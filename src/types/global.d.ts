// Global type declarations

interface Window {
  emailjs: {
    init: (publicKey: string) => void;
    send: (serviceId: string, templateId: string, templateParams: Record<string, any>) => Promise<any>;
  };
}
