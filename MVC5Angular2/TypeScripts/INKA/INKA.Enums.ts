 module INKA {
	export enum LoadWhat {
		None,
		TabReady,
		StepReady,
		SplitLeft,
		SplitRight
     }

     export enum ReloadHow {
         None,
         WindowReload,
         Redirect,
         OpenTab,
         OpenStep,
         OpenSplitLeft,
         OpenSplitRight
     }
}