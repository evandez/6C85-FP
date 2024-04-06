import React from 'react';
import { useLocation } from 'react-router';

const LandingPage = () => {
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  console.log(params.get("foo"));
  return (<div> The landing page! </div>);
};

export default LandingPage;
