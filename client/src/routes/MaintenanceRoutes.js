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

const SupplierPage = Loadable(lazy(() => import('views/modules/maintenance/purchasing/supplier')));
const PackingPage = Loadable(lazy(() => import('views/modules/maintenance/purchasing/packing')));

/* COMMON */
const CountryPage = Loadable(lazy(() => import('views/modules/maintenance/common/country')));
const CurrencyPage = Loadable(lazy(() => import('views/modules/maintenance/common/currency')));
const AreaPage = Loadable(lazy(() => import('views/modules/maintenance/common/area')));

/* COMMON */
const CustomerPage = Loadable(lazy(() => import('views/modules/maintenance/sales/customer')));
const ProductCustomerPage = Loadable(lazy(() => import('views/modules/maintenance/sales/product-customer')));

// ==============================|| MAIN ROUTING ||============================== //

const MaintenanceRoutes = {
    path: '/maintenance',
    element: <MainLayout />,
    children: [
        { path: 'composite/model', element: <ModelsPage /> },
        { path: 'composite/product', element: <ProductsPage /> },
        { path: 'composite/assembly', element: <AssemblyPage /> },
        { path: 'composite/part', element: <PartsPage /> },

        { path: 'purchasing/supplier', element: <SupplierPage /> },
        { path: 'purchasing/packing', element: <PackingPage /> },

        /* COMMON */
        { path: 'common/country', element: <CountryPage /> },
        { path: 'common/currency', element: <CurrencyPage /> },
        { path: 'common/area', element: <AreaPage /> },

        /* SALES */
        { path: 'sales/customer', element: <CustomerPage /> },
        { path: 'sales/product-customer', element: <ProductCustomerPage /> }
    ]
};

export default MaintenanceRoutes;
