import React from 'react';
import { Modal } from 'react-bootstrap';

interface Props {
  onHide: () => void
}


export default class UploadHistory extends React.Component<Props> {
  render() {
    const {onHide} = this.props;

    return <Modal show={true} size="lg" onHide={onHide} centered={true} className="upload-history-modal">
      <Modal.Header closeButton={true}>
        <Modal.Title>Upload History</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      </Modal.Body>
    </Modal>;
  }
}
