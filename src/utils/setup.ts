interface SetupData {
  botAdded: boolean;
  timestamp: number;
}

export const getSetupStatus = (courseId: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const setupData = localStorage.getItem(`uiuc-chat-setup-${courseId}`);
    if (!setupData) return false;
    
    const parsed: SetupData = JSON.parse(setupData);
    return parsed.botAdded === true;
  } catch (error) {
    console.error('Error reading setup status:', error);
    return false;
  }
};

export const setSetupComplete = (courseId: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const setupData: SetupData = {
      botAdded: true,
      timestamp: Date.now()
    };
    localStorage.setItem(`uiuc-chat-setup-${courseId}`, JSON.stringify(setupData));
  } catch (error) {
    console.error('Error saving setup status:', error);
  }
};

export const clearSetupStatus = (courseId: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(`uiuc-chat-setup-${courseId}`);
  } catch (error) {
    console.error('Error clearing setup status:', error);
  }
};