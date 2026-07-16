import { useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetThePostsDummyResQuery, type Post } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useDispatch } from "react-redux";
import { setVisitedPostsPage } from "../features/counter/counterSlice";
import { useEffect } from "react";

export default function PostsPage() {
  const {
    data: theseAreThePosts,
    error,
    isLoading,
  } = useGetThePostsDummyResQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setVisitedPostsPage());
  }, [dispatch]);


  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredRows = useMemo(() => {
    if (!theseAreThePosts?.posts) return [];

    return theseAreThePosts.posts
      .filter((post) =>
        post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
      .map((post: Post, i: number) => ({
        ...post,
        id: post.id ?? i,
      }));
  }, [theseAreThePosts, debouncedSearchTerm]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button
        className="counter"
        onClick={() => navigate("/")}
        style={{ marginBottom: "20px" }}>
        Back to Home
      </button>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "10px", width: "300px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>Debounced search active</p>
      </div>

      {isLoading && <p>Loading posts...</p>}
      {error && (
        <p>
          Error loading posts (dummyres.com might not be available or CORS
          issues)
        </p>
      )}
      <div style={{ height: 600, width: "100%", marginTop: "20px" }}>
        <DataGrid
          columns={[
            { field: "id", headerName: "ID", width: 70 },
            { field: "title", headerName: "Title", width: 300 },
            { field: "body", headerName: "Body", width: 500 },
          ]}
          rows={filteredRows}
        />
      </div>
    </div>
  );
}
