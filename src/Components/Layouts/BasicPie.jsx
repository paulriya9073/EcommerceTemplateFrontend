import * as React from 'react';
import { useEffect, useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const BasicPie = ({ data }) => {
  const [size, setSize] = useState({
    width: 400,
    height: 200,
    fontSize: '6px', 
  });

  const handleResize = () => {
    if (window.innerWidth > 768) {
     
      setSize({
        width: 500,
        height: 300,
        fontSize: '10px', 
      });
    } else {
     
      setSize({
        width: 400,
        height: 200,
        fontSize: '6px', 
      });
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label} (${item.value})`,
          arcLabelMinAngle: 45,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
          fontSize: size.fontSize, // Apply dynamic font size
        },
      }}
      {...size} // Spread the dynamic width and height
    />
  );
};

export default BasicPie;
