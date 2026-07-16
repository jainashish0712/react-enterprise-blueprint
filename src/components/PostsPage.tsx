import { DataGrid } from "@mui/x-data-grid";
import { useGetThePostsDummyResQuery, type Post } from "../services/apiService";
import { useNavigate } from "react-router-dom";

export default function PostsPage() {
  const {
    data: theseAreThePosts,
    error,
    isLoading,
  } = useGetThePostsDummyResQuery();

  const navigate = useNavigate();

  console.log("13", theseAreThePosts, typeof theseAreThePosts);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button
        className="counter"
        onClick={() => navigate("/")}
        style={{ marginBottom: "20px" }}>
        Back to Home
      </button>
      {isLoading && <p>Loading posts...</p>}
      {error && (
        <p>
          Error loading posts (dummyres.com might not be available or CORS
          issues)
        </p>
      )}
      <div style={{ height: 200, width: "100%", marginTop: "20px" }}>
        <DataGrid
          columns={[
            { field: "id", headerName: "ID", width: 70 },
            { field: "title", headerName: "Title", width: 300 },
            { field: "body", headerName: "Body", width: 500 },
          ]}
          rows={
            theseAreThePosts?.posts
              ? theseAreThePosts.posts.map((post: Post, i: number) => ({
                  id: post.id ?? i,
                  ...post,
                }))
              : []
          }
        />
      </div>
    </div>
  );
}
