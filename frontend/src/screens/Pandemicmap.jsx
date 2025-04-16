// import React, { useEffect, useRef } from 'react';
// import * as atlas from 'azure-maps-control';
// import 'azure-maps-control/dist/atlas.min.css';

// function Pandemicmap() {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const map = new atlas.Map(mapRef.current, {
//       center: [79.8667, 6.85], // Center between Wellawatte and Mount Lavinia
//       zoom: 12,
//       view: 'Auto',
//       authOptions: {
//         authType: 'subscriptionKey',
//         subscriptionKey: '3fH6bG3YlPTNTW4LZEjRakbLt91IQkrFJuAyKfGQSts0wVFCN4sOJQQJ99BDACYeBjFy7RyrAAAgAZMP29Q7', // Replace with your actual key
//       },
//     });

//     map.events.add('ready', () => {
//       // Sample data points in Wellawatte and Mount Lavinia
//       const points = [
//         new atlas.data.Feature(new atlas.data.Point([79.8577, 6.8618])), // Wellawatte
//         new atlas.data.Feature(new atlas.data.Point([79.8600, 6.8600])), // Near Wellawatte
//         new atlas.data.Feature(new atlas.data.Point([79.8650, 6.8500])), // In-between
//         new atlas.data.Feature(new atlas.data.Point([79.8654, 6.8403])), // Mount Lavinia
//         new atlas.data.Feature(new atlas.data.Point([79.8636, 6.8390])), // Mount Lavinia
//       ];

//       const dataSource = new atlas.source.DataSource();
//       map.sources.add(dataSource);
//       dataSource.add(points);

//       // Create heatmap layer
//       const heatmapLayer = new atlas.layer.HeatMapLayer(dataSource, 'heatLayer', {
//         radius: 30,
//         opacity: 0.7,
//         colorGradient: [
//           'rgba(0, 255, 255, 0)',
//           'rgba(0, 255, 255, 1)',
//           'rgba(0, 191, 255, 1)',
//           'rgba(0, 127, 255, 1)',
//           'rgba(0, 63, 255, 1)',
//           'rgba(0, 0, 255, 1)',
//           'rgba(255, 0, 0, 1)'
//         ]
//       });

//       map.layers.add(heatmapLayer);
//     });
//   }, []);

//   return (
//     <div style={{ height: '600px', width: '100%' }}>
//       <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Pandemic Heatmap</h2>
//       <div ref={mapRef} style={{ height: '500px' }} />
//     </div>
//   );
// }

// export default Pandemicmap;

// export default Pandemicmap;
// import React, { useEffect, useRef, useState } from "react";
// import * as atlas from "azure-maps-control";
// import "azure-maps-control/dist/atlas.min.css";
// import axios from "axios";

// function PandemicMap() {
//   const mapRef = useRef(null);
//   const mapInstanceRef = useRef(null);
//   const dataSourceRef = useRef(null); //new

//   const [geoJsonData, setGeoJsonData] = useState(null); //new

//   useEffect(() => {
//     // Initialize the map
//     const map = new atlas.Map(mapRef.current, {
//       center: [79.8667, 6.85],
//       zoom: 12,
//       view: "Auto",
//       authOptions: {
//         authType: "subscriptionKey",
//         subscriptionKey:
//           "3fH6bG3YlPTNTW4LZEjRakbLt91IQkrFJuAyKfGQSts0wVFCN4sOJQQJ99BDACYeBjFy7RyrAAAgAZMP29Q7", // <-- replace with your key
//       },
//     });
//     map.events.add("ready", async () => {
//       try {
//         const response = await axios.get("/api/appointments/heatmap");
//         const geoJson = response.data;

//         console.log("Received GeoJSON:", geoJson);

//         // Ensure all features have a 'weight' property
//         geoJson.features = geoJson.features.map((feature) => ({
//           ...feature,
//           properties: {
//             ...feature.properties,
//             weight: feature?.properties?.weight ?? 1, // default to 1 if missing
//           },
//         }));

