"use client";

import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// URL for India States TopoJSON (Standard and reliable source)
const INDIA_STATES_JSON = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json";

const IndiaStateMap = () => {
  const [hoveredState, setHoveredState] = useState(null);

  // You can use this to fetch data from your WordPress backend later
  const handleStateClick = (stateName) => {
    console.log(`Filtering data for: ${stateName}`);
    alert(`You selected ${stateName}. In your project, you can now show expenses for this state!`);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Interactive India Map</h2>
        <div className="mt-2 h-6 text-blue-600 font-semibold text-lg">
          {hoveredState ? hoveredState : "Select a state to view details"}
        </div>
      </div>

      <div className="w-full bg-slate-50 rounded-xl overflow-hidden border border-gray-200">
        <ComposableMap
          projection="geoMercator"
          // Centered and scaled specifically for India State Map
          projectionConfig={{
            scale: 1000,
            center: [78.9629, 22.5937], 
          }}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={INDIA_STATES_JSON}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.NAME_1;
                const isGujarat = stateName === "Gujarat"; // Highlight your home state

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => setHoveredState(stateName)}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() => handleStateClick(stateName)}
                    style={{
                      default: {
                        fill: isGujarat ? "#3b82f6" : "#e2e8f0", // Blue for Gujarat, Gray for others
                        stroke: "#FFFFFF",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      hover: {
                        fill: "#60a5fa",
                        stroke: "#FFFFFF",
                        strokeWidth: 1,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "#1d4ed8",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 w-full text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Gujarat (Active Region)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <span>Other States</span>
        </div>
      </div>
    </div>
  );
};

export default IndiaStateMap;