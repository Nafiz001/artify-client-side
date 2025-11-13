import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
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
        path: '/add-artwork',
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loading />}>
              <AddArtwork />
            </Suspense>
          </PrivateRoute>
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
          <PrivateRoute>
            <Suspense fallback={<Loading />}>
              <ArtworkDetails />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: '/my-gallery',
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loading />}>
              <MyGallery />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: '/my-favorites',
        element: (
          <PrivateRoute>
            <Suspense fallback={<Loading />}>
              <MyFavorites />
            </Suspense>
          </PrivateRoute>
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
        path: '*',
        element: (
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
