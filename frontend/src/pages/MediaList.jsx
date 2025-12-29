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

  /* ======================
     FETCH MEDIA (ONCE)
  ====================== */
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
      } catch (err) {
        setError("Failed to load media");
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  /* ======================
     APPLY FILTERS
  ====================== */
  useEffect(() => {
    let filtered = [...allMedia];

    // Search
    if (filters.search) {
      filtered = filtered.filter((m) =>
        m.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Status
    if (filters.status !== "all") {
      filtered = filtered.filter((m) => m.status === filters.status);
    }

    // Format
    if (filters.format !== "all") {
      filtered = filtered.filter((m) => m.format === filters.format);
    }

    // Platform
    if (filters.platform !== "all") {
      filtered = filtered.filter((m) => m.platform === filters.platform);
    }

    // Rating
    if (filters.rating !== "all") {
      filtered = filtered.filter(
        (m) => (m.myRating || 0) >= Number(filters.rating)
      );
    }

    setMedia(filtered);
  }, [filters, allMedia]);

  /* ======================
     DELETE HANDLER
  ====================== */
  const handleDelete = (id) => {
    setAllMedia((prev) => prev.filter((m) => m._id !== id));
    setMedia((prev) => prev.filter((m) => m._id !== id));
  };

  if (loading) return <p>Loading media...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>My WatchVault</h2>

      {/* ======================
          FILTER UI
      ====================== */}
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Search by title"
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
        />

        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="all">All Status</option>
          <option value="towatch">To Watch</option>
          <option value="watching">Watching</option>
          <option value="watched">Watched</option>
        </select>

        <select
          value={filters.format}
          onChange={(e) =>
            setFilters({ ...filters, format: e.target.value })
          }
        >
          <option value="all">All Formats</option>
          <option value="movie">Movie</option>
          <option value="tv">TV Show</option>
        </select>

        <select
          value={filters.platform}
          onChange={(e) =>
            setFilters({ ...filters, platform: e.target.value })
          }
        >
          <option value="all">All Platforms</option>
          <option value="netflix">Netflix</option>
          <option value="prime">Prime</option>
          <option value="hotstar">Hotstar</option>
        </select>

        <select
          value={filters.rating}
          onChange={(e) =>
            setFilters({ ...filters, rating: e.target.value })
          }
        >
          <option value="all">All Ratings</option>
          <option value="5">5 ⭐</option>
          <option value="4">4 ⭐+</option>
          <option value="3">3 ⭐+</option>
        </select>

        <button
          onClick={() => {
            setFilters({
              status: "all",
              format: "all",
              platform: "all",
              rating: "all",
              search: "",
            });
            setMedia(allMedia);
          }}
        >
          Reset
        </button>
      </div>

      {/* ======================
          MEDIA LIST
      ====================== */}
      {media.length === 0 ? (
        <p>No media found.</p>
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
