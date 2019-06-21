import { useState } from "react";
import AppStates from "./AppStates";

function useDocumentManagerState() {
  let [state, setState] = useState({
    appState: AppStates.NO_DOCUMENTS,
    documents: null,
    activeDocument: null,
    errorMessage: null
  });

  function updateState(update) {
    setState(s => ({ ...s, ...update }));
  }

  return { state, updateState };
}

export { useDocumentManagerState };
