import React from "react";
import PropTypes from "prop-types";
import { documentPropType } from "../../propTypes";
import DocumentActionsPanel from "./DocumentActionsPanel/DocumentActionsPanel";
import DocumentEditPanel from "./DocumentEditPanel/DocumentEditPanel";

export default function DocumentControlsPanel(props) {
  return (
    <footer>
      {props.appState.isEditState ? (
        <DocumentEditPanel
          document={props.document}
          dispatchDocumentAction={props.dispatchDocumentAction}
        />
      ) : (
        <DocumentActionsPanel
          document={props.document}
          dispatchDocumentAction={props.dispatchDocumentAction}
        />
      )}
    </footer>
  );
}

// Define PropTypes For Document Controls Panel
DocumentControlsPanel.propTypes = {
  document: documentPropType,
  dispatchDocumentAction: PropTypes.func,
  appState: PropTypes.object
};
