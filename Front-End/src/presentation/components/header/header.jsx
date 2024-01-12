import logo from '../../assets/images/sigmalogo.png'
import './header.css'

const header = () => {

	return (
		<header>
			<img className="logo" src={logo} alt="Logo" />
		</header>
	)
}

export default header;
