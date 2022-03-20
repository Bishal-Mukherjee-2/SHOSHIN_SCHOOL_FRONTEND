import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import { Box, MenuItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';

// ----------------------------------------------------------------------

const getIcon = (name, icon) => (
  <ListItemIcon>
    <Box component="img" alt={name} src={icon} />
  </ListItemIcon>
);

const sidebarConfig = [
  {
    title: 'courses',
    path: '/code/1',
    icon: getIcon('courses', '/static/icons/ic_video.svg')
  },
  {
    title: 'modules',
    path: '/code/2',
    icon: getIcon('courses', '/static/icons/ic_video.svg')
  },
  {
    title: 'product',
    path: '/code/3',
    icon: getIcon('courses', '/static/icons/ic_code.svg')
  },
  {
    title: 'blog',
    path: '/code/4',
    icon: getIcon('courses', '/static/icons/ic_text.svg')
  },
  {
    title: 'login',
    path: '/code/5',
    icon: getIcon('courses', '/static/icons/ic_code.svg')
  },
  {
    title: 'register',
    path: '/code/6',
    icon: getIcon('courses', '/static/icons/ic_video.svg')
  },
  {
    title: 'Not found',
    path: '/code/7',
    icon: getIcon('courses', '/static/icons/ic_code.svg')
  },
  {
    title: 'register',
    path: '/code/8',
    icon: getIcon('courses', '/static/icons/ic_video.svg')
  },
  {
    title: 'modules',
    path: '/code/9',
    icon: getIcon('courses', '/static/icons/ic_video.svg')
  },
  {
    title: 'register',
    path: '/code/10',
    icon: getIcon('courses', '/static/icons/ic_video.svg')
  },
  {
    title: 'modules',
    path: '/code/11',
    icon: getIcon('courses', '/static/icons/ic_video.svg')
  },
  {
    title: 'product',
    path: '/code/12',
    icon: getIcon('courses', '/static/icons/ic_code.svg')
  },
  {
    title: 'blog',
    path: '/code/13',
    icon: getIcon('courses', '/static/icons/ic_text.svg')
  }
];

export default sidebarConfig;
