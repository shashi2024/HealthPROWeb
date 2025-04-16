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
