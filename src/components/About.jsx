import Header from './Header'

const About = () => {
	return (
		<div>
			<Header logoutEnabled={false} />
			<div className='min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-4.5rem)] bg-content-bg p-6 grid place-content-center text-white'>
				<h1 className='mb-8 text-3xl font-bold text-center text-secondary'>
					About Affably
				</h1>
				<div className='grid max-w-lg gap-2'>
					<div tabIndex={0} className='bg-black bg-opacity-25 collapse'>
						<div className='text-xl font-medium collapse-title'>
							What are we?
						</div>
						<div className='collapse-content'>
							<p>
								Affably is an open source project that aims to connect
								you with your locality.
							</p>
						</div>
					</div>

					<div tabIndex={0} className='bg-black bg-opacity-25 collapse'>
						<div className='text-xl font-medium collapse-title'>
							How do we do it?
						</div>
						<div className='collapse-content'>
							<p>
								Affably is a free web application that lets you ask
								questions and users from your locality can answer them.
							</p>
						</div>
					</div>

					<div tabIndex={0} className='bg-black bg-opacity-25 collapse'>
						<div className='text-xl font-medium collapse-title'>
							Do we allow anonymity?
						</div>
						<div className='collapse-content'>
							<p>
								Yes! You can be anonymous or not. But we expect you to
								be professional and respectful to people in the forum.
							</p>
						</div>
					</div>

					<div tabIndex={0} className='bg-black bg-opacity-25 collapse'>
						<div className='text-xl font-medium collapse-title'>
							What are our plans for the future?
						</div>
						<div className='collapse-content'>
							<ul>
								<li>Moderation</li>
								<li>More features</li>
								<li>Security</li>
								<li>More customization</li>
								<li>Themes!</li>
								<li>Add custom made backend</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default About
