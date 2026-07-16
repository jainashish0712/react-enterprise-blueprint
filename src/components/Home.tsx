import { useAppSelector, useAppDispatch } from '../store'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import { decrement, increment, selectCount, selectHasVisitedPosts } from '../features/counter/counterSlice';
import { useGetPostsQuery, apiService, type Post } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const Hero = styled(motion.div)({
  position: 'relative',
  '& .base, & .framework, & .vite': {
    insetInline: 0,
    margin: '0 auto',
  },
  '& .base': {
    width: '170px',
    position: 'relative',
    zIndex: 0,
  },
  '& .framework, & .vite': {
    position: 'absolute',
  },
  '& .framework': {
    zIndex: 1,
    top: '34px',
    height: '28px',
    transform: 'perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg) scale(1.4)',
  },
  '& .vite': {
    zIndex: 0,
    top: '107px',
    height: '26px',
    width: 'auto',
    transform: 'perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg) scale(0.8)',
  }
});

const CenterSection = styled(motion.section)({
  display: 'flex',
  flexDirection: 'column',
  gap: '25px',
  placeContent: 'center',
  placeItems: 'center',
  flexGrow: 1,
  '@media (max-width: 1024px)': {
    padding: '32px 20px 24px',
    gap: '18px',
  }
});

export const CounterButton = styled(motion.button)({
  fontFamily: 'var(--mono)',
  display: 'inline-flex',
  fontSize: '16px',
  padding: '5px 10px',
  borderRadius: '5px',
  color: 'var(--accent)',
  background: 'var(--accent-bg)',
  border: '2px solid transparent',
  transition: 'border-color 0.3s',
  marginBottom: '24px',
  '&:hover': {
    borderColor: 'var(--accent-border)',
  },
  '&:focus-visible': {
    outline: '2px solid var(--accent)',
    outlineOffset: '2px',
  }
});

const FlexContainer = styled('div')({
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  margin: '20px'
});

const Ticks = styled('div')({
  position: 'relative',
  width: '100%',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    top: '-4.5px',
    border: '5px solid transparent',
  },
  '&::before': {
    left: 0,
    borderLeftColor: 'var(--border)',
  },
  '&::after': {
    right: 0,
    borderRightColor: 'var(--border)',
  }
});

const SectionContainer = styled('section')({
  padding: '20px',
  textAlign: 'center'
});

const PostCard = styled(motion.div)({
  margin: '5px auto',
  padding: '10px',
  border: '1px solid #ccc',
  maxWidth: '600px',
  textAlign: 'left',
});

export default function Home() {
  const { data: postsData, isLoading } = apiService.endpoints.getPosts.useQueryState();
  const currentCount = useAppSelector(selectCount)
  const hasVisited = useAppSelector(selectHasVisitedPosts)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const prefetchPosts = apiService.usePrefetch('getPosts')

  return (
    <>
      <CenterSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Hero
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </Hero>
        <div>
          <h1>React Enterprise Blueprint</h1>
          <p>Counter and RTK Query Example</p>
        </div>
        <FlexContainer>
          <CounterButton
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(decrement())}
          >
            -
          </CounterButton>
          <CounterButton
            type="button"
            style={{ pointerEvents: 'none' }}
          >
            Count is {currentCount}
          </CounterButton>
          <CounterButton
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(increment())}
          >
            +
          </CounterButton>
        </FlexContainer>
      </CenterSection>

      <Ticks />

      <SectionContainer>
        <CounterButton
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => prefetchPosts()}
          onClick={() => navigate('/posts')}
        >
          Go to Posts
        </CounterButton>
        <CounterButton
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/users')}
          style={{ marginLeft: '10px' }}
        >
          Go to Users
        </CounterButton>
      </SectionContainer>

      <SectionContainer>
        <h3>Preview of fetched posts from Cache:</h3>
        {hasVisited && (
          <>
            {isLoading && <p>Loading...</p>}

            {postsData?.posts?.slice(0, currentCount).map((post: Post, index: number) => (
              <PostCard 
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <strong>{post.title}</strong>
              </PostCard>
            ))}
          </>
        )}
      </SectionContainer>
    </>
  )
}