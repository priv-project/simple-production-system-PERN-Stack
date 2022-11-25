// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'maintenance',
    title: 'Maintenance',
    type: 'group',
    children: [
        {
            id: 'common',
            title: 'Common',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                {
                    id: 'model',
                    title: 'Model',
                    type: 'item',
                    url: '/maintenance/composite/model',
                    target: false
                },
                {
                    id: 'product',
                    title: 'Product',
                    type: 'item',
                    url: '/maintenance/composite/product',
                    target: false
                },
                {
                    id: 'assembly',
                    title: 'Assembly',
                    type: 'item',
                    url: '/maintenance/composite/assembly',
                    target: false
                },
                {
                    id: 'part',
                    title: 'Part',
                    type: 'item',
                    url: '/maintenance/composite/part',
                    target: false
                }
            ]
        }
    ]
};

export default dashboard;
