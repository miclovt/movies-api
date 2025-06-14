import { ReactNode } from "react";
import { inherits } from "util";

export interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export interface DialogProps {
  onClose: () => void;
}

export interface AddActorsDialogProps extends DialogProps {
  movieId: string;
  currentActorsIdsInMovie: string[];
  onUpdate: () => void;
}
