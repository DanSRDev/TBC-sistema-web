import Footer from "../(components)/Footer";
import Nav from "../(components)/Nav";
import Sidebar from "../(components)/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen max-h-screen">
      <Nav />
      <div className="flex h-full max-h-full overflow-auto">
        <Sidebar/>
        <div className="flex justify-center items-center flex-grow relative ">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}