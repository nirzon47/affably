const Header = () => {
	return (
		<header className='sticky top-0 h-16 p-2 bg-black md:h-[4.5rem] md:p-4'>
			<div className='flex items-center h-full'>
				<img src='/logo.png' alt='logo' className='h-full' />
				<h3 className='text-3xl font-bold text-primary'>
					<span className='opacity-0'>A</span>
					<span className='inline-block -translate-x-6'>ffably</span>
				</h3>
			</div>
		</header>
	)
}

export default Header
