"use client"; // To indicate client-side rendering

import { useEffect, useState } from "react";
import { getBusDetails } from "@/utils/api";
import ContactInfo from "@/components/ContactInfo";

const BusSelection = ({ busCode }) => {
  const [busDetails, setBusDetails] = useState(null);
  const [error, setError] = useState(""); // Error handling state

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        // Fetch bus details from API
        const { data } = await getBusDetails(busCode);
        setBusDetails(data);
      } catch (err) {
        setError("Failed to fetch bus details");
        console.error(err);
      }
    };

    if (busCode) {
      fetchBusDetails();
    }
  }, [busCode]); // Fetch new details whenever busCode changes

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {busDetails ? (
        <ContactInfo
          driver={busDetails.driver}
          coordinator={busDetails.coordinator}
        />
      ) : (
        <p>Loading bus details...</p>
      )}
    </div>
  );
};

export default BusSelection;
