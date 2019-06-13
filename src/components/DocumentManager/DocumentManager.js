import React from "react";
import { string } from "prop-types";
import ApplicationVersion from "../ApplicationVersion/ApplicationVersion";
import DocumentList from "../DocumentList/DocumentList";
import DocumentViewer from "../DocumentViewer/DocumentViewer";
import { useDocumentManagerModel } from "./Model/DocumentManagerModel";
import DocumentControlsPanel from "../DocumentControlsPanel/DocumentControlsPanel";
import DocumentListToolbar from "../DocumentListToolbar/DocumentListToolbar";
import SpinnerComponent from "./../SpinnerComponent/SpinnerComponent";
import "./DocumentManager.scss";
import AppStates from "./Model/AppStates";

export default function DocumentManager(props) {
  const { state, dispatchDocumentAction } = useDocumentManagerModel(
    props.collectionId
  );

  return (
    <div className="document-manager-container">
      <SpinnerComponent open={state.appState.isLoadingState} />
      <div className="document-list-pane">
        <div className="header" data-testid="document_list_header">
          Documents
        </div>
        <DocumentListToolbar dispatchDocumentAction={dispatchDocumentAction} />
        <DocumentList
          appState={state.appState}
          documents={state.documents}
          dispatchDocumentAction={dispatchDocumentAction}
          activeDoc={state.activeDocument}
        />
        <ApplicationVersion />
      </div>
      <div className="document-viewer-pane">
        <div className="header" data-testid="document_viewer_header">
          {state.appState.headerText}
        </div>
        <DocumentViewer document={state.activeDocument} />
        {state.activeDocument && (
          <DocumentControlsPanel
            dispatchDocumentAction={dispatchDocumentAction}
            document={state.activeDocument}
            appState={state.appState}
          />
        )}
      </div>
    </div>
  );
}

DocumentManager.propTypes = {
  collectionId: string
};
