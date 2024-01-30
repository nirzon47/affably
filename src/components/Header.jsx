import LogOutButton from './LogOutButton'
import { Link } from 'react-router-dom'

const Header = (prop) => {
	return (
		<header className='sticky top-0 h-16 py-4 px-4 bg-black bg-opacity-25 md:h-[4.5rem] md:py-4 md:px-48 flex justify-between items-center'>
			<div>
				<div className='flex items-center h-full md:items-end gap-x-6 md:gap-x-12'>
					<Link to='/'>
						<div className='flex md:items-end'>
							<img src='/logo.png' alt='logo' className='h-10' />
							<h3 className='hidden text-3xl font-bold text-primary md:inline-block'>
								<span className='opacity-0'>A</span>
								<span className='inline-block -translate-x-6'>
									ffably
								</span>
							</h3>
						</div>
					</Link>
					<nav className='flex gap-x-4 md:gap-x-8'>
						<Link to='/'>
							<p className='font-semibold duration-150 cursor-pointer md:text-lg hover:text-blue-500'>
								Home
							</p>
						</Link>
						<Link to='/about'>
							<p className='font-semibold duration-150 cursor-pointer md:text-lg hover:text-blue-500'>
								About
							</p>
						</Link>
					</nav>
				</div>
			</div>
			{prop.logoutEnabled && <LogOutButton />}
		</header>
	)
}

export default Header