//         const dataSource = new atlas.source.DataSource();
//         map.sources.add(dataSource);
//         dataSource.add(geoJson);

//         // Save the data source ref if needed later
//         dataSourceRef.current = dataSource;

//         const heatmapLayer = new atlas.layer.HeatMapLayer(
//           dataSource,
//           "heatLayer",
//           {
//             radius: 30,
//             opacity: 0.8,
//             weight: ["get", "weight"], // IMPORTANT
//             color: [
//               "interpolate",
//               ["linear"],
//               ["heatmap-density"],
//               0,
//               "rgba(33,102,172,0)",
//               0.2,
//               "rgb(103,169,207)",
//               0.4,
//               "rgb(209,229,240)",
//               0.6,
//               "rgb(253,219,199)",
//               0.8,
//               "rgb(239,138,98)",
//               1,
//               "rgb(178,24,43)",
//             ],
//           }
//         );

//         map.layers.add(heatmapLayer, "labels"); // Add before labels for better visibility
//       } catch (error) {
//         console.error("Error fetching heatmap data:", error);
//       }
//     });
//   }, []);

//   // Fetch GeoJSON from backend
//   const fetchGeoJson = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/appointments/heatmap"
//       );
//       console.log("Received GeoJSON:", response.data);
//       setGeoJsonData(response.data);

//       if (dataSourceRef.current) {
//         dataSourceRef.current.clear();
//         dataSourceRef.current.add(response.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch GeoJSON:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={fetchGeoJson} style={{ marginBottom: "10px" }}>
//         Sync Heatmap
//       </button>
//       <div ref={mapRef} style={{ height: "600px", width: "100%" }} />
//     </div>
//   );
// }

// export default PandemicMap;

import React, { useEffect, useRef, useState } from "react";
import * as atlas from "azure-maps-control";
import "azure-maps-control/dist/atlas.min.css";
import axios from "axios";

function PandemicMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const dataSourceRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const map = new atlas.Map(mapRef.current, {
      center: [79.8667, 6.85],
      zoom: 12,
      view: "Auto",
      authOptions: {
        authType: "subscriptionKey",
        subscriptionKey:
          "3fH6bG3YlPTNTW4LZEjRakbLt91IQkrFJuAyKfGQSts0wVFCN4sOJQQJ99BDACYeBjFy7RyrAAAgAZMP29Q7",
      },
    });

    map.events.add("ready", () => {
      mapInstanceRef.current = map;

      const dataSource = new atlas.source.DataSource();
      dataSourceRef.current = dataSource;
      map.sources.add(dataSource);

      const heatmapLayer = new atlas.layer.HeatMapLayer(dataSource, "heatLayer", {
        radius: 30,
        opacity: 0.8,
        weight: ['get', 'weight'],
        color: [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(0, 0, 255, 0)',
          0.2, 'blue',
          0.4, 'lime',
          0.6, 'yellow',
          0.8, 'orange',
          1, 'red'
        ]
      });

      map.layers.add(heatmapLayer, 'labels');
      setMapReady(true);

      // Load heatmap data initially
      loadHeatmapData();
    });
  }, []);

  const loadHeatmapData = async () => {
    if (!dataSourceRef.current) return;

    try {
      setLoading(true);
      const response = await axios.get("/api/appointments/heatmap");
      const geoJson = response.data;

      console.log("🔄 Received GeoJSON:", geoJson);

      geoJson.features = geoJson.features.map((feature) => ({
        ...feature,
        properties: {
          ...feature.properties,
          weight: feature?.properties?.weight ?? 1,
        },
      }));

      dataSourceRef.current.clear();
      dataSourceRef.current.add(geoJson);
    } catch (error) {
      console.error("Error fetching heatmap data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ height: "600px", width: "100%" }} ref={mapRef}></div>
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <button onClick={loadHeatmapData} disabled={!mapReady || loading}>
          {loading ? "Syncing..." : "🔄 Sync Heatmap"}
        </button>
      </div>
    </div>
  );
}

export default PandemicMap;
