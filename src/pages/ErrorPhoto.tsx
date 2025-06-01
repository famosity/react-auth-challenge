import { Button } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

const ErrorPhoto : React.FC = () => {
    const navigate = useNavigate();

   const handleRedirect = () => {
      navigate("/home");
    };

    return (
        <div className="font-outfit bg-dark-blue">
          <div className="flex flex-col lg:flex-row min-h-screen md:p-6">
            <div className="flex-grow lg:p-9 ">
              <main className="p-4 md:p-6 h-full flex items-center justify-center">
                <div className="max-w-md w-full px-6 py-12 text-center space-y-5">
                  <h1 className="text-9xl text-bright-red font-bold tracking-widest mb-4">
                    500
                  </h1>
                  <h2 className="text-3xl w-font-semibold text-white mb-4 ">
                    Something went wrong!.
                  </h2>
                  <p className="text-muted-foreground mt-4">
                    You can try refreshing the page or return to the homepage.
                  </p>
                  <div className="flex gap-4 justify-center mt-6">
                    <Button
                      variant={'outline'}
                      className="hover:text-white hover:bg-bright-red hover:border-bright-red"
                      onClick={handleRedirect}
                    >
                        <MoveLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      );
}

export default ErrorPhoto