import React, { useCallback, useMemo, useState } from "react";

export const FilterCampaings = () => {
  const [titleCampaing, setTitleCampaing] = useState<string | null>(null);

  const [typeBlood, setTypeBlood] = useState<any>(null);
  const [priorityStatus, setPriorityStatus] = useState<any>(null);
  const [institution, setInstitution] = useState<any>(null);
  const [distance, setDistance] = useState<any>(null);

  const [campaings, setCampaings] = useState<any>([]);

  const filters = useMemo(
    () => ({
      titleCampaing: titleCampaing,
      typeBlood: typeBlood,
      priorityStatus: priorityStatus,
      institution: institution,
      distance: distance,
    }),
    [titleCampaing, typeBlood, priorityStatus, institution, distance]
  );

  const handleChangeTitleCampaing = useCallback((event: any) => {
    setTitleCampaing(event.target.value);
  }, []);

  const onFilter = useCallback(async () => {
    // const response = await getRepository(filters);
    // setCampaings(response);
  }, [filters]);

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      onFilter();
    },
    [onFilter]
  );

  const handleClear = useCallback(() => {
    setTitleCampaing(null);
    setTypeBlood(null);
    setPriorityStatus(null);
    setInstitution(null);
    setDistance(null);
  }, []);

  return <h1> opa bb</h1>;
};
