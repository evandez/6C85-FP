import React from 'react';
import { useLocation } from 'react-router';

const LocationPage = () => {
  const loc = useLocation();
  console.log(loc);
  return (<div> The location page! </div>);
};

export default LocationPage;
