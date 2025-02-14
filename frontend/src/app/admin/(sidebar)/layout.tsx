import NavbarAdmin from "@/components/NavbarAdmin";
import SidebarAdmin from "@/components/SidebarAdmin";
import AdminContextProvider from "@/context/AdminContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AdminContextProvider>
            <div>
                <NavbarAdmin />
                <div className='flex items-start '>
                    <SidebarAdmin />
                    {children}
                </div>
            </div>
        </AdminContextProvider>
    );
}
