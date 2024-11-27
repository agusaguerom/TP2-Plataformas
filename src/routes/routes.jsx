import { Home } from "../../pages/Home";
import Dashboard from "../components/admin/panel_admin/Dashboard";
import { RecentsReleases } from "../Components/RecentsRelease/RecentsRelease";

export const rutas = [
    { path:"/", element: < Home />, name: "Home" },
    { path:"/Dashboard", element: <Dashboard />, name: "Panel Artista"}
    
    ]