import { NextPage } from 'next';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';
import { Cart } from './Cart';

export const Header: NextPage = () => {
	return (
		<AppBar position='sticky' className='!bg-background '>
			<Container maxWidth='xl' className='flex items-center gap-12 justify-between'>
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Typography
						variant='h6'
						noWrap
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}>
						<Link href='/'>LOGO</Link>
					</Typography>
				</Toolbar>
				<Cart />
			</Container>
		</AppBar>
	);
};
