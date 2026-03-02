import { Observable, Subject } from "rxjs";

export interface StatusBlockInterface {
  icon: string | null;
  text: string;
  secondText: string;
  buttonText: string;
  secondButtonText: string;
  isActive: boolean;
  subject: Subject<any>;
}