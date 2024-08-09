import "./globals.css";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="2f0f0d57-f2c7-465a-86c7-d270bafc7730"
        ></script>
      </head>
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
