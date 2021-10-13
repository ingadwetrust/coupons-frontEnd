
import './Layout.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routing from '../Routing/Routing';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Zen Dots',
        'cursive',
      ].join(','),
      fontSize: 18,
      
    },});


function Layout() {
  return (
      <ThemeProvider theme={theme}>

     

    <div className="Layout">
        <BrowserRouter>
        <header>
            <Header/>
        </header>

        <main>
            <Routing/>
        </main>

        <footer>
            <Footer/>
        </footer>

        </BrowserRouter>
    
    </div>
      </ThemeProvider>
    
  );
}

export default Layout;
