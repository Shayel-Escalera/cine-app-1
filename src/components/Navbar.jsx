import React from 'react';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <div style={styles.logo}>Shay Movies</div>
            <ul style={styles.navLinks}>
                <li style={styles.navItem}><a href="#home" style={styles.navLink} onMouseOver={(e) => e.target.style.color = styles.navLinkHover.color} onMouseOut={(e) => e.target.style.color = styles.navLink.color}>Inicio</a></li>
                <li style={styles.navItem}><a href="#about" style={styles.navLink} onMouseOver={(e) => e.target.style.color = styles.navLinkHover.color} onMouseOut={(e) => e.target.style.color = styles.navLink.color}>Acerca de</a></li>
                <li style={styles.navItem}><a href="#contact" style={styles.navLink} onMouseOver={(e) => e.target.style.color = styles.navLinkHover.color} onMouseOut={(e) => e.target.style.color = styles.navLink.color}>Contacto</a></li>
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#1a202c', // Changed to a darker shade
        color: '#e2e8f0', // Changed to a lighter shade
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#63b3ed', // Added color for the logo
    },
    navLinks: {
        listStyle: 'none',
        display: 'flex',
        margin: 0,
        padding: 0,
    },
    navItem: {
        marginLeft: '20px',
    },
    navLink: {
        color: '#e2e8f0', // Changed to a lighter shade
        textDecoration: 'none',
        fontSize: '1rem',
        transition: 'color 0.3s', // Added transition for hover effect
    },
    navLinkHover: {
        color: '#63b3ed', // Hover color
    },
};

export default Navbar;