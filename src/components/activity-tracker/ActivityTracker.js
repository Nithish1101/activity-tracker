import React, { useState, useEffect } from "react";
import MemebersList from "../members-list/MemebersList";
import { Loading, Error } from "../network_state/Message";

const API_URL = "https://5f49dae08e271c001650ccdc.mockapi.io/activities";

function ActivityTracker() {
  const [hasDataLoaded, updateHasDataLoaded] = useState(false);
  const [errorLoadingData, showError] = useState(false);
  const [activityData, setActivityData] = useState([]);

  function fetchActivityData() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((jsonData) => {
        setActivityData(jsonData);
        updateHasDataLoaded(true);
      })
      .catch((err) => showError(true));
  }

  useEffect(() => fetchActivityData(), []);

  return (
    <section>
      {errorLoadingData ? (
        <Error message="Something went wrong!" />
      ) : hasDataLoaded ? (
        <MemebersList members={activityData.members ?? []} />
      ) : (
        <Loading />
      )}
    </section>
  );
}

export default ActivityTracker;
