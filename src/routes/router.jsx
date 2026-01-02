import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Loading from '../components/Loading/Loading';
import PrivateRoute from './PrivateRoute';

const Home = lazy(() => import('../components/Home/Home'));
const Login = lazy(() => import('../components/Login/Login'));
const Register = lazy(() => import('../components/Register/Register'));
const AddArtwork = lazy(() => import('../components/AddArtwork/AddArtwork'));
const ExploreArtworks = lazy(() => import('../components/ExploreArtworks/ExploreArtworks'));
const ArtworkDetails = lazy(() => import('../components/ArtworkDetails/ArtworkDetails'));
const MyGallery = lazy(() => import('../components/MyGallery/MyGallery'));
const MyFavorites = lazy(() => import('../components/MyFavorites/MyFavorites'));
const ArtistProfile = lazy(() => import('../components/ArtistProfile/ArtistProfile'));
const CategoryFilter = lazy(() => import('../components/CategoryFilter/CategoryFilter'));
const DashboardOverview = lazy(() => import('../components/Dashboard/DashboardOverview'));
const Profile = lazy(() => import('../components/Dashboard/Profile'));
const About = lazy(() => import('../components/About/About'));
const Contact = lazy(() => import('../components/Contact/Contact'));
const Privacy = lazy(() => import('../components/Privacy/Privacy'));
const NotFound = lazy(() => import('../components/NotFound/NotFound'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: '/explore',
        element: (
          <Suspense fallback={<Loading />}>
            <ExploreArtworks />
          </Suspense>
        ),
      },
      {
        path: '/artwork/:id',
        element: (
          <Suspense fallback={<Loading />}>
            <ArtworkDetails />
          </Suspense>
        ),
      },
      {
        path: '/artist/:email',
        element: (
          <Suspense fallback={<Loading />}>
            <ArtistProfile />
          </Suspense>
        ),
      },
      {
        path: '/categories',
        element: (
          <Suspense fallback={<Loading />}>
            <CategoryFilter />
          </Suspense>
        ),
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: '/contact',
        element: (
          <Suspense fallback={<Loading />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: '/privacy',
        element: (
          <Suspense fallback={<Loading />}>
            <Privacy />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <DashboardOverview />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<Loading />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: 'add-artwork',
        element: (
          <Suspense fallback={<Loading />}>
            <AddArtwork />
          </Suspense>
        ),
      },
      {
        path: 'my-gallery',
        element: (
          <Suspense fallback={<Loading />}>
            <MyGallery />
          </Suspense>
        ),
      },
      {
        path: 'my-favorites',
        element: (
          <Suspense fallback={<Loading />}>
            <MyFavorites />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
