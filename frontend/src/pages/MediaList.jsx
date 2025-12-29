import { useEffect, useState } from "react";
import API from "../api/axios";

const MediaList = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await API.get("/media");

        let mediaArray = [];

        if (Array.isArray(res.data)) mediaArray = res.data;
        else if (Array.isArray(res.data.data)) mediaArray = res.data.data;
        else if (Array.isArray(res.data.media)) mediaArray = res.data.media;
        else if (Array.isArray(res.data.data?.media))
          mediaArray = res.data.data.media;
        else if (Array.isArray(res.data.data?.docs))
          mediaArray = res.data.data.docs;

        setMedia(mediaArray);
      } catch (err) {
        console.error(err);
        setError("Failed to load media");
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  if (loading) return <p>Loading media...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>My WatchVault</h2>

      {media.length === 0 ? (
        <p>No media added yet.</p>
      ) : (
        <ul>
          {media.map((item) => (
            <li key={item._id}>
              <strong>{item.title}</strong> ({item.format}) –{" "}
              <em>{item.status}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MediaList;
