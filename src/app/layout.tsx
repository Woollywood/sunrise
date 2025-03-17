import { Roboto } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@mui/material';
import theme from '@/theme';
import { Header } from '@/components/Header';
import { CartProvider } from '@/providers/CartProvider';
import { FilterProvider } from '@/providers/FilterProvider';

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-roboto',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={cn(roboto.variable, 'antialiased')}>
				<AppRouterCacheProvider>
					<ThemeProvider theme={theme}>
						<CartProvider>
							<FilterProvider>
								<div className='grid gap-y-8 pb-12'>
									<Header />
									<main className='container mx-auto px-8'>{children}</main>
								</div>
							</FilterProvider>
						</CartProvider>
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
