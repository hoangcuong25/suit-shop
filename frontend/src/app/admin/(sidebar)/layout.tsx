import NavbarAdmin from "@/components/NavbarAdmin";
import SidebarAdmin from "@/components/SidebarAdmin";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <NavbarAdmin />
            <div className='flex items-start '>
                <SidebarAdmin />
                {children}
            </div>
        </div>
    );
}
