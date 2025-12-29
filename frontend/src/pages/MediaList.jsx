import { useEffect, useState } from "react";
import API from "../api/axios";
import MediaCard from "../components/MediaCard";

const MediaList = () => {
  const [allMedia, setAllMedia] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    status: "all",
    format: "all",
    platform: "all",
    rating: "all",
    search: "",
  });

  /* Fetch once */
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

        setAllMedia(mediaArray);
        setMedia(mediaArray);
      } catch {
        setError("⚠️ Failed to load your media. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  /* Apply filters */
  useEffect(() => {
    let filtered = [...allMedia];

    if (filters.search) {
      filtered = filtered.filter((m) =>
        m.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.status !== "all") {
      filtered = filtered.filter((m) => m.status === filters.status);
    }

    if (filters.format !== "all") {
      filtered = filtered.filter((m) => m.format === filters.format);
    }

    if (filters.platform !== "all") {
      filtered = filtered.filter((m) => m.platform === filters.platform);
    }

    if (filters.rating !== "all") {
      filtered = filtered.filter(
        (m) => (m.myRating || 0) >= Number(filters.rating)
      );
    }

    setMedia(filtered);
  }, [filters, allMedia]);

  const handleDelete = (id) => {
    setAllMedia((prev) => prev.filter((m) => m._id !== id));
    setMedia((prev) => prev.filter((m) => m._id !== id));
  };

  /* UX states */
  if (loading)
    return <p style={{ fontStyle: "italic" }}>⏳ Loading your watchlist...</p>;

  if (error)
    return <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>;

  return (
    <div>
      <h2>My WatchVault</h2>

      {/* Filters (unchanged) */}
      {/* ... keep your Phase 9 filter UI here ... */}

      {/* Empty State */}
      {media.length === 0 ? (
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            color: "#777",
            border: "1px dashed #ccc",
            borderRadius: "8px",
          }}
        >
          🎬 No media found  
          <br />
          Try adjusting filters or add something new!
        </div>
      ) : (
        media.map((item) => (
          <MediaCard
            key={item._id}
            media={item}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default MediaList;
