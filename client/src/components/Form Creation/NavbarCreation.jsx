import './NavbarCreation.css';
import { Link } from 'react-router-dom';

export default function NavbarCreation() {
    return(
        <div className='fondoCreation'>
            <div className="Navcreation">
                <Link to={'/home'}>
                    <span>Back</span>
                </Link>
                <div className='LogoCreate'>
                        <span className='flick1'>Cr</span>
                        <span>eate</span>
                        <span> </span>
                        <span className='flick2'>a</span>
                        <span> </span>
                        <span>re</span>
                        <span className='flick3'>c</span>
                        <span>ip</span>
                        <span className='flick4'>e!</span>
                </div>
                <div>
                    <span className='trash'>a</span>
                </div>
                <div>
                    <span className='trash'>a</span>
                </div>
            </div>
        </div>
    )
}