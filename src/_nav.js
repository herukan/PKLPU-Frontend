export default {
  items: [
    {
      name: 'Beranda',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'Menu',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Pemeliharaan',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Manifest',
          url: '/MPemeliharaan',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tambah Pemeliharaan',
          url: '/Pemeliharaan/Tambah',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      name: 'Peminjaman',
      url: '/buttons',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Manifest',
          url: '/Manifest',
          icon: 'icon-cursor',
        },
        {
          name: 'Tambah Peminjaman',
          url: '/Peminjaman',
          icon: 'icon-cursor',
        },
      ],
    },
    {
      name: 'Kendaraan',
      url: '/kendaraan',
      icon: 'icon-calculator',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Admin',
    },
    {
      name: 'Manajemen User',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Kelola User',
          url: '/Pengguna',
          icon: 'icon-cursor',
        },
      ],
    },
    // {
    //   name: 'Kontak',
    //   url: 'http://127.0.0.1:8000/api/siswa',
    //   icon: 'icon-cloud-download',
    //   class: 'mt-auto',
    //   variant: 'success',
    // },
  ],
};
