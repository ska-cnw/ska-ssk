import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import IcecreamIcon from '@mui/icons-material/Icecream';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import CakeIcon from '@mui/icons-material/Cake';
import SetMealIcon from '@mui/icons-material/SetMeal';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import Link from 'next/link';

export const SidebarItems = ({ color, onlyIcon }) => {
	const itemHeight = 30;

	const items = [
		{ icon: <KebabDiningIcon />,	label: 'Kebab',			href: '/Kebab'		},
		{ icon: <RamenDiningIcon />,	label: 'Ramen',			href: '/Ramen'		},
		{ icon: <LunchDiningIcon />,	label: 'Lunch',			href: '/Lunch'		},
		{ icon: <FastfoodIcon />,			label: 'Fastfood',	href: '/Fastfood'	},
		{ icon: <IcecreamIcon />,			label: 'Icecream',	href: 'https://www.ezcater.com/lunchrush/office/most-popular-types-of-pizza-around-country/'	},
		{ icon: <RiceBowlIcon />,			label: 'RiceBow',		href: '/RiceBow'	},
		{ icon: <CakeIcon />,					label: 'Cake',			href: '/Cake'			},
		{ icon: <SetMealIcon />,			label: 'SetMeal',		href: '/SetMeal'	},
		{ icon: <SoupKitchenIcon />,	label: 'Soup',			href: '/Soup'			},
		{ icon: <LocalBarIcon />,			label: 'Bar',				href: '/Bar'			},
		{ icon: <LocalPizzaIcon />,		label: 'Pizza',			href: '/Pizza'		},
	];

	return (
		<List>
			{items.map((item, index) => (
				<Link key={index} href={item.href}>
					<ListItem sx={{ height: itemHeight }} disablePadding dense>
						<ListItemButton>
							<ListItemIcon sx={{ color: color }}>
								{item.icon}
							</ListItemIcon>
							{(onlyIcon) ?
								<></>
							:
								<ListItemText primary={item.label} />
							}
						</ListItemButton>
					</ListItem>
				</Link>
			))}
		</List>
	);
};