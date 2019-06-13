import { useState } from "react";
import AppStates from "./AppStates";

function useDocumentManagerState() {
  let [state, setState] = useState({
    appState: AppStates.LIST_LOADING,
    documents: null,
    activeDocument: null
  });

  function updateState(update) {
    setState({ ...state, ...update });
  }

  return { state, updateState };
}

export { useDocumentManagerState };
