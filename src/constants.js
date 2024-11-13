import { BaseToast, ErrorToast } from "react-native-toast-message";

export const ICON_WIDTH  = 0.18;
export const ICON_HEIGHT = 0.18;
export const MODAL_SPACING = 0.05;
export const MODAL_RADIUS = 0.05;
export const TOUCHABLE_WIDTH = 0.3;
export const TOUCHABLE_SPACING = 0.03;
export const TOUCHABLE_RADIUS = 0.01;
export const FILTER_BOTTOM = 0.04;
export const CONFIRM_TOUCHABLE_WIDTH = 0.25;

export const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'orange', backgroundColor: 'rgba(0,0,0,0.8)' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
          color: 'white',
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17
        }}
        text2Style={{
          fontSize: 15
        }}
      />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
   
  };