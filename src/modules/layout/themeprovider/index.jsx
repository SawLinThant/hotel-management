import React, { useEffect, useState } from 'react';
import { useAccount } from '../../../lib/context/account-context';

const ThemeProvider = ({children}) => {
   const {userType} = useAccount();
   const setThemeColors = (theme) => {
    const root = document.documentElement;
    const themes = {
        admin: {
          '--color-primary': '#3a4c54', // Tomato
          '--color-primary-bold': '#201c1c', // OrangeRed
        },
        GR: {
          '--color-primary': '#0b3083', // SteelBlue
          '--color-primary-bold': '#061d51', // RoyalBlue
        },
        Axra: {
          '--color-primary': '#665e29', // LimeGreen
          '--color-primary-bold': '#228B22', // ForestGreen
        },
      };
      const selectedTheme = themes[theme] || themes['admin'];
      Object.keys(selectedTheme).forEach((cssVar) => {
        root.style.setProperty(cssVar, selectedTheme[cssVar]);
      });
   }
   useEffect(() => {
    setThemeColors(userType);
  }, [userType]);

  return<>{children}</>
}

export default ThemeProvider;