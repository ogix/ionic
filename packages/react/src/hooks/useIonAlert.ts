import { AlertButton, AlertOptions, alertController } from '@ionic/core/components';
import { useCallback } from 'react';

import { HookOverlayOptions } from './HookOverlayOptions';
import { useController } from './useController';

/**
 * A hook for presenting/dismissing an IonAlert component
 * @returns Returns the present and dismiss methods in an array
 */
export function useIonAlert(): UseIonAlertResult {
  const controller = useController<AlertOptions, HTMLIonAlertElement>('IonAlert', alertController);

  const present = useCallback(
    (messageOrOptions: string | (AlertOptions & HookOverlayOptions), buttons?: AlertButton[]) => {
      if (typeof messageOrOptions === 'string') {
        controller.present({
          message: messageOrOptions,
          buttons: buttons ?? [{ text: 'Ok' }],
        });
      } else {
        controller.present(messageOrOptions);
      }
    },
    [controller.present]
  );

  return [present, controller.dismiss];
}

export type UseIonAlertResult = [
  {
    /**
     * Presents the alert
     * @param message The main message to be displayed in the alert
     * @param buttons Optional - Array of buttons to be added to the alert
     */
    (message: string, buttons?: AlertButton[]): void;
    /**
     * Presents the alert
     * @param options The options to pass to the IonAlert
     */
    (options: AlertOptions & HookOverlayOptions): void;
  },
  /**
   * Dismisses the alert
   */
  () => void
];
