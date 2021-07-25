import {useEffect, useState} from 'react';

export const useMediaQuery = (query) => {
  const mediaMatch = window.matchMedia("(max-width: 600px)");
  
  const [matches, setMatches] = useState(mediaMatch.matches);
  
  useEffect(() => {
   window.addEventListener('resize', ()=>setMatches(mediaMatch.matches));  
  },[]);
  return matches;
};
