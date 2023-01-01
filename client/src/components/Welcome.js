import { Routes, Route, Link } from 'react-router-dom';
import './Style.css'
const Welcome = (props) => {
    return (
        <>
        
            <div className='tc flex flex-column items-center flex-wrap mb-50 centerDiv'>
                <img src="https://myhealthcareclinic.com/wp-content/uploads/logo-1.png" alt='logo' width='70%' />
                <p className='text-size'><Link to='/login'>login</Link> <span>new here? <Link to='/register'>register</Link> </span>
                </p>
                
            </div>
            
        </>
    )
}

export default Welcome;
