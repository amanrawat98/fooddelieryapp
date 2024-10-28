import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useSession = () => {
  const [sessionId, setSessionId] = useState(() => {
    return localStorage.getItem('sessionid') || null;
  });

  const createSession = () => {
    if (!sessionId) {
      const newSessionId = uuidv4();
      setSessionId(newSessionId);
      localStorage.setItem('sessionid', newSessionId);
    }
  };

  const clearSession = () => {
    setSessionId(null);
    localStorage.removeItem('sessionid');
  };

  useEffect(() => {
    if (!sessionId) {
      createSession()
    }
  }, []);

  return {
    sessionId,
    createSession,
    clearSession,
  };
};
