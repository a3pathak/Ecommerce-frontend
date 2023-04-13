// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard},
      { title: 'Profile', path: PATH_DASHBOARD.user.profile, icon: ICONS.blog },
      { title: 'Users', path: PATH_DASHBOARD.user.list, icon: ICONS.user },
      { title: 'Products', path: PATH_DASHBOARD.eCommerce.list, icon: ICONS.cart },
      // { title: 'Branch', path: PATH_DASHBOARD.eCommerce.branch, icon: ICONS.cart },
      { title: 'Setting', path: PATH_DASHBOARD.eCommerce.list, icon: ICONS.booking },
      { title: 'Notification', path: PATH_DASHBOARD.eCommerce.list, icon: ICONS.analytics },
    ],
  }

];  

export default navConfig;
