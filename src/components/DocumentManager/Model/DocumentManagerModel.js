import { useEffect } from "react";
import { useDocumentManagerState } from "./DocumentManagerState";
import { ActionTypes } from "./ActionTypes";
import { useDocumentManagerActions } from "./DocumentManagerActions";

function useDocumentManagerModel(collectionId, initials) {
  const { state, updateState } = useDocumentManagerState();
  const { dispatchDocumentAction } = useDocumentManagerActions(
    collectionId,
    initials,
    state,
    updateState
  );

  useEffect(() => {
    (async () => {
      await dispatchDocumentAction({ type: ActionTypes.LOAD_COLLECTION });
    })();
  }, [collectionId]);

  return {
    state,
    dispatchDocumentAction
  };
}

export { useDocumentManagerModel };
