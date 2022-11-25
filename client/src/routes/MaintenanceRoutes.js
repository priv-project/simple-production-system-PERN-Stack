import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const ModelsPage = Loadable(lazy(() => import('views/modules/maintenance/composite/models')));
const ProductsPage = Loadable(lazy(() => import('views/modules/maintenance/composite/products')));
const AssemblyPage = Loadable(lazy(() => import('views/modules/maintenance/composite/assembly')));
const PartsPage = Loadable(lazy(() => import('views/modules/maintenance/composite/parts')));

// ==============================|| MAIN ROUTING ||============================== //

const MaintenanceRoutes = {
    path: '/maintenance/composite',
    element: <MainLayout />,
    children: [
        {
            path: 'model',
            element: <ModelsPage />
        },
        {
            path: 'product',
            element: <ProductsPage />
        },
        {
            path: 'assembly',
            element: <AssemblyPage />
        },
        {
            path: 'part',
            element: <PartsPage />
        }
        // {
        //     path: 'sample-page',
        //     element: <SamplePage />
        // }
    ]
};

export default MaintenanceRoutes;
