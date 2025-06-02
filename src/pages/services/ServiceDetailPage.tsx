import { useParams, Navigate } from "react-router-dom";
import ServiceDetail from "@/components/ServiceDetail";
import { getServiceById, getRelatedServices } from "@/data/servicesData";
import { useEffect } from "react";

const ServiceDetailPage = () => {
  const { categoryId, serviceId } = useParams<{ categoryId: string; serviceId: string }>();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId, serviceId]);

  // If categoryId or serviceId is undefined, redirect to services page
  if (!categoryId || !serviceId) {
    return <Navigate to="/services" />;
  }

  // Get service details
  const service = getServiceById(categoryId, serviceId);
  
  // If service not found, redirect to services page
  if (!service) {
    return <Navigate to="/services" />;
  }

  // Get related services
  const relatedServices = getRelatedServices(categoryId, serviceId);

  return (
    <ServiceDetail
      id={service.id}
      title={service.name}
      description={service.description}
      icon={service.icon}
      image={service.image}
      features={service.features}
      process={service.process}
      benefits={service.benefits}
      faq={service.faq || []}
      relatedServices={relatedServices}
      categoryId={service.categoryId}
      categoryTitle={service.categoryTitle}
    />
  );
};

export default ServiceDetailPage;
