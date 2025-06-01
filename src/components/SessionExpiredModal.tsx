import { CircleAlert, LogIn } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import type { SessionExpiredModalProps } from "@/types";


export function SessionExpiredModal({
  open,
  onClose,
}: SessionExpiredModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="flex flex-col items-center justify-center gap-5">
        <AlertDialogHeader>
          <div className="flex flex-col items-center justify-center gap-5">
            <CircleAlert className="text-destructive h-10 w-10" />
            <AlertDialogTitle>Sesión Expirada</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-center">
            Tu sesión ha expirado por seguridad. Por favor, inicia sesión
            nuevamente para continuar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose} className="cursor-pointer">
            <div className="flex items-center gap-2">
              <LogIn className="h-5 w-5" />
              <p>Iniciar Sesión</p>
            </div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}