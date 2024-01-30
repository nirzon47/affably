import LogOutButton from './LogOutButton'
import { Link } from 'react-router-dom'

const Header = (prop) => {
	return (
		<header className='sticky top-0 h-16 py-4 px-4 bg-black md:h-[4.5rem] md:py-4 md:px-48 flex justify-between'>
			<Link to={'/dashboard'}>
				<div className='flex items-center h-full'>
					<img src='/logo.png' alt='logo' className='h-full' />
					<h3 className='text-3xl font-bold text-primary'>
						<span className='opacity-0'>A</span>
						<span className='inline-block -translate-x-6'>ffably</span>
					</h3>
				</div>
			</Link>
			{prop.logoutEnabled && <LogOutButton />}
		</header>
	)
}

export default Header
