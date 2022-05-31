
export default [
  {
    component: 'CNavItem',
    name: 'Users',
    to: '/users-settings/users',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavItem',
    name: 'Roles',
    to: '/users-settings/roles',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavTitle',
    name: 'Theme',
  },
  {
    component: 'CNavItem',
    name: 'Colors',
    to: '/theme/colors',
    icon: 'cil-drop',
  },


  {
    component: 'CNavGroup',
    name: 'Users Settings',
    to: '/users-settings',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: 'Users',
        to: '/users-settings/users',
      },
      {
        component: 'CNavItem',
        name: 'Roles',
        to: '/users-settings/roles',
      },
    ],
  },
  

  // {
  //   component: 'CNavItem',
  //   name: 'Download CoreUI',
  //   href: 'http://coreui.io/vue/',
  //   icon: { name: 'cil-cloud-download', class: 'text-white' },
  //   _class: 'bg-success text-white',
  //   target: '_blank'
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Try CoreUI PRO',
  //   href: 'http://coreui.io/pro/vue/',
  //   icon: { name: 'cil-layers', class: 'text-white' },
  //   _class: 'bg-danger text-white',
  //   target: '_blank'
  // }
]
