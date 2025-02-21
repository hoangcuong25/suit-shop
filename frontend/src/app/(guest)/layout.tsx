import Chat from "@/components/Chat";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className='sticky bg-white top-0 z-50 shadow-xl'>
                <Header />
                <Navbar />
            </div>
            {children}
            <Footer />
            <Chat />
        </>
    )
}
