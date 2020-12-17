const Navbar = ({account}) => {
    return(
        <div className="navbar">
            <div className="logo">
                <h2>Twister</h2>
            </div>
            <div className="account">
                {account}
            </div>
        </div>
    );
}

export default Navbar;