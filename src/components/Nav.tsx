import { Link, useLocation } from 'react-router-dom';



const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  const currentPage = useLocation().pathname;

  const style: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-start',
    margin:'10px',
    gap: '10px',
    padding: '10px',
    position: 'absolute',  
    top: '0',              
    left: '0',             
    width: '100%'  
  }

  return (
    
    
      <ul className="nav" style={style}>
        <li className="nav-item">
        <Link
          to="/"
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
        >
          Home
        </Link>
      </li>
        <li className="nav-item">
        <Link
          to="/SavedCandidates"
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={currentPage === '/SavedCandidates' ? 'nav-link active' : 'nav-link'}
        >
          Potential Candidates
        </Link>
      </li>
      </ul>
  )
};

export default Nav;
