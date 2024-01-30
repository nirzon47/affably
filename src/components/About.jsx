import Header from './Header'

const About = () => {
	return (
		<div>
			<Header logoutEnabled={false} />
			<div className='min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-4.5rem)] bg-content-bg p-6'></div>
		</div>
	)
}

export default About
