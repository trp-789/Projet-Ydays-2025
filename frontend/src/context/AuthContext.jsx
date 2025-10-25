// le contexte permet de partager des donne entrs plusieurs composants sans avoir a passer les props a chque composants

import { createContext, useContext } from 'react';

export const AuthContext = createContext();  // creer un context qui est une sorte de 'boite magique ' qui peut contenir des donnes 

export function useAuth() {// fonction pour appeler le context et obtenir les donnes
  return useContext(AuthContext); // le hook  useContext renvoie  la valeur actuelle de AuthContext
}

// au lieu de taper use(context useContext(AuthContext), on fait juste useAuth()

