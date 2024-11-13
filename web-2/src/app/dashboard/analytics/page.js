"use client";
import { useEffect, useState } from "react";
import { getAnalytics } from "../../utils/api";
import ProtectedRoute from "../../components/ProtectedRoute";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    const fetchAnalytics = async () => {
      const { data } = await getAnalytics("busCode123");
      setAnalytics(data.analytics);
    };
    fetchAnalytics();
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <h1>Performance Analytics</h1>
        <p>On-Time Percentage: {analytics.onTimePercentage}%</p>
        <p>Usage Count: {analytics.usageCount}</p>
      </div>
    </ProtectedRoute>
  );
};

export default Analytics;
