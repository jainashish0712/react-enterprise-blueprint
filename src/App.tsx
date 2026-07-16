import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
const PostsPage = lazy(()=> import('./components/PostsPage'))
const Home = lazy(()=> import('./components/Home'))


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<PostsPage />} />
    </Routes>
  )
}

export default App
