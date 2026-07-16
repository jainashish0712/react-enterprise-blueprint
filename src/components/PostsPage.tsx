import { useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetPostsQuery, type Post } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useAppDispatch } from "../store";
import { setVisitedPosts } from "../features/counter/counterSlice";
import { useEffect } from "react";
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { CounterButton } from './Home';

const PageContainer = styled(motion.div)({
  padding: '20px',
  textAlign: 'center'
});

const SearchContainer = styled('div')({
  marginBottom: '20px'
});

const SearchInput = styled('input')({
  padding: '10px',
  width: '300px',
  borderRadius: '5px',
  border: '1px solid #ccc'
});

const SearchHelper = styled('p')({
  fontSize: '0.8rem',
  color: '#666',
  marginTop: '5px'
});

const DataGridContainer = styled('div')({
  height: 600,
  width: '100%',
  marginTop: '20px'
});

export default function PostsPage() {
  const {
    data: postsData,
    error,
    isLoading,
  } = useGetPostsQuery();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setVisitedPosts());
  }, [dispatch]);


  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredRows = useMemo(() => {
    if (!postsData?.posts) return [];

    return postsData.posts
      .filter((post) =>
        post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
      .map((post: Post, i: number) => ({
        ...post,
        id: post.id ?? i,
      }));
  }, [postsData, debouncedSearchTerm]);

  return (
    <PageContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <CounterButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        style={{ marginBottom: "20px" }}>
        Back to Home
      </CounterButton>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchHelper>Debounced search active</SearchHelper>
      </SearchContainer>

      {isLoading && <p>Loading posts...</p>}
      {error && (
        <p>
          Error loading posts (dummyjson.com might not be available or CORS
          issues)
        </p>
      )}
      <DataGridContainer>
        <DataGrid
          columns={[
            { field: "id", headerName: "ID", width: 70 },
            { field: "title", headerName: "Title", width: 300 },
            { field: "body", headerName: "Body", width: 500 },
          ]}
          rows={filteredRows}
        />
      </DataGridContainer>
    </PageContainer>
  );
}
