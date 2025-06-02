import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { securityMonitor, SecurityEvent, SecurityEventType } from '@/services/securityMonitor';
import { AlertTriangle, Shield, ShieldAlert, ShieldCheck, X } from 'lucide-react';

/**
 * Security Admin Panel Component
 * 
 * This component provides a simple admin interface to view security events.
 * In a production environment, this would be protected behind authentication.
 */
const SecurityAdmin = () => {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState<SecurityEventType | 'all'>('all');
  
  // Load events on mount and periodically refresh
  useEffect(() => {
    const loadEvents = () => {
      const allEvents = securityMonitor.getEvents();
      setEvents(allEvents);
    };
    
    // Initial load
    loadEvents();
    
    // Set up periodic refresh
    const intervalId = setInterval(loadEvents, 5000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  // Filter events based on selected filter
  const filteredEvents = filter === 'all'
    ? events
    : events.filter(event => event.type === filter);
  
  // Get severity color
  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 dark:text-red-400';
      case 'high':
        return 'text-orange-600 dark:text-orange-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };
  
  // Get event icon
  const getEventIcon = (type: SecurityEventType) => {
    switch (type) {
      case SecurityEventType.XSS_ATTEMPT:
      case SecurityEventType.CSRF_ATTEMPT:
      case SecurityEventType.INJECTION_ATTEMPT:
        return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case SecurityEventType.SUSPICIOUS_BEHAVIOR:
      case SecurityEventType.RATE_LIMIT_EXCEEDED:
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case SecurityEventType.AUTHENTICATION_FAILURE:
      case SecurityEventType.UNAUTHORIZED_ACCESS:
      case SecurityEventType.BOT_DETECTED:
        return <Shield className="w-5 h-5 text-orange-500" />;
      case SecurityEventType.SECURITY_HEADER_MISSING:
        return <ShieldAlert className="w-5 h-5 text-purple-500" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-blue-500" />;
    }
  };
  
  // Format timestamp
  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString();
  };
  
  // Clear all events
  const handleClearEvents = () => {
    securityMonitor.clearEvents();
    setEvents([]);
  };
  
  // Only show in development mode
  if (process.env.NODE_ENV !== 'development' && !isVisible) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isVisible ? (
        <Button
          onClick={() => setIsVisible(true)}
          className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-3"
        >
          <Shield className="w-5 h-5" />
        </Button>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-[600px] max-w-full max-h-[80vh] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
            <h3 className="font-semibold flex items-center">
              <Shield className="w-5 h-5 mr-2 text-brand-purple" />
              Security Monitor
            </h3>
            <div className="flex items-center space-x-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as SecurityEventType | 'all')}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800"
              >
                <option value="all">All Events</option>
                {Object.values(SecurityEventType).map((type) => (
                  <option key={type} value={type}>
                    {type.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearEvents}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Clear
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="overflow-y-auto flex-grow">
            {filteredEvents.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No security events recorded
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredEvents.map((event, index) => (
                  <li key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">
                            {event.type.replace(/_/g, ' ')}
                          </h4>
                          <span className={`text-xs ${getSeverityColor(event.severity)}`}>
                            {event.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {formatTimestamp(event.timestamp)}
                        </p>
                        <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                          <pre className="whitespace-pre-wrap font-mono text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded">
                            {JSON.stringify(event.details, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs text-gray-500 dark:text-gray-400">
            {events.length} security events recorded
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityAdmin;
