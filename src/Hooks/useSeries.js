import axios from "axios";
import { useEffect, useState } from "react";

function useSeries(slug) {
  const [series, setSeries] = useState([]);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const getSeries = async () => {
        try {
          const { data } = await axios.get(`/api/playlists/${slug}/videos`);
          setLessons(data.data)
          setSeries(data.playlist)
        } catch (e) {
          console.log(e);
        }
    };
    getSeries();
  }, [slug]);
  return {
    series, lessons
  }
}

export default useSeries;