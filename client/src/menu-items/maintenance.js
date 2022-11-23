// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'modules',
    title: 'Modules',
    type: 'group',
    children: [
        {
            id: 'maintenance',
            title: 'Maintenance',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                {
                    id: 'model',
                    title: 'Model',
                    type: 'item',
                    url: '/maintenance/model',
                    target: false
                },
                {
                    id: 'product',
                    title: 'Product',
                    type: 'item',
                    url: '/maintenance/product',
                    target: false
                },
                {
                    id: 'assembly',
                    title: 'Assembly',
                    type: 'item',
                    url: '/maintenance/assembly',
                    target: false
                },
                {
                    id: 'part',
                    title: 'Part',
                    type: 'item',
                    url: '/maintenance/part',
                    target: false
                }
            ]
        }
    ]
};

export default dashboard;
