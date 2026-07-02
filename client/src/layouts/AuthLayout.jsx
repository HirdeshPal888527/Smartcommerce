import Card from "../components/ui/Card";

function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <Card>
                {children}
            </Card>
        </div>
    );
}

export default AuthLayout;