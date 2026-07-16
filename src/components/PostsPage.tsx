import { DataGrid } from '@mui/x-data-grid';
import { useGetThePostsDummyResQuery, type Post } from "../services/apiService";
import { useNavigate } from 'react-router-dom';



export default function PostsPage() {
  const {
    data: theseAreThePosts,
    error,
    isLoading,
  } = useGetThePostsDummyResQuery();

  const navigate = useNavigate();

  console.log("13",theseAreThePosts, typeof theseAreThePosts);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button
        className="counter"
        onClick={() => navigate("/")}
        style={{ marginBottom: "20px" }}>
        Back to Home
      </button>
      {/* <section id="next-steps" style={{ padding: "20px" }}>
        <h2>RTK Query Posts</h2>
        {isLoading && <p>Loading posts...</p>}
        {error && (
          <p>
            Error loading posts (dummyres.com might not be available or CORS
            issues)
          </p>
        )}
        {Array.isArray(theseAreThePosts) && theseAreThePosts.length > 0 && (
          <ul
            style={{
              textAlign: "left",
              maxHeight: "400px",
              overflowY: "auto",
              display: "inline-block",
            }}>
            {theseAreThePosts.slice(0, 5).map((post: any, index: number) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <strong>{post.title || `Post ${index + 1}`}</strong>:{" "}
                {post.body || JSON.stringify(post)}
              </li>
            ))}
          </ul>
        )}
        {theseAreThePosts && !Array.isArray(theseAreThePosts) && (
          <div style={{ textAlign: "left" }}>
            <pre
              style={{
                maxWidth: "600px",
                overflowX: "auto",
                background: "#333",
                color: "#fff",
                padding: "10px",
                display: "inline-block",
              }}>
              {JSON.stringify(theseAreThePosts, null, 2)}
            </pre>
          </div>
        )}
      </section> */}
{isLoading && <p>Loading posts...</p>}
        {error && (
          <p>
            Error loading posts (dummyres.com might not be available or CORS
            issues)
          </p>
        )}
      <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
        <DataGrid
          columns={[
            { field: "id", headerName: "ID", width: 70 },
            { field: "title", headerName: "Title", width: 300 },
            { field: "body", headerName: "Body", width: 500 }
          ]}
          rows={
            theseAreThePosts?.posts
              ? theseAreThePosts.posts.map((post: Post, i: number) => ({ id: post.id ?? i, ...post }))
              : []
          }
        />
      </div>
    </div>
  );
}
