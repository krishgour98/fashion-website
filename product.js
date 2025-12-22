const products = [
  { id: 1,
     name: "T-Shirt", 
     description: "Comfortable cotton tee", 
     price: "₹499", 
     image: "https://th.bing.com/th/id/OIP.V3F0LkcWgCSh4FRJrawxkwHaJ4?w=208&h=277&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" 
    },
  { id: 2, 
    name: "Jeans", 
    description: "Slim fit denim", 
    price: "₹899", 
    image: "https://th.bing.com/th/id/OIP.xj6oeQr25_zEMhKYXFoeYQHaLW?w=201&h=309&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" 
},
  { id: 3, 
    name: "Shirt", 
    description: "Stylish formal wear", 
    price: "₹599", 
    image: "https://th.bing.com/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?w=208&h=270&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" 
},
  { id: 4,
     name: "Shoes", 
     description: "Casual sneakers", 
     price: "₹1299", 
     image: "https://th.bing.com/th/id/OIP.HCPWleSGUnUbSxi8Bg8AQAHaHa?w=156&h=150&c=6&o=7&dpr=1.3&pid=1.7&rm=3" 
    },
  { id: 5, 
    name: "Watch", 
    description: "Analog wrist watch",
     price: "₹1499",
     image: "https://ae01.alicdn.com/kf/HTB1X11QfRfH8KJjy1Xbq6zLdXXaS/Mens-Big-dial-Watches-Luxury-Top-Brand-Quartz-Watch-Men-Temeite-Stainless-Steel-gold-316L-Men.jpg" 

  },
  { id: 7, 
    name: "Sunglasses", 
    description: "UV protection shades",
     price: "₹799", 
    image: "https://th.bing.com/th/id/OIP.brZrFYC8npbAhf4TlljGKQHaLW?w=141&h=216&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" 
},
  { id: 6, 
    name: "Jacket",
     description: "Winter wear", 
    price: "₹1799", 
    image: "https://th.bing.com/th/id/OIP.JlheGL2g3DSTU50QfZMHgwHaLW?w=208&h=307&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
 },
  { id: 8,
     name: "Cap",
      description: "Cotton baseball cap",
      price: "₹299",
      image: "https://th.bing.com/th/id/OIP.DfistP3g1w1-TO4KQykJnQHaGL?w=255&h=213&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
     },
  { id: 9,
     name: "Wallet",
      description: "Leather wallet",
      price: "₹699", 
     image: "https://th.bing.com/th/id/OIP.LBZn2JmRDjevuwdFsjEvbgHaJ4?w=138&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
  { id: 10,
     name: "Belt",
      description: "Formal leather belt",
      price: "₹499",
      image: "https://th.bing.com/th/id/OIP.3kn_YdilLsr_JDFJDS9LIgHaJp?w=149&h=195&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
  { id: 11,
     name: "Kurta", 
     description: "Traditional cotton kurta",
      price: "₹799",
      image: "https://th.bing.com/th/id/OIP.G5nbKDhcUjN4Pd6hASBQRQHaLH?w=204&h=306&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
  { id: 12,
     name: "Blazer", 
     description: "Formal party blazer", 
     price: "₹1999",
      image: "https://th.bing.com/th/id/OIP.HBa7vOi_y2MIijJIkrrlHwHaHa?w=208&h=208&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
     },
  { id: 13,
     name: "Track Pants",
      description: "Stretchable gym wear", 
     price: "₹699",
      image: "https://th.bing.com/th/id/OIP.6tfgT8MB7bHf5lMSF6fz7QHaHa?w=208&h=208&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
     },
  { id: 14,
     name: "Sweater",
      description: "Woolen winter sweater",
      price: "₹999", 
     image: "https://th.bing.com/th/id/OIP.M03R7tdAr1zx0Ro4P48WjgHaIi?w=189&h=219&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
  { id: 15,
     name: "Loafers",
      description: "Slip-on casual shoes",
      price: "₹1099",
      image: "https://th.bing.com/th/id/OIP.fqcDd_fe_VVVCFFPv7A6rwHaGt?w=234&h=212&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
  { id: 16,
     name: "Tie",
      description: "Formal silk tie",
      price: "₹299", 
    image: "https://th.bing.com/th/id/OIP.z_0Dhf6S2-QJTZ8YxRoSUQHaHa?w=189&h=189&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
  { id: 17,
     name: "Socks", 
     description: "Pack of 3 ankle socks",
      price: "₹199",
     image: "https://th.bing.com/th/id/OIP.rCY-XjqKFCBOjtBb6qBi6QHaF8?w=259&h=207&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
  { id: 18,
     name: "Gloves",
      description: "Winter gloves",
      price: "₹399",
      image: "https://th.bing.com/th/id/OIP.9Cto1wqMRJlthWcqhwijBgHaHa?w=200&h=200&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" 
    },
  { id: 19,
     name: "Scarf",
      description: "Woolen scarf",
      price: "₹349", 
     image: "https://th.bing.com/th/id/OIP.WgcDMc3EYfEstwD2aM4rGwHaHa?w=203&h=203&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
  { id: 20,
     name: "Raincoat", 
     description: "Waterproof raincoat",
      price: "₹899",
      image: "https://th.bing.com/th/id/OIP.44hImL4Z_taOFFp6kbYtQAHaJo?w=208&h=271&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
     },
  { id: 21,
     name: "Cargo Pants",
      description: "Multi-pocket pants", 
     price: "₹999", 
     image: "https://th.bing.com/th/id/OIP.hdPkIvGf_zmXk_himB0eegHaLH?w=204&h=306&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
     },
  { id: 22,
     name: "Hoodie",
      description: "Casual hoodie",
      price: "₹899", 
    image: "https://th.bing.com/th/id/OIP.F_UsqHpD76uXgJw-nkuFNgHaJ6?w=208&h=279&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
     },
  { id: 23,
     name: "Polo Shirt",
      description: "Collared casual tee",
      price: "₹599", 
     image: "https://th.bing.com/th/id/OIP.0186DhnzYG3cMLysWv9ErwHaJo?w=208&h=271&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
  { id: 24,
     name: "Flip Flops",
      description: "Beachwear slippers", 
     price: "₹299", 
     image: "https://th.bing.com/th/id/OIP.3MzvSQ-2dwZIctKBednlcAHaHa?w=202&h=203&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
 
]
export default products