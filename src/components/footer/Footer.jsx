import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#f8f8f8',
    padding: theme.spacing(3),
  },
  container: {
    maxWidth: 960,
    margin: '0 auto',
  },
  title: {
    color: '#333',
    fontSize: 18,
    marginBottom: theme.spacing(2),
  },
  description: {
    color: '#777',
    fontSize: 14,
  },
  contactInfo: {
    color: '#777',
    fontSize: 14,
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  contactIcon: {
    marginRight: theme.spacing(1),
  },
  quickLinks: {
    marginBottom: theme.spacing(1),
  },
  quickLinkItem: {
    marginBottom: theme.spacing(1),
    textDecoration: 'none',
    color: '#777',
    fontSize: 14,
    '&:hover': {
      color: '#333',
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h4" className={classes.title}>
              About Us
            </Typography>
            <Typography variant="body2" className={classes.description}>
              A brief description or mission statement about your company or website.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h4" className={classes.title}>
              Contact Us
            </Typography>
            <div className={classes.contactInfo}>
              <EmailIcon className={classes.contactIcon} />
              <Typography variant="body2">Email: info@example.com</Typography>
            </div>
            <div className={classes.contactInfo}>
              <PhoneIcon className={classes.contactIcon} />
              <Typography variant="body2">Phone: +1 123-456-7890</Typography>
            </div>
            <div className={classes.contactInfo}>
              <LocationOnIcon className={classes.contactIcon} />
              <Typography variant="body2">Address: 123 Main St, City, State, ZIP</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h4" className={classes.title}>
              Quick Links
            </Typography>
            <ul className={classes.quickLinks}>
              <li>
                <a href="/" className={classes.quickLinkItem}>
                  Home
                </a>
              </li>
              <li>
                <a href="/" className={classes.quickLinkItem}>
                  About
                </a>
              </li>
              <li>
                <a href="/" className={classes.quickLinkItem}>
                  Services
                </a>
              </li>
              <li>
                <a href="/" className={classes.quickLinkItem}>
                  Contact
                </a>
              </li>
            </ul>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;