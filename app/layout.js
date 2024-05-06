import { Theme} from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './globals.css'


  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body className='h-screen'>
          <Theme className='h-full' accentColor="purple" radius="large">
              {children}
          </Theme>
        </body>
      </html>
    );
  }