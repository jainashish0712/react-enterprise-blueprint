import { useAppSelector, useAppDispatch } from '../store'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import '../App.css'
import { decrementTheCounter, incrementTheCounter, selectCounterValue, selectHasVisitedPostsPage } from '../features/counter/counterSlice';
import { useGetThePostsDummyResQuery, thisIsThePostsApi, type Post } from '../services/apiService';
import type { RootState } from '../store';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { data: theseAreThePosts, isLoading } = thisIsThePostsApi.endpoints.getThePostsDummyRes.useQueryState();
  const thisIsTheCurrentCount = useAppSelector(selectCounterValue)
  const hasVisited = useAppSelector(selectHasVisitedPostsPage)
  const thisIsTheDispatchFunction = useAppDispatch()
  const navigate = useNavigate()
  const prefetchPosts = thisIsThePostsApi.usePrefetch('getThePostsDummyRes')

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Redux Toolkit Setup</h1>
          <p>Counter and RTK Query Example</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '20px' }}>
          <button
            type="button"
            className="counter"
            onClick={() => thisIsTheDispatchFunction(decrementTheCounter())}
          >
            -
          </button>
          <button
            type="button"
            className="counter"
            style={{ pointerEvents: 'none' }}
          >
            Count is {thisIsTheCurrentCount}
          </button>
          <button
            type="button"
            className="counter"
            onClick={() => thisIsTheDispatchFunction(incrementTheCounter())}
          >
            +
          </button>
        </div>
      </section>

      <div className="ticks"></div>

      <section style={{ padding: '20px', textAlign: 'center' }}>
        <button
          type="button"
          className="counter"
          onMouseEnter={() => prefetchPosts()}
          onClick={() => navigate('/posts')}
        >
          Go to Posts
        </button>
      </section>

      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Preview of fetched posts from Cache:</h3>
        {hasVisited && (
          <>
            {isLoading && <p>Loading...</p>}

            {theseAreThePosts?.posts?.slice(0, thisIsTheCurrentCount).map((post: Post) => (
              <div
                key={post.id}
                style={{
                  margin: '5px auto',
                  padding: '10px',
                  border: '1px solid #ccc',
                  maxWidth: '600px',
                  textAlign: 'left',
                }}
              >
                <strong>{post.title}</strong>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  )
}