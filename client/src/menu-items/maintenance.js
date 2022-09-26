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
                    id: 'models',
                    title: 'Models',
                    type: 'item',
                    url: '/maintenance/models',
                    target: false
                }
            ]
        }
    ]
};

export default dashboard;
