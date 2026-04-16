import { createClient } from '@supabase/supabase-js'
// instanciation du client Supabase pour se connecte a la bdd supabase avec des variables d'environnement
// ce fichier est importe un peu partout  dans les fichier frontend(authService, shopService, etc)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// VÉRIFICATION DÉTAILLÉE des variables
console.log('🔧 Configuration Supabase:');
console.log('URL:', supabaseUrl ? '✅ Défini' : '❌ Manquant');
console.log('Key:', supabaseAnonKey ? `✅ Défini (${supabaseAnonKey.substring(0, 10)}...)` : '❌ Manquant');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`
    ❌ Variables Supabase manquantes!
    VITE_SUPABASE_URL: ${supabaseUrl || 'MANQUANT'}
    VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? 'DÉFINI' : 'MANQUANT'}
    
    Vérifiez votre fichier .env:
    VITE_SUPABASE_URL=https://votre-project.supabase.co
    VITE_SUPABASE_ANON_KEY=votre_anon_key_ici
  `);
}

// Configuration améliorée
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce', // Important pour la sécurité
    storage: localStorage,
    storageKey: 'supabase.auth.token'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});