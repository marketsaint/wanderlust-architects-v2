import { Navigate, createBrowserRouter } from 'react-router';
import { SiteLayout } from '@/components/site/layout';
import AboutPage from './pages/about-page';
import BlogDetailPage from './pages/blog-detail-page';
import BlogPage from './pages/blog-page';
import CareerPage from './pages/career-page';
import ContactPage from './pages/contact-page';
import DubaiPage from './pages/dubai-page';
import HomePage from './pages/home-page';
import NotFoundPage from './pages/not-found-page';
import ProjectDetailPage from './pages/project-detail-page';
import ProjectsPage from './pages/projects-page';
import RegionEntryPage from './pages/region-entry-page';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RegionEntryPage,
  },
  {
    path: '/',
    Component: SiteLayout,
    children: [
      {
        path: 'india',
        Component: HomePage,
      },
      {
        path: 'dubai',
        Component: DubaiPage,
      },
      {
        path: 'about',
        Component: AboutPage,
      },
      {
        path: 'blog',
        Component: BlogPage,
      },
      {
        path: 'blog/:slug',
        Component: BlogDetailPage,
      },
      {
        path: 'journal',
        element: <Navigate to='/blog' replace />,
      },
      {
        path: 'journal/:slug',
        element: <Navigate to='/blog' replace />,
      },
      {
        path: 'career',
        Component: CareerPage,
      },
      {
        path: 'contact',
        Component: ContactPage,
      },
      {
        path: 'projects',
        Component: ProjectsPage,
      },
      {
        path: 'projects/:slug',
        Component: ProjectDetailPage,
      },
      {
        path: 'project/:slug',
        Component: ProjectDetailPage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);
