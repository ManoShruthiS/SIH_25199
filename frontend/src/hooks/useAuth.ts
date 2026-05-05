import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * useAuth
 * 
 * Custom hook to access the AuthContext. This hook allows any component
 * within the AuthProvider tree to access user state, login, logout, 
 * and registration functionality.
 * 
 * @returns {AuthContextType} The current authentication context value.
 * @throws {Error} If the hook is consumed outside of an AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider. Check the component tree in App.tsx.');
  }

  return context;
};

export default useAuth;