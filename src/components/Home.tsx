import { useAppSelector, useAppDispatch } from '../store'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import { decrementTheCounter, incrementTheCounter, selectCounterValue, selectHasVisitedPostsPage } from '../features/counter/counterSlice';
import { useGetThePostsDummyResQuery, thisIsThePostsApi, type Post } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const Hero = styled('div')({
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

const CenterSection = styled('section')({
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

export const CounterButton = styled('button')({
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

const PostCard = styled('div')({
  margin: '5px auto',
  padding: '10px',
  border: '1px solid #ccc',
  maxWidth: '600px',
  textAlign: 'left',
});

export default function Home() {
  const { data: theseAreThePosts, isLoading } = thisIsThePostsApi.endpoints.getThePostsDummyRes.useQueryState();
  const thisIsTheCurrentCount = useAppSelector(selectCounterValue)
  const hasVisited = useAppSelector(selectHasVisitedPostsPage)
  const thisIsTheDispatchFunction = useAppDispatch()
  const navigate = useNavigate()
  const prefetchPosts = thisIsThePostsApi.usePrefetch('getThePostsDummyRes')

  return (
    <>
      <CenterSection>
        <Hero>
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </Hero>
        <div>
          <h1>Redux Toolkit Setup</h1>
          <p>Counter and RTK Query Example</p>
        </div>
        <FlexContainer>
          <CounterButton
            type="button"
            onClick={() => thisIsTheDispatchFunction(decrementTheCounter())}
          >
            -
          </CounterButton>
          <CounterButton
            type="button"
            style={{ pointerEvents: 'none' }}
          >
            Count is {thisIsTheCurrentCount}
          </CounterButton>
          <CounterButton
            type="button"
            onClick={() => thisIsTheDispatchFunction(incrementTheCounter())}
          >
            +
          </CounterButton>
        </FlexContainer>
      </CenterSection>

      <Ticks />

      <SectionContainer>
        <CounterButton
          type="button"
          onMouseEnter={() => prefetchPosts()}
          onClick={() => navigate('/posts')}
        >
          Go to Posts
        </CounterButton>
        <CounterButton
          type="button"
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

            {theseAreThePosts?.posts?.slice(0, thisIsTheCurrentCount).map((post: Post) => (
              <PostCard key={post.id}>
                <strong>{post.title}</strong>
              </PostCard>
            ))}
          </>
        )}
      </SectionContainer>
    </>
  )
}