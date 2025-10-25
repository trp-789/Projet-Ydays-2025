import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { authService } from '../services/authService';
import { AuthContext,useAuth } from './AuthContext';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Erreur vérification utilisateur:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
  try {
    const { data, error } = await authService.signIn(email, password);
    if (error) throw error;

    // Met à jour l'état user avec l'utilisateur de la réponse
    setUser(data.user);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

  const value = {
    user,
    login,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth } from './AuthContext'; // ← Exporte useAuth depuis ce fichier
