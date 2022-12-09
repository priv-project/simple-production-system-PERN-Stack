// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const maintenance = {
    id: 'maintenance',
    title: 'Maintenance',
    type: 'group',
    children: [
        {
            id: 'composite',
            title: 'Composite',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                { id: 'model', title: 'Model', type: 'item', url: '/maintenance/composite/model', target: false },
                { id: 'product', title: 'Product', type: 'item', url: '/maintenance/composite/product', target: false },
                { id: 'assembly', title: 'Assembly', type: 'item', url: '/maintenance/composite/assembly', target: false },
                { id: 'part', title: 'Part', type: 'item', url: '/maintenance/composite/part', target: false }
            ]
        },
        {
            id: 'purchasing',
            title: 'Purchasing',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                { id: 'supplier', title: 'Supplier', type: 'item', url: '/maintenance/purchasing/supplier', target: false },
                { id: 'packing', title: 'Packing', type: 'item', url: '/maintenance/purchasing/packing', target: false }
            ]
        },
        {
            id: 'common',
            title: 'Common',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                { id: 'country', title: 'Country', type: 'item', url: '/maintenance/common/country', target: false },
                { id: 'currency', title: 'Currency', type: 'item', url: '/maintenance/common/currency', target: false },
                { id: 'area', title: 'Area', type: 'item', url: '/maintenance/common/area', target: false }
            ]
        }
    ]
};

export default maintenance;
