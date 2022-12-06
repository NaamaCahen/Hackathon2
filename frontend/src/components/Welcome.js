import { Routes, Route, Link } from 'react-router-dom';
const Welcome = (props) => {
    return (
        <>
            <h1 >Welcome to MY HEALTH CARE CLINIC! </h1>
            <Link to='/login'>login</Link>
            new here?<Link to='/register'>register</Link>
        </>
    )
}

export default Welcome;
