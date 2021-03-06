import React from "react";
import { string } from "prop-types";
import ApplicationVersion from "../ApplicationVersion/ApplicationVersion";
import DocumentList from "../DocumentList/DocumentList";
import DocumentViewer from "../DocumentViewer/DocumentViewer";
import { useDocumentManagerModel } from "./Model/DocumentManagerModel";
import DocumentControlsPanel from "../DocumentControlsPanel/DocumentControlsPanel";
import DocumentListToolbar from "../DocumentListToolbar/DocumentListToolbar";
import ModalDialog from "../ModalDialog/ModalDialog";
import SpinnerComponent from "./../SpinnerComponent/SpinnerComponent";
import { ActionTypes } from "./Model/ActionTypes";
import "./DocumentManager.scss";

export default function DocumentManager(props) {
  // Handle State via Collection ID
  const { state, dispatchDocumentAction } = useDocumentManagerModel(
    props.collectionId,
    props.initials
  );

  return (
    <main className="document-manager-container">
      <SpinnerComponent
        open={state.appState.isLoadingState}
        message={state.appState.loadingMessage}
      />
      <ModalDialog
        showDialog={state.error.errorMessage !== null}
        iconStyle="Error"
        header="Error"
        prompt={state.error.errorMessage}
        confirmPrompt={state.error.autoRefresh ? "Refresh" : "OK"}
        cancelPrompt={null}
        reportResult={() =>
          dispatchDocumentAction({ type: ActionTypes.CLEAR_ERROR })
        }
      />
      <section className="document-list-pane">
        <header className="header" aria-label="Document list header">
          <h2>Documents</h2>
        </header>
        <DocumentListToolbar dispatchDocumentAction={dispatchDocumentAction} />
        <DocumentList
          appState={state.appState}
          documents={state.documents}
          dispatchDocumentAction={dispatchDocumentAction}
          activeDoc={state.activeDocument}
        />
        <ApplicationVersion />
      </section>

      {/* Document Viewer */}
      <section className="document-viewer-pane">
        <header className="header" aria-label="Document viewer header">
          <h2>{state.appState.headerText}</h2>
        </header>
        <DocumentViewer document={state.activeDocument} />
        {state.activeDocument && (
          <DocumentControlsPanel
            dispatchDocumentAction={dispatchDocumentAction}
            document={state.activeDocument}
            appState={state.appState}
          />
        )}
      </section>
    </main>
  );
}

// Define PropTypes For Document Manager
DocumentManager.propTypes = {
  collectionId: string,
  initials: string
};
